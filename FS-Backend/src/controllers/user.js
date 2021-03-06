import User from '../models/user';
import Company from '../models/company';
import Product from '../models/product';
import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import {
    sendResponse,
    SendMail,
    notifyAdmin
} from './functions';
import Constants from './constant';
import sendSMS from '../functions/nexmo';
import Redis from '../functions/redis';
import Stripe from '../controllers/stripe';
import Plan from '../models/subscriptions';
import uniqid from 'uniqid';
// SendMail('test@gmail.com', 'shuklas@synapseindia.email', 'test', 'test');
async function addUser(req, res) {
    try {
        let user = await User.findOne({
            email: req.body.email
        });
        if (user) sendResponse(res, 400, 'User with this email id already exists');
        else {
            let company = await Company.create({
                name: req.body['company.name'],
                address: req.body['company.address'],

                description: req.body['company.description'],
                subscription: req.body['company.subscriptionId'],
                subscriptionLastDate: req.body['company.subscriptionLastDate'],
                subscriptionBilledAmount: req.body['company.subscriptionBilledAmount'],
                maximumNoOfUsers: req.body['company.maximumNoOfUsers']
            });
            req.body.company = company._id;
            req.body['permissions.isAccountAdmin'] = true;

            req.body.speakeasy_secret = speakeasy.generateSecret({
                length: 20
            });
            req.body.name = req.body.firstName + req.body.lastName;
            let newUser = await new User(req.body).save();
            let updateCompany = await Company.findByIdAndUpdate(
                company._id, {
                    $set: {
                        primaryAdmin: newUser._id,
                        createdBy: newUser._id
                    }
                }, {
                    new: true
                }
            );
            console.log(newUser);
            let token = jwt.sign({
                    data: newUser._id,
                    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
                },
                Constants.JWT_SECRET
            );
            let link = `http://localhost:4200/auth/registration/activate/${token}`;
            console.log(link);
            let storeToken = await User.findByIdAndUpdate(newUser._id, {
                $set: {
                    token: token
                }
            });
            sendResponse(res, 200, 'Please verify your email to procced.');
            SendMail(
                Constants.MAIL_FROM,
                req.body.email,
                Constants.SIGN_UP_MAIL_SUBJECT,
                `${Constants.SIGN_UP_TEXT}: ${link}`
            );
        }
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function verifyUser(req, res) {
    try {
        let decoded = jwt.verify(req.body.token, Constants.JWT_SECRET);
        if (decoded.data) {
            let user = await User.findById(decoded.data);

            if (user.status === 'Active') {
                sendResponse(res, 400, 'User already verified.');
            } else {
                let verifyUser = await User.findByIdAndUpdate(decoded.data, {
                    $set: {
                        status: 'Active'
                    }
                });
                sendResponse(res, 200, 'Verification Successful. Please login.');
            }
        } else {
            sendResponse(res, 400, 'No user found.');
        }
    } catch (e) {
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function sendOTPLogin(req, res) {
    try {
        let user = await User.findOne(req.body);
        if (user) {
            if (user.status === 'Active') {
                if (user.role === 'Admin' || user.role === 'SubAdmin') {
                    let refreshToken = uniqid();
                    Redis.storeRefreshToken(user._id, refreshToken);
                    console.log(Redis.getRefreshToken(user._id));
                    let token = jwt.sign({
                            exp: Math.floor(Date.now() / 1000) + 60 * 60,
                            data: user._id
                        },
                        Constants.JWT_SECRET
                    );
                    let data = user;
                    data.token = token;
                    data.refreshToken = refreshToken;
                    let updateLoginCountAndSaveToken = await User.findByIdAndUpdate(
                        user._id, {
                            $inc: {
                                loginCount: 1
                            },
                            $set: {
                                token: token,
                                otp: null
                            }
                        }
                    );
                    sendResponse(res, 201, 'Login Successful', data);

                } else {
                    let otp = speakeasy.totp({
                        secret: user.speakeasy_secret.base32,
                        encoding: 'base32'
                    });

                    let storeOTP = await User.findByIdAndUpdate(user._id, {
                        $set: {
                            otp: otp
                        }
                    });
                    sendResponse(res, 200, '6 digit Code has been sent to your registered email', otp);

                    sendSMS(otp, user.mobile);
                    SendMail(
                        Constants.MAIL_FROM,
                        req.body.email,
                        Constants.SEND_OTP_SUBJECT,
                        `${Constants.SEND_OTP_TEXT}: ${otp}`
                    );
                }

            } else {
                sendResponse(res, 400, 'Please first verify your email');
            }
        } else {
            sendResponse(res, 400, 'Username or password maybe incorrect');
        }
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function loginUser(req, res) {
    try {
        let user = await User.findOne({
            email: req.body.email
        });
        if (user) {
            if (user.status === 'Active') {
                let otpValidate = speakeasy.totp.verify({
                    secret: user.speakeasy_secret.base32,
                    encoding: 'base32',
                    token: req.body.otp
                });
                if (otpValidate || user.otp !== req.body.otp) {
                    sendResponse(res, 400, 'Invalid OTP or OTP Expired');
                } else {
                    let refreshToken = uniqid();
                    Redis.storeRefreshToken(user._id, refreshToken);
                    console.log(Redis.getRefreshToken(user._id));
                    let token = jwt.sign({
                            exp: Math.floor(Date.now() / 1000) + 60 * 60,
                            data: user._id
                        },
                        Constants.JWT_SECRET
                    );
                    let data = user;
                    data.token = token;
                    data.refreshToken = refreshToken;
                    let updateLoginCountAndSaveToken = await User.findByIdAndUpdate(
                        user._id, {
                            $inc: {
                                loginCount: 1
                            },
                            $set: {
                                token: token,
                                otp: null
                            }
                        }
                    );
                    if (user.loginCount > 1) {
                        sendResponse(res, 200, 'Login Successful', data);
                    } else {
                        sendResponse(res, 206, 'Login Successful', data);
                    }
                }
            } else {
                sendResponse(res, 400, 'Please first verify your email');
            }
        } else {
            sendResponse(res, 400, 'Username or password maybe incorrect');
        }
    } catch (e) {
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function refreshTokenStrategy(req, res) {
    const user = req.body;
    const userId = user._id;
    if (user.refreshToken) {
        try {
            const refreshTokenAvailable = await Redis.getRefreshToken(userId);
            console.log(refreshTokenAvailable);
            if (refreshTokenAvailable && refreshTokenAvailable === user.refreshToken) {
                let token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + 60 * 60,
                        data: userId
                    },
                    Constants.JWT_SECRET
                );
                user.token = token;
                user.refreshToken = refreshTokenAvailable;
                sendResponse(res, 200, 'Token refreshed Successfully.', user);
            } else {
                sendResponse(res, 400, 'No refresh token available. Please procced to login.');

            }


        } catch (e) {
            sendResponse(res, 500, 'Unexpected error', e);
        }
    } else {
        sendResponse(res, 400, 'Refresh token is not available');

    }
}

// async function sociaLoginUser(req, res) {
//     console.log(req.user);
//     try {

//         let token = jwt.sign({
//             exp: Math.floor(Date.now() / 1000) + (60 * 60),
//             data: req.user._id
//         }, Constants.JWT_SECRET);
//         let data = req.user;
//         data.token = token;
//         let updateLoginCountAndSaveToken =
//             await User.findByIdAndUpdate(req.user._id, {
//                 $inc: {
//                     loginCount: 1
//                 },
//                 $set: {
//                     token: token,
//                 }
//             });
//         if (req.user.loginCount > 1) {
//             sendResponse(res, 200, 'Login Successful', data);

//         } else {
//             sendResponse(res, 206, 'Login Successful', data);

//         }

//     } catch (e) {
//         console.log(e);
//         sendResponse(res, 500, 'Unexpected error', e);
//     }
// }

async function sociaLoginUser(req, res) {
    let user = {};
    try {
        if (req.body.social_login_provider_id) {
            user = await User.findOne({
                $or: [{
                        social_login_provider_id: req.body.social_login_provider_id
                    },
                    {
                        email: req.body.email
                    }
                ]
            });
        } else {
            sendResponse(res, 400, 'Please provide provider id');
            return;
        }

        if (!user) {
            console.log('user', user);
            let company = await Company.create({
                name: req.body['company.name'],
                address: req.body['company.address'],

                description: req.body['company.description'],
                subscription: req.body['company.subscriptionId'],
                subscriptionLastDate: req.body['company.subscriptionLastDate'],
                subscriptionBilledAmount: req.body['company.subscriptionBilledAmount'],
                maximumNoOfUsers: req.body['company.maximumNoOfUsers']
            });
            req.body.company = company._id;
            req.body['permissions.isAccountAdmin'] = true;

            req.body.status = 'Active';
            if (req.body.firstName && req.body.lastName)
                req.body.name = req.body.firstName + req.body.lastName;
            user = await new User(req.body).save();
            let updateCompany = await Company.findByIdAndUpdate(
                company._id, {
                    $set: {
                        primaryAdmin: user._id,
                        createdBy: user._id
                    }
                }, {
                    new: true
                }
            );
        }
        if (user.status === 'Inactive') {
            sendResponse(
                res,
                401,
                'You account is deactivated. Please contact admin',
                user
            );
            return;
        }
        let token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
                data: user._id
            },
            Constants.JWT_SECRET
        );
        let data = user;
        data.token = token;
        let updateLoginCountAndSaveToken = await User.findByIdAndUpdate(user._id, {
            $inc: {
                loginCount: 1
            },
            $set: {
                token: token
            }
        });
        if (user.loginCount > 0) {
            sendResponse(res, 200, 'Login Successful', data);
        } else {
            sendResponse(res, 206, 'Login Successful', data);
        }
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function getAllUsers(req, res) {
    try {
        let users = await User.find({
            // status: 'Active'
        }).populate('company');
        sendResponse(res, 200, 'Successful.', users);
    } catch (e) {
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function editUser(req, res) {
    try {
        // console.log('reqqq body date', req.body);
        // if (req.body.role) {
        //     if(req.body.role == 'Buyer') {

        //     }
        // }
        if (
            req.body.dateOfBirth &&
            req.body.dateOfBirth.year &&
            req.body.dateOfBirth.month &&
            req.body.dateOfBirth.day
        )
            req.body.dateOfBirth = new Date(
                req.body.dateOfBirth.year,
                req.body.dateOfBirth.month,
                req.body.dateOfBirth.day
            );
        let id = req.body.id;
        delete req.body.id;
        if (req.body.firstName && req.body.lastName)
            req.body.name = req.body.firstName + req.body.lastName;

        let updateUser = await User.findByIdAndUpdate(
            id, {
                $set: req.body
            }, {
                new: true
            }
        );
        sendResponse(res, 200, 'Updated Successfully.', updateUser);
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function getUser(req, res) {
    try {
        let user = await User.findById(req.params.id).populate('company');
        sendResponse(res, 200, 'Successful.', user);
    } catch (e) {
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function updateUserStates(req, res) {
    try {
        let id = req.body.id;
        console.log('user id------------', id);
        delete req.body.id;
        let status;
        let user = await User.findById(id);
        if (user) {
            if (user.status === 'Active') status = 'Inactive';
            else status = 'Active';

            let updatedUser = await User.findByIdAndUpdate(
                id, {
                    $set: {
                        status: status
                    }
                }, {
                    new: true
                }
            );
            sendResponse(res, 200, 'User status updated Successfully.', updatedUser);
        } else {
            sendResponse(res, 400, 'User not found.');
        }
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function deleteUser(req, res) {
    try {
        let id = req.body.id;
        delete req.body.id;
        let user = await User.findByIdAndRemove(id);
        if (user) {
            sendResponse(res, 200, 'User status deleted Successfully.', user);
        } else {
            sendResponse(res, 400, 'User not found.');
        }
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function addUserFromAdmin(req, res) {
    try {
        let user = await User.findOne({
            email: req.body.email
        });
        if (user) sendResponse(res, 400, 'User with this email id already exists');
        else {
            let company = await Company.create({
                name: req.body['company.name'],
                address: req.body['company.address'],

                description: req.body['company.description'],
                subscription: req.body['company.subscriptionId'],
                subscriptionLastDate: req.body['company.subscriptionLastDate'],
                subscriptionBilledAmount: req.body['company.subscriptionBilledAmount'],
                maximumNoOfUsers: req.body['company.maximumNoOfUsers']
            });
            req.body.company = company._id;
            req.body['permissions.isAccountAdmin'] = true;

            req.body.speakeasy_secret = speakeasy.generateSecret({
                length: 20
            });
            let newUser = await new User(req.body).save();
            let updateCompany = await Company.findByIdAndUpdate(
                company._id, {
                    $set: {
                        primaryAdmin: newUser._id,
                        createdBy: newUser._id
                    }
                }, {
                    new: true
                }
            );
            sendResponse(res, 200, 'Added Successfully.');
            notifyAdmin(newUser._id, req.body.firstName, 'new user created.', 'New-User');

        }
    } catch (e) {
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function inviteUser(req, res) {
    console.log('req body', req.body);
    try {
        let company = Company.findById(req.body.id);
        let user = await User.create({
            email: req.body.email,
            company: req.body.id,
            status: 'Invited'
        });
        sendResponse(res, 200, 'Invited Successfully');

        SendMail(
            Constants.MAIL_FROM,
            req.body.email,
            Constants.INVITE_USER_SUBJECT,
            `${Constants.INVITE_USER_TEXT} http://localhost:4200/invited/${user._id}`
        );
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function addFromInvitation(req, res) {
    console.log('req body', req.body);
    try {
        let id = req.body.id;
        delete req.body.id;
        req.body.status = 'Active';

        let updateUser = await User.findOneAndUpdate({
            _id: id,
            status: 'Invited'
        }, {
            $set: req.body
        }, {
            new: true
        });
        let updateCompany = await User.findByIdAndUpdate(updateUser.company, {
            $push: {
                members: id
            }
        });
        sendResponse(res, 200, 'sign up successful');
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}


async function addUserFromWebsite(req, res) {
    try {
        let user = await User.findOne({
            email: req.body.email
        });
        if (user) sendResponse(res, 400, 'User with this email id already exists');
        else {
            console.log(req.body.payment.subscriptionId);
            let plan = await Plan.findById(req.body.payment.subscriptionId);
            if (!plan)
                return sendResponse(res, 400, 'Plan not found');
            console.log(plan, 'plan');
            if (req.body.payment.amount > 0) {
                let charge = await Stripe.createCharge((req.body.payment.amount * 100), 'EUR', req.body.payment.tokenId, 'test');
                console.log(charge, 'charge');

                if (charge.status === 'succeeded') {
                    let subscriptionLastDate = new Date();
                    if (plan.duration === '1 YEAR') {
                        subscriptionLastDate = new Date(subscriptionLastDate.setFullYear(subscriptionLastDate.getFullYear() + 1));
                    } else if (plan.duration === '2 YEARS') {
                        subscriptionLastDate = new Date(subscriptionLastDate.setFullYear(subscriptionLastDate.getFullYear() + 2));
                    } else if (plan.duration === 'Quaterly') {
                        subscriptionLastDate = new Date(subscriptionLastDate.setMonth(subscriptionLastDate.getMonth() + 3));
                    } else if (plan.duration === 'Half Yearly') {
                        subscriptionLastDate = new Date(subscriptionLastDate.setMonth(subscriptionLastDate.getMonth() + 6));
                    } else if (plan.duration === 'Monthly') {
                        subscriptionLastDate = new Date(subscriptionLastDate.setMonth(subscriptionLastDate.getMonth() + 1));

                    } else {
                        return sendResponse(res, 400, 'Plan duration not found.');
                    }
                    let company = await Company.create({

                        subscription: req.body.payment.subscriptionId,
                        subscriptionLastDate: subscriptionLastDate,
                        subscriptionBilledAmount: (req.body.payment.amount * 100),
                        maximumNoOfUsers: plan.maxNumberOfMembers
                    });
                    req.body.company = company._id;
                    req.body['permissions.isAccountAdmin'] = true;

                    req.body.speakeasy_secret = speakeasy.generateSecret({
                        length: 20
                    });
                    if (req.body.firstName && req.body.lastName)
                        req.body.name = req.body.firstName + req.body.lastName;
                    let newUser = await new User(req.body.user).save();
                    let updateCompany = await Company.findByIdAndUpdate(
                        company._id, {
                            $set: {
                                primaryAdmin: newUser._id,
                                createdBy: newUser._id
                            }
                        }, {
                            new: true
                        }
                    );
                    console.log(newUser);
                    let token = jwt.sign({
                            data: newUser._id,
                            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
                        },
                        Constants.JWT_SECRET
                    );
                    let link = `http://localhost:4200/auth/registration/activate/${token}`;
                    console.log(link);
                    let storeToken = await User.findByIdAndUpdate(newUser._id, {
                        $set: {
                            token: token
                        }
                    });
                    sendResponse(res, 200, 'Please verify your email to procced.');
                    SendMail(
                        Constants.MAIL_FROM,
                        req.body.user.email,
                        Constants.SIGN_UP_MAIL_SUBJECT,
                        `${Constants.SIGN_UP_TEXT}: ${link}`
                    );
                    notifyAdmin(newUser._id, req.body.name, 'new user created.', 'New-User');

                } else {
                    sendResponse(res, 400, 'Payment failed.');

                }

            } else {
                let company = await Company.create({

                    subscription: req.body.payment.subscriptionId,
                    subscriptionLastDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                    subscriptionBilledAmount: 0,
                    maximumNoOfUsers: plan.maxNumberOfMembers
                });
                req.body.company = company._id;
                req.body['permissions.isAccountAdmin'] = true;

                req.body.speakeasy_secret = speakeasy.generateSecret({
                    length: 20
                });
                if (req.body.firstName && req.body.lastName)
                    req.body.name = req.body.firstName + req.body.lastName;
                let newUser = await new User(req.body.user).save();
                let updateCompany = await Company.findByIdAndUpdate(
                    company._id, {
                        $set: {
                            primaryAdmin: newUser._id,
                            createdBy: newUser._id
                        }
                    }, {
                        new: true
                    }
                );
                console.log(newUser);
                let token = jwt.sign({
                        data: newUser._id,
                        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
                    },
                    Constants.JWT_SECRET
                );
                let link = `http://localhost:4200/auth/registration/activate/${token}`;
                console.log(link);
                let storeToken = await User.findByIdAndUpdate(newUser._id, {
                    $set: {
                        token: token
                    }
                });
                sendResponse(res, 200, 'Please verify your email to procced.');
                SendMail(
                    Constants.MAIL_FROM,
                    req.body.user.email,
                    Constants.SIGN_UP_MAIL_SUBJECT,
                    `${Constants.SIGN_UP_TEXT}: ${link}`
                );
            }

        }
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function addToWishList(req, res) {
    try {
        let user = await User.findById(req.body.userId);
        if (!user)
            sendResponse(res, 400, 'User not found.');
        else {
            if (user.wishlist && user.wishlist.products.join('').indexOf(req.body.productId) >= 0) {
                sendResponse(res, 400, 'Product already added to wishlist.');

            } else {
                let updatedProduct = await User.findByIdAndUpdate(req.body.userId, {
                    $push: {
                        'wishlist.products': req.body.productId
                    }
                }, {
                    new: true
                });
                sendResponse(res, 200, 'Successful.', updatedProduct);
            }


        }
    } catch (e) {
        console.log(e, 'error');
        sendResponse(res, 500, 'Unexpected Error', e);
    }
}

async function getWishlistProducts(req, res) {
    try {
        let product = await User.findById(req.params.id, {
            _id: 0
        }).populate('wishlist.products');
        if (product) {
            sendResponse(res, 200, 'Successful.', product);
        } else {
            sendResponse(res, 400, 'No wishlist found');
        }
    } catch (e) {
        console.log(e, 'error');
        sendResponse(res, 500, 'Unexpected Error', e);
    }
}

async function contactSupplier(req, res) {
    try {
        let data = {};
        let company = await Company.findById(req.body.id);
        if (company) {
            let userId = company.createdBy;
            if (userId) {
                let userDetails = await User.findById(userId);
                data.user = userDetails;
                let products = await Product.find({
                    createdBy: userId
                });
                if (products) {
                    data.products = products;
                } else {
                    data.products = [];
                }
                sendResponse(res, 200, 'Successful.', data);
            } else {
                sendResponse(res, 400, 'User not found');
            }
        } else {
            sendResponse(res, 400, 'Company not found');
        }

    } catch (e) {
        console.log(e, 'error');

    }
}

module.exports = {
    addUser,
    verifyUser,
    sendOTPLogin,
    loginUser,
    sociaLoginUser,
    getAllUsers,
    editUser,
    getUser,
    updateUserStates,
    addUserFromAdmin,
    inviteUser,
    addFromInvitation,
    refreshTokenStrategy,
    deleteUser,
    addUserFromWebsite,
    addToWishList,
    getWishlistProducts,
    contactSupplier
};
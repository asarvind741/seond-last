import User from '../models/user';
import Company from '../models/company';
import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import {
    sendResponse,
    SendMail
} from './functions';
import Constants from './constant';
import sendSMS from '../functions/nexmo';
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
                let otp = speakeasy.totp({
                    secret: user.speakeasy_secret.base32,
                    encoding: 'base32'
                });

                let storeOTP = await User.findByIdAndUpdate(user._id, {
                    $set: {
                        otp: otp
                    }
                });
                sendSMS(otp, user.mobile);
                // sendResponse(res, 200, '6 digit Code has been sent to your registered email', otp);
                SendMail(
                    Constants.MAIL_FROM,
                    req.body.email,
                    Constants.SEND_OTP_SUBJECT,
                    `${Constants.SEND_OTP_TEXT}: ${otp}`
                );
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
                    let token = jwt.sign({
                            exp: Math.floor(Date.now() / 1000) + 60 * 60,
                            data: user._id
                        },
                        Constants.JWT_SECRET
                    );
                    let data = user;
                    data.token = token;
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
            req.body.status = 'Active';
            if (req.body.firstName && req.body.lastName)
                req.body.name = req.body.firstName + req.body.lastName;
            user = await new User(req.body).save();
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
    addFromInvitation
};
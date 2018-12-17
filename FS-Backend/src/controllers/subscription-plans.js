import Plan from '../models/subscriptions';
import {
    sendResponse,
    SendMail
} from './functions';
import Constants from './constant';
import user from '../models/user';

async function createPlan(req, res) {
    console.log('body', req.body);
    try {
        let plan = await new Plan(req.body).save();
        sendResponse(res, 200, 'Plan created Successfully.', plan);
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function editPlan(req, res) {

    console.log(req.body);
    try {
        let id = req.body.id;
        delete req.body.id;
        let updatedplan = await Plan.findByIdAndUpdate(
            id, {
                $set: req.body
            }, {
                new: true
            }
        );
        sendResponse(res, 200, 'plan updated Successfully.', updatedplan);
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function updatePlanStatus(req, res) {
    console.log('req status', req.body);
    try {
        let id = req.body.id;
        delete req.body.id;
        let status;
        let plan = await Plan.findById(id);
        if (plan) {
            if (plan.status === 'Active')
                status = 'Inactive';
            else
                status = 'Active';


            let updatedplan = await Plan.findByIdAndUpdate(
                id, {
                    $set: {
                        status: status
                    }
                }, {
                    new: true
                }
            );
            sendResponse(res, 200, 'Plan deleted Successfully.', updatedplan);
        } else {
            sendResponse(res, 400, 'Plan not found.');

        }
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function deleteSubscriptionPlan(req, res) {
    console.log('req status', req.body);
    try {
        let id = req.body.id;
        delete req.body.id;
        let plan = await Plan.findById(id);
        if (plan) {
            let deletePlan = await Plan.findByIdAndRemove(id);
            sendResponse(res, 200, 'Plan deleted Successfully.');
        } else {
            sendResponse(res, 400, 'Plan not found.');

        }
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function getPlans(req, res) {
    try {
        let plans = await Plan.find({
            // status: 'Active'
        }).populate('createdBy', {
            _id: 0,
            email: 1
        });
        console.log(plans);

        sendResponse(res, 200, 'Successful.', plans);
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function getPlan(req, res) {
    try {
        let plans = await Plan.findById(req.params.id).populate('createdBy', {
            _id: 0,
            email: 1
        });
        console.log(plans);

        sendResponse(res, 200, 'Successful.', plans);
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}


async function getUserPlans(req, res) {
    try {
        let plans = await user.aggregate([{
            $match: {
                'permissions.isAccountAdmin': true
            }
        }, {
            $lookup: {
                from: 'companies',
                localField: 'company',
                foreignField: '_id',
                as: 'subscription'
            }
        }, {
            $unwind: '$subscription'
        }]);
        console.log(JSON.stringify(plans));
        sendResponse(res, 200, 'Successful.', plans);

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function getPlansForWebsite(req, res) {
    console.log(req.params);
    try {
        let query = {};
        if (req.params.role === 'Buyer') {
            query = {
                rolesAllowed: {
                    $elemMatch: {
                        roleName: 'Buyer'
                    }
                }
            };
        } else if (req.params.role === 'Supplier') {
            query = {
                rolesAllowed: {
                    $elemMatch: {
                        roleName: 'Supplier'
                    }
                }
            };
        }
        let plans = await Plan.find(query).populate('features._id');
        console.log(plans);

        sendResponse(res, 200, 'Successful.', plans);
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

module.exports = {
    createPlan,
    editPlan,
    updatePlanStatus,
    getPlans,
    getUserPlans,
    deleteSubscriptionPlan,
    getPlan,
    getPlansForWebsite
};
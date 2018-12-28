import Company from '../models/company';
import User from '../models/user';
import Plan from '../models/subscriptions';
import fs from 'fs';

import {
    sendResponse,
    SendMail
} from './functions';
import Constants from './constant';
import user from '../models/user';


async function editCompany(req, res) {
    try {
        let id = req.body.id;
        delete req.body.id;
        if (req.body.subscription === '')
            delete req.body.subscription;
        let updatedCompany = await Company.findByIdAndUpdate(id, {
            $set: req.body
        }, {
            new: true
        });
        sendResponse(res, 200, 'Company updated Successfully.', updatedCompany);

    } catch (e) {
        sendResponse(res, 500, 'Unexpected error', e);

    }
}

async function deleteCompany(req, res) {
    try {
        let id = req.body.id;
        delete req.body.id;
        let updatedCompany = await Company.findByIdAndUpdate(id, {
            $set: {
                status: 'Inactive'
            }
        }, {
            new: true
        });

        sendResponse(res, 200, 'Company deleted Successfully.', updatedCompany);

    } catch (e) {
        sendResponse(res, 500, 'Unexpected error', e);

    }
}

async function getCompanies(req, res) {
    try {
        let company = await Company.find({
            name: {
                $exists: true
            }
        }, {
            _id: 1,
            name: 1
        }).populate('primaryAdmin', 'email -_id');

        sendResponse(res, 200, 'Successful.', company);

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);

    }
}

async function getCompany(req, res) {
    try {
        let id = req.params.id;
        delete req.params.id;
        let company = await Company.findById(id).populate('subscription members createdBy primaryAdmin').lean();
        let totalEmployees = await User.find({
            company: id
        }).count();
        let data = {};
        company.totalEmployees = totalEmployees;
        delete company.address._id;

        sendResponse(res, 200, 'Successful.', company);

    } catch (e) {
        sendResponse(res, 500, 'Unexpected error', e);

    }
}

async function getPlan(req, res) {
    try {
        console.log(req.params.id);
        let company = await Company.findById(req.params.id);

        if (company) {
            let plan = await Plan.findById(company.subscription).populate('features._id');
            if (plan)
                sendResponse(res, 200, 'Successful.', plan);
            else
                sendResponse(res, 400, 'No plan found.');
        } else {

            sendResponse(res, 400, 'No company found.');

        }
    } catch (e) {
        console.log('error', e);
        sendResponse(res, 500, 'Unexpected Error', e);
    }
}

async function changePlan(req, res) {
    try {
        let company = await Company.findById(req.body.companyId);

        if (company) {
            let updatePlan = await Company.findByIdAndUpdate(req.body.companyId, {
                $set: {
                    subscription: req.body.subscriptionId
                }
            });
            if (updatePlan) {
                sendResponse(res, 200, 'Successful.', updatePlan);

            } else {
                sendResponse(res, 400, 'Plan not updated.');
            }
        } else {

            sendResponse(res, 400, 'No company found.');

        }
    } catch (e) {
        console.log(e, 'error');
    }
}

module.exports = {
    editCompany,
    deleteCompany,
    getCompany,
    getCompanies,
    getPlan,
    changePlan
};
// console.time('start');
// Company.find({
//     name: {
//         $exists: true
//     }
// }, {
//     _id: 1,
//     name: 1
// }).populate('primaryAdmin', 'email -_id').exec().then((success) => {
//     console.log('success', success);
//     console.timeEnd('start');

// }).catch((failed) => {
//     console.error('failed', failed);

// });

// console.time('start2');
// Company.find({
//     name: {
//         $exists: true
//     }
// }, {
//     _id: 1,
//     name: 1
// }).lean().populate('primaryAdmin', 'email -_id').exec().then((success) => {
//     console.log('success', success);
//     console.timeEnd('start2');

// }).catch((failed) => {
//     console.error('failed', failed);

// });
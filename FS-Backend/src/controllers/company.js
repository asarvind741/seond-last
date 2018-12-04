import Company from '../models/company';
import User from '../models/user';
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

module.exports = {
    editCompany,
    deleteCompany,
    getCompany
};
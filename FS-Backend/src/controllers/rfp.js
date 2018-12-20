import Rfp from '../models/rfp';
import User from '../models/user';
import {
    sendResponse,
    SendMail
} from './functions';
import Constants from './constant';

async function createRfp(req, res) {
    try {
        if (!req.body.email)
            sendResponse(res, 400, 'Email is required.');
        let rfp = await new Rfp(req.body).save();
        sendResponse(res, 200, 'Feature created Successfully.', rfp);
        SendMail(Constants.MAIL_FROM, req.body.email, Constants.RFP_MAIL_SUBJECT, `RFP is created with following details ${req.body}`);

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);

    }
}

async function editRfp(req, res) {
    try {
        let id = req.body.id;
        delete req.body.id;
        let updatedRfp = await Rfp.findByIdAndUpdate(id, {
            $set: req.body
        }, {
            new: true
        });
        sendResponse(res, 200, 'Feature updated Successfully.', updatedRfp);

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);

    }
}

async function deleteRfp(req, res) {
    try {
        let id = req.body.id;
        delete req.body.id;
        let updatedRfp = await Rfp.findByIdAndRemove(id);
        sendResponse(res, 200, 'Feature deleted Successfully.', updatedRfp);

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);

    }
}

async function getRfp(req, res) {
    try {
        let query = {};
        if (req.parmas && req.parmas.id) {
            let user = await User.findById(req.parmas.id);
            if (['Buyer', 'Seller', 'Supplier', 'Agent', 'Reseller'].includes(user.role)) {
                query = {
                    createdBy: req.parmas.id
                };
            }
        }
        let rfp = await Rfp.find(query).populate('createdBy');

        sendResponse(res, 200, 'Successful.', rfp);

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);

    }


}

async function updateRfpStatus(req, res) {
    try {
        let id = req.body.id;
        delete req.body.id;
        let status;
        let rfp = await Rfp.findById(id);
        if (rfp) {
            if (rfp.status === 'Active')
                status = 'Inactive';
            else
                status = 'Active';


            let updatedRfp = await Rfp.findByIdAndUpdate(
                id, {
                    $set: {
                        status: status
                    }
                }, {
                    new: true
                }
            );
            sendResponse(res, 200, 'Rfp deleted Successfully.', updatedRfp);
        } else {
            sendResponse(res, 400, 'Rfp not found.');

        }
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}


module.exports = {
    createRfp,
    editRfp,
    deleteRfp,
    getRfp,
    updateRfpStatus
};
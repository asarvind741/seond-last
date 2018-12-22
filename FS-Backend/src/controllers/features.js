import Features from '../models/features';
import {
    sendResponse,
    SendMail
} from './functions';
import Constants from './constant';

async function createFeatures(req, res) {
    try {
        let features = await new Features(req.body).save();
        sendResponse(res, 200, 'Feature created Successfully.', features);

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);

    }
}

async function editFeatures(req, res) {
    try {
        let id = req.body.id;
        delete req.body.id;
        let updatedFeatures = await Features.findByIdAndUpdate(id, {
            $set: req.body
        }, {
            new: true
        });
        sendResponse(res, 200, 'Feature updated Successfully.', updatedFeatures);

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);

    }
}

async function deleteFeatures(req, res) {
    try {
        let id = req.body.id;
        delete req.body.id;
        let updatedFeatures = await Features.findByIdAndRemove(id);
        sendResponse(res, 200, 'Feature deleted Successfully.', updatedFeatures);

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);

    }
}

async function getFeatures(req, res) {
    try {
        let featuress = await Features.find({
            // status: 'Active'
        }).populate('createdBy');

        sendResponse(res, 200, 'Successful.', featuress);

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);

    }
}

async function updateFeaturesStatus(req, res) {
    try {
        let id = req.body.id;
        delete req.body.id;
        let status;
        let features = await Features.findById(id);
        if (features) {
            if (features.status === 'Active')
                status = 'Inactive';
            else
                status = 'Active';


            let updatedFeatures = await Features.findByIdAndUpdate(
                id, {
                    $set: {
                        status: status
                    }
                }, {
                    new: true
                }
            );
            sendResponse(res, 200, 'Features deleted Successfully.', updatedFeatures);
        } else {
            sendResponse(res, 400, 'Features not found.');

        }
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function getFeaturesByRole(req, res) {
    try {
        let featuress = await Features.find({
            role: req.params.role
        }, {
            name: 1,
            _id: 1
        });

        sendResponse(res, 200, 'Successful.', featuress);

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);

    }
}

async function getAllFeaturesByRole(req, res) {
    try {
        let featuress = await Features.find({
            role: req.params.role
        });

        sendResponse(res, 200, 'Successful.', featuress);

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);

    }
}
module.exports = {
    createFeatures,
    editFeatures,
    deleteFeatures,
    getFeatures,
    updateFeaturesStatus,
    getFeaturesByRole,
    getAllFeaturesByRole
};
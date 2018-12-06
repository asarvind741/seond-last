import Filter from '../models/filter';
import {
    sendResponse,
    SendMail
} from './functions';
import Constants from './constant';

async function createFilter(req, res) {

    try {
        let filter = await new Filter(req.body).save();
        sendResponse(res, 200, 'Filter created Successfully.', filter);
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function editFilter(req, res) {

    console.log(req.body);
    try {
        let id = req.body.id;
        delete req.body.id;
        let updatedFilter = await Filter.findByIdAndUpdate(
            id, {
                $set: req.body
            }, {
                new: true
            }
        );
        sendResponse(res, 200, 'Filter updated Successfully.', updatedFilter);
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function updateFilterStatus(req, res) {
    try {
        let id = req.body.id;
        delete req.body.id;
        let status;
        let filter = await Filter.findById(id);
        if (filter) {
            if (filter.status === 'Active')
                status = 'Inactive';
            else
                status = 'Active';


            let updatedFilter = await Filter.findByIdAndUpdate(
                id, {
                    $set: {
                        status: status
                    }
                }, {
                    new: true
                }
            );
            sendResponse(res, 200, 'Filter deleted Successfully.', updatedFilter);
        } else {
            sendResponse(res, 400, 'Filter not found.');

        }
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function deleteFilter(req, res) {
    try {
        let id = req.body.id;
        delete req.body.id;
        let filter = await Filter.findByIdAndRemove(id);
        if (filter) {
            sendResponse(res, 200, 'Filter deleted Successfully.', filter);
        } else {
            sendResponse(res, 400, 'Filter not found.');

        }
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function getFilters(req, res) {
    try {
        let filter = await Filter.find({
            // status: 'Active'
        });
        console.log(filter);

        sendResponse(res, 200, 'Successful.', filter);
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

module.exports = {
    createFilter,
    editFilter,
    updateFilterStatus,
    getFilters
};
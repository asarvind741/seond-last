import Filter from '../models/filter';
import Category from '../models/category';
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
            sendResponse(res, 200, 'Successful.', updatedFilter);
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
        }).populate('createdBy');
        console.log(filter);

        sendResponse(res, 200, 'Successful.', filter);
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function getCategoryFilters(req, res) {
    try {
        let filter = await Filter.find({
            type: 'Category'
        });
        console.log(filter);

        sendResponse(res, 200, 'Successful.', filter);
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function getFiltersByCategory(req, res) {
    try {
        let category = await Category.findById(req.params.id).lean();
        if (!category)
            return sendResponse(res, 400, 'category not found');
        let filters = category.filter;
        console.log('filters', filters);
        let data = [];
        // for (let filter in filters) {
        //     let filterData = await Filter.findById(filters[filter].id);
        //     data.push(filterData);
        //     console.log(filterData, 'data', filter);
        // }

        Promise.all(filters.map(function (filter) {
            return Filter.findById(filter.id).then((data) => {
                return data;
            });
        })).then((data) => {
            console.log(data);
            sendResponse(res, 200, 'Successful.', data);

        });

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

module.exports = {
    createFilter,
    editFilter,
    updateFilterStatus,
    getFilters,
    deleteFilter,
    getCategoryFilters,
    getFiltersByCategory
};
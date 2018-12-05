import {
    sendResponse,
    SendMail
} from './functions';
import Restful from '../models/restful';
import Constants from './constant';

async function editRestful(req, res) {
    try {
        let restful = await Restful.findOneAndUpdate({}, {
            $set: req.body
        });
        sendResponse(res, 200, 'Successfully.', restful);


    } catch (e) {
        console.log(e);
        sendResponse(res, 200, 'Successfully.', e);

    }


}

async function getRestful(req, res) {
    try {
        let restful = await Restful.findOne({});
        sendResponse(res, 200, 'Successfully.', restful);


    } catch (e) {
        console.log(e);
        sendResponse(res, 200, 'Successfully.', e);

    }


}


module.exports = {
    editRestful,
    getRestful
};
import Vat from '../models/vat';
import {
    sendResponse,
    SendMail
} from './functions';
import Constants from './constant';

async function createVat(req, res) {
    try {
        let vat = await new Vat(req.body).save();
        sendResponse(res, 200, 'Vat created Successfully.', vat);

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);

    }
}

async function editVat(req, res) {
    try {
        let id = req.body.id;
        delete req.body.id;
        let updatedVat = await Vat.findByIdAndUpdate(id, {
            $set: req.body
        }, {
            new: true
        });
        sendResponse(res, 200, 'Vat updated Successfully.', updatedVat);

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);

    }
}

async function deleteVat(req, res) {
    try {
        let id = req.body.id;
        delete req.body.id;
        let updatedVat = await Vat.findByIdAndUpdate(id, {
            $set: {
                status: 'Inactive'
            }
        }, {
            new: true
        });
        sendResponse(res, 200, 'Vat deleted Successfully.', updatedVat);

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);

    }
}

async function getVat(req, res) {
    try {
        let Vats = await Vat.find({
//            status: 'Active'
        });

        sendResponse(res, 200, 'Successful.', Vats);

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);

    }


}

async function updateVatStatus(req, res) {
    try {
        let id = req.body.id;
        delete req.body.id;
        let status;
        let vat = await Vat.findById(id);
        if (vat) {
            if (vat.status === 'Active')
                status = 'Inactive';
            else
                status = 'Active';


            let updatedVat = await Vat.findByIdAndUpdate(
                id, {
                    $set: {
                        status: status
                    }
                }, {
                    new: true
                }
            );
            sendResponse(res, 200, 'Vat updated Successfully.', updatedVat);
        } else {
            sendResponse(res, 400, 'Vat not found.');

        }
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}


module.exports = {
    createVat,
    editVat,
    deleteVat,
    getVat,
    updateVatStatus
};

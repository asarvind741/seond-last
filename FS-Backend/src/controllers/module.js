import ServiceModule from '../models/module';
import {
    sendResponse,
    SendMail
} from './functions';
import Constants from './constant';

async function createModule(req, res) {
    try {
        let module = await new ServiceModule(req.body).save();
        sendResponse(res, 200, 'Module created Successfully.', module);

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);

    }
}

async function editModule(req, res) {
    try {
        let id = req.body.id;
        delete req.body.id;
        let updatedModule = await ServiceModule.findByIdAndUpdate(id, {
            $set: req.body
        }, {
            new: true
        });
        sendResponse(res, 200, 'Module updated Successfully.', updatedModule);

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);

    }
}

async function deleteModule(req, res) {
    try {
        let id = req.body.id;
        delete req.body.id;
        let updatedModule = await ServiceModule.findByIdAndRemove(id);
        sendResponse(res, 200, 'Module deleted Successfully.', updatedModule);

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);

    }
}

async function getModule(req, res) {
    try {
        let modules = await ServiceModule.find({
            // status: 'Active'
        });

        sendResponse(res, 200, 'Successful.', modules);

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);

    }


}

async function updateModuleStatus(req, res) {
    try {
        let id = req.body.id;
        delete req.body.id;
        let status;
        let module = await ServiceModule.findById(id);
        if (module) {
            if (module.status === 'Active')
                status = 'Inactive';
            else
                status = 'Active';


            let updatedModule = await ServiceModule.findByIdAndUpdate(
                id, {
                    $set: {
                        status: status
                    }
                }, {
                    new: true
                }
            );
            sendResponse(res, 200, 'Module deleted Successfully.', updatedModule);
        } else {
            sendResponse(res, 400, 'Module not found.');

        }
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}


module.exports = {
    createModule,
    editModule,
    deleteModule,
    getModule,
    updateModuleStatus
};
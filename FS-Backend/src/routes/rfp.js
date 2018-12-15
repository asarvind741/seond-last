import RfpController from '../controllers/rfp';
import passport from 'passport';
module.exports = app => {
    let rfp = '/rfp/';
    app.post(`${rfp}create`, RfpController.createRfp);
    app.post(`${rfp}edit`, RfpController.editRfp);
    app.post(`${rfp}delete`, RfpController.deleteRfp);
    app.get(`${rfp}`, RfpController.getRfp);
    app.post(`${rfp}status-modify`, RfpController.updateRfpStatus);

};
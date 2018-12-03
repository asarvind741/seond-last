import VatController from '../controllers/vat-management';
module.exports = app => {
    let vat = '/vat/';
    console.log('test');
    app.post(`${vat}create`, VatController.createVat);
    app.post(`${vat}edit`, VatController.editVat);
    app.post(`${vat}delete`, VatController.deleteVat);
    app.get(`${vat}`, VatController.getVat);
    app.post(`${vat}status-modify`, VatController.updateVatStatus);

};
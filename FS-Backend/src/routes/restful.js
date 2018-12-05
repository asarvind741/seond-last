import RestfulController from '../controllers/restful';
module.exports = app => {
    let restful = '/restful/';
    console.log('test');
    app.post(`${restful}edit`, RestfulController.editRestful);
    app.get(`${restful}`, RestfulController.getRestful);

};
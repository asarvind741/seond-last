import CompanyController from '../controllers/company';
module.exports = app => {
    let company = '/company/';
    console.log('test');
    app.post(`${company}edit`, CompanyController.editCompany);
    app.post(`${company}delete`, CompanyController.deleteCompany);
    app.get(`${company}:id`, CompanyController.getCompany);


};
import CompanyController from '../controllers/company';
module.exports = app => {
    let company = '/company/';
    console.log('test');
    app.post(`${company}edit`, CompanyController.editCompany);
    app.post(`${company}delete`, CompanyController.deleteCompany);
    app.get(`${company}:id`, CompanyController.getCompany);
    app.get(`${company}`, CompanyController.getCompanies);
    app.get(`${company}plan/:id`, CompanyController.getPlan);
    app.post(`${company}plan/change`, CompanyController.changePlan);


};
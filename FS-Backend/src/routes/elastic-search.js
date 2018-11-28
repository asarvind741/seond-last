import ElasticSearchController from '../controllers/elastic-search';
module.exports = app => {
    let plans = '/elastic/';
    app.get(`${plans}`, ElasticSearchController.searchCategoriesRequest);

};
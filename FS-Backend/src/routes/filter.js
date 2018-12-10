import FilterController from '../controllers/filter';
import passport from 'passport';
module.exports = app => {
    let filter = '/filter/';
    app.post(`${filter}create`, FilterController.createFilter);
    app.post(`${filter}edit`, FilterController.editFilter);
    app.post(`${filter}status-modify`, FilterController.updateFilterStatus);
    app.post(`${filter}delete`, FilterController.deleteFilter);

    app.get(`${filter}`, FilterController.getFilters);
    app.get(`${filter}category-filters`, FilterController.getCategoryFilters);
    app.get(`${filter}getFiltersByCategory/:id`, FilterController.getFiltersByCategory);
};
import CategoryController from '../controllers/cetagories';
import passport from 'passport';
module.exports = app => {
    let category = '/category/';
    console.log('test');
    app.post(`${category}create`, CategoryController.createCategory);
    app.post(`${category}list`, CategoryController.getCategoryFromElastic);
    app.post(`${category}edit`, CategoryController.editCategory);
    app.post(`${category}delete`, CategoryController.deleteCategory);
    app.get(`${category}`, CategoryController.getCategories);
    app.get(`${category}all`, CategoryController.getAllCategories);
    app.post(`${category}add-filter`, CategoryController.getAllCategories);
    app.post(`${category}status-modify`, CategoryController.updateCategoryStatus);


};
import ProductController from '../controllers/product';
module.exports = app => {
    let product = '/product/';
    console.log('test');
    app.post(`${product}create`, ProductController.createProduct);
    app.post(`${product}list`, ProductController.getProductFromElastic);
    app.post(`${product}edit`, ProductController.editProduct);
    app.post(`${product}delete`, ProductController.deleteProduct);
    app.get(`${product}search`, ProductController.getProductAndCategoriesFromElastic);
    app.get(`${product}`, ProductController.getProducts);
    app.get(`${product}:id`, ProductController.getProduct);

};
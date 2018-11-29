import Product from '../models/product';
import fs from 'fs';
import esClient from '../functions/elastic-search-connection';
import {
    sendResponse,
    SendMail
} from './functions';
import Constants from './constant';

Product.createMapping(function (err, mapping) {
    if (err) {
        console.log('error creating mapping ');
        console.log(err);
    } else {
        console.log('mapping created!');
        console.log(mapping);
        callSync();
    }
});

function callSync() {
    let stream = Product.synchronize();
    let count = 0;

    stream.on('data', function (err, doc) {
        if (err) throw err;
        count++;
    });
    stream.on('close', function () {
        console.log('indexed ' + count + ' documents!');
    });
    stream.on('error', function (err) {
        console.log(err);
    });
}


async function createProduct(req, res) {
    try {
        let product = await new Product(req.body).save();
        product.on('es-indexed', function (err, response) {
            if (err) throw err;
            console.log(response);
        });
        sendResponse(res, 200, 'Product created Successfully.', product);
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function getProductFromElastic(req, res) {
    console.log(req.query.name);
    Product.search({
            query: {
                bool: {
                    must: {
                        query_string: {
                            query: req.query.name
                        }
                    },

                    filter: {
                        term: {
                            status: 'active'
                        }
                    }


                }
            }
        }, {
            hydrate: true
        },
        function (err, results) {
            if (err) {
                console.log(err);
                sendResponse(res, 500, 'Unexpected error', err);

            } else {
                sendResponse(res, 200, 'Successful.', results);

            }
        });

}

async function editProduct(req, res) {
    try {
        let id = req.body.id;
        delete req.body.id;
        let updatedProduct = await Product.findByIdAndUpdate(id, {
            $set: req.body
        }, {
            new: true
        });
        sendResponse(res, 200, 'Product updated Successfully.', updatedProduct);

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);

    }
}

async function deleteProduct(req, res) {
    try {
        let id = req.body.id;
        delete req.body.id;
        let updatedModule = await Product.findByIdAndUpdate(id, {
            $set: {
                status: 'Inactive'
            }
        }, {
            new: true
        });

        sendResponse(res, 200, 'Product deleted Successfully.', updatedModule);

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);

    }
}

async function getProductAndCategoriesFromElastic(req, res) {
    try {
        const response = await esClient.search({
            q: req.query.name
        });
        console.log(response.hits);
        sendResponse(res, 200, 'Successful.', response);
    } catch (error) {
        console.log(error);
        sendResponse(res, 500, 'Unexpected error', error);
    }

}

module.exports = {
    createProduct,
    getProductFromElastic,
    editProduct,
    deleteProduct,
    getProductAndCategoriesFromElastic
};
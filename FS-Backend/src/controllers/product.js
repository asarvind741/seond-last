import Product from '../models/product';
import Category from '../models/category';
import Filter from '../models/filter';
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
    let filters = req.body.filters;
    delete req.body.filters;


    let data = filters.map((filter) => {
        console.log(filter, 'filter');
        filter.value = filter.value.map((value) => {
            return value.itemName;
        });
        return filter;
    });
    req.body.filters = data;
    req.body.category = req.body.category[0];
    console.log(filters, '=======', JSON.stringify(data));
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
        let filters = req.body.filters;
        delete req.body.filters;


        let data = filters.map((filter) => {
            console.log(filter, 'filter');
            filter.value = filter.value.map((value) => {
                return value.itemName;
            });
            return filter;
        });
        req.body.filters = data;
        req.body.category = req.body.category[0];
        console.log(filters, '=======', JSON.stringify(data));
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

async function getProducts(req, res) {
    try {
        let id = req.body.id;
        delete req.body.id;
        let product = await Product.find({});
        sendResponse(res, 200, 'Successful.', product);

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);

    }
}

async function getProduct(req, res) {
    try {
        let id = req.params.id;
        let product = await Product.findById(id);
        sendResponse(res, 200, 'Successful.', product);

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);

    }
}


async function updateProductStatus(req, res) {
    try {
        let id = req.body.id;
        delete req.body.id;
        let status;
        let product = await Product.findById(id);
        if (product) {
            if (product.status === 'Active')
                status = 'Inactive';
            else
                status = 'Active';


            let updatedProduct = await Product.findByIdAndUpdate(
                id, {
                    $set: {
                        status: status
                    }
                }, {
                    new: true
                }
            );
            sendResponse(res, 200, 'Successful.', updatedProduct);
        } else {
            sendResponse(res, 400, 'Product not found.');

        }
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

async function getDataFromElastic() {
    let data = {
        index: 'categorys',
        type: 'category',
        _id: '5c0baee43020c198c9998857',
        score: 1,
        _source: {
            name: 'Belt',
            description: 'this is belt category',
            createdBy: '5c012fde9baf385b940f7daf',
            status: 'Active',
            updatedAt: '2018-12-08T11:45:40.540Z',
            createdAt: '2018-12-08T11:45:40.540Z'
        }
    };
    console.log(data.index, 'data._index');
    if (data.index === 'categorys') {
        let categoryId = data._id;
        let category = await Category.findById(categoryId).populate('filter.id');
        console.log(JSON.stringify(category), 'category');
        const response = await esClient.search({
            query: {
                match_phrase_prefix: {
                    name: data._source.name,
                    index: 'products'
                }
            }
        });
        console.log(JSON.stringify(response), 'response');
        // console.log(data);
    }
}
getDataFromElastic();
// {
//     '_index': 'categorys',
//     '_type': 'category',
//     '_id': '5c0baee43020c198c9998857',
//     '_score': 1,
//     '_source': {
//     'name': 'Belt',
//     'description': 'this is belt category',
//     'createdBy': '5c012fde9baf385b940f7daf',
//     'status': 'Active',
//     'updatedAt': '2018-12-08T11:45:40.540Z',
//     'createdAt': '2018-12-08T11:45:40.540Z'
//     }

module.exports = {
    createProduct,
    getProductFromElastic,
    editProduct,
    deleteProduct,
    getProductAndCategoriesFromElastic,
    getProducts,
    getProduct,
    updateProductStatus
};
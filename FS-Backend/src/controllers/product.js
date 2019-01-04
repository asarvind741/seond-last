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
        let product = await Product.find({}).populate('createdBy');
        sendResponse(res, 200, 'Successful.', product);

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);

    }
}

async function getProduct(req, res) {
    try {
        let id = req.params.id;
        let product = await Product.findById(id).populate('createdBy');
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
        let updatedModule = await Product.findByIdAndRemove(id);

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

async function getDataFromElastic(data) {

    console.log(data.index, 'data._index');
    if (data.index === 'categorys') {
        let categoryId = data._id;
        let category = await Category.findById(categoryId).populate('filter.id').lean();
        let filters = category.filter;
        console.log(JSON.stringify(filters), 'category filters');
        const response = await esClient.search({
            index: 'products',
            body: {
                query: {
                    match: {
                        'category.name': data._source.name

                    }
                },
                aggs: {
                    filters: {
                        terms: {
                            field: 'filters.name'
                        }
                    }
                }
            }

        });
        console.log(JSON.stringify(response), 'response');
        // console.log(data);
    } else if (data.index === 'products') {
        const response = await esClient.search({
            index: 'products',
            body: {
                query: {
                    match: {
                        name: data._source.name
                    }
                },

                aggs: {
                    filters: {
                        nested: {
                            path: 'filters'
                        },
                        aggs: {
                            key_name: {
                                terms: {
                                    field: 'filters.name'
                                },
                                aggs: {
                                    key_value: {
                                        terms: {
                                            field: 'filters.value'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            }

        });
        console.log(JSON.stringify(response), 'product response');
        let categoryId = data._source.category.id;
        let category = await Category.findById(categoryId).populate('filter.id').lean();
        let filters = category.filter;
        console.log(JSON.stringify(filters), 'product filters');
        // let categoryName = category.name;
        // const relatedCategory = await esClient.search({
        //     index: 'categorys',
        //     body: {

        //         query: {
        //             bool: {
        //                 must: [{
        //                     query_string: {
        //                         default_field: '_all',
        //                         query: categoryName
        //                     }
        //                 }]
        //             }
        //         }
        //     }

        // });
        // console.log(relatedCategory, 'relatedCategory');
        let query = {
            bool: {
                must: {
                    match: {
                        name: data._source.name

                    }
                },
                filter: []
            }

        };
        let obj = {};
        obj['filters.value'] = 'red';
        console.log(obj, 'obj===');
        query.bool.filter.push({
            term: obj
        });
        obj = {};
        obj['filters.value'] = 'xl';
        query.bool.filter.push({
            term: obj
        });
        console.log(JSON.stringify(query), 'query');
        const filteredData = await esClient.search({
            index: 'products',
            body: {
                query: query,
                aggs: {
                    filters: {
                        terms: {
                            field: 'filters.name'
                        }
                    }
                }
            }
        });

        console.log('product data==>', JSON.stringify(filteredData));

    }
}
getDataFromElastic({

    index: 'categorys',
    _type: 'category',
    _id: '5c0e3c1e255323425122e2a5',
    _version: 31,
    _score: 1,
    _source: {
        name: 'Casual',
        description: 'Casual category',
        createdBy: '5c012fde9baf385b940f7daf',
        status: 'Active',
        updatedAt: '2018-12-10T10:12:46.062Z',
        createdAt: '2018-12-10T10:12:46.062Z'
    }

});

// getDataFromElastic({

//     index: 'products',
//     _type: 'product',
//     _id: '5c1cb28fa137432c360e446c',
//     _version: 1,
//     _score: null,
//     _source: {
//         name: 'woodland shoes'
//     }

// });

/*
query for filters
{
  "query": {
    "bool": {
      "must": {
        "match": {
          "name": "woodland shoes"
        }
      },
      "filter": {
        "term": {
          "filters.value": "yellow"
        }
      }
    }
  },
  "aggs": {
    "filters": {
      "nested": {
        "path": "filters"
      },
      "aggs": {
        "key_name": {
          "terms": {
            "field": "filters.name"
          },
          "aggs": {
            "key_value": {
              "terms": {
                "field": "filters.value"
              }
            }
          }
        }
      }
    }
  }
}
*/

/*

{
  "query": {
    "bool": {
      "must": {
        "match": {
          "name": "online"
        }
      },
      "filter": {
        "term": {
          "filters.value": "red"
        }
      }
    }
  },
  "aggs": {
    "filters": {
      "nested": {
        "path": "filters"
      },
      "aggs": {
        "key_name": {
          "terms": {
            "field": "filters.name"
          },
          "aggs": {
            "key_value": {
              "terms": {
                "field": "filters.value"
              }
            }
          }
        }
      }
    }
  }
}


{
"_index": "products",
"_type": "product",
"_id": "5c1e3630d6235d4dc32d432b",
"_score": 0.3074455,
"_source": {
"name": "Online shop china custom logo contrast colors short sleeves wholesale mens clothing crew neck t shirts in bulk",
"description": "Description",
"images": [
""http://40.71.47.14:5000/file/image-1545483821488.png""
],
"price": 340,
"modules": [
{
"name": "denim",
"id": "5c0909ca4700feb88bab8c04",
"_id": "5c1e3650d6235d4dc32d4334"
}
],
"category": {
"name": "Shirt",
"id": "5c0b9cfa7f71a77d942b7596"
},
"SubCategory": { },
"minOrder": 34,
"company": {
"name": "Synapse India",
"email": "t.bitan@fashionsourcing.com"
},
"regions": [
{
"id": "4",
"name": "American Samoa",
"_id": "5c1e3650d6235d4dc32d4333"
}
,
{
"id": "5",
"name": "Andorra",
"_id": "5c1e3650d6235d4dc32d4332"
}
],
"filters": [
{
"name": "Color",
"value": [
"Red"
,
"Blue"
]
}
,
{
"name": "Size",
"value": [
"XL"
,
"L"
,
"M"
]
}
]
}
}

*/
/*
let array = [];
let newArray = [];
let key1, key2, key3, key4;
array.forEach(data => { console.log(data);
     for (let i = 0; i < data._source.filters.length; i++) {
        if (data._source.filters[i].value.join('').match(/(Red|XL)/)) {
			console.log("true")
        } else {  console.log('false')
        	}
    }})
*/
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
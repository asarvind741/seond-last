import Category from '../models/category';
import fs from 'fs';

import {
  sendResponse,
  SendMail
} from './functions';
import Constants from './constant';

Category.createMapping(function (err, mapping) {
  if (err) {
    console.log('error creating mapping (you can safely ignore this)');
    console.log(err);
  } else {
    console.log('mapping created!');
    console.log(mapping);
    callSync();
  }
});

function callSync() {
  let stream = Category.synchronize();
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
//   var stream = Category.syncronize();

//   stream.on('data', () => {
//       console.log('data added');
//   });

async function createCategory(req, res) {
  try {
    let category = await new Category(req.body).save();
    category.on('es-indexed', function (err, response) {
      if (err) throw err;
      console.log(response);
    });
    sendResponse(res, 200, 'Category created Successfully.', category);
  } catch (e) {
    console.log(e);
    sendResponse(res, 500, 'Unexpected error', e);
  }
}

async function getCategoryFromElastic(req, res) {
  Category.search({
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

async function editCategory(req, res) {
  try {
    let id = req.body.id;
    delete req.body.id;
    let updatedCategory = await Category.findByIdAndUpdate(id, {
      $set: req.body
    }, {
      new: true
    });
    sendResponse(res, 200, 'Category updated Successfully.', updatedCategory);

  } catch (e) {
    console.log(e);
    sendResponse(res, 500, 'Unexpected error', e);

  }
}

async function deleteCategory(req, res) {
  try {
    let id = req.body.id;
    delete req.body.id;
    let updatedModule = await Category.findByIdAndUpdate(id, {
      $set: {
        status: 'Inactive'
      }
    }, {
      new: true
    });

    sendResponse(res, 200, 'Category deleted Successfully.', updatedModule);

  } catch (e) {
    console.log(e);
    sendResponse(res, 500, 'Unexpected error', e);

  }
}

module.exports = {
  createCategory,
  getCategoryFromElastic,
  editCategory,
  deleteCategory
};
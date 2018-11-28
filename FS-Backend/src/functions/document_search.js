import client from './elastic-search-connection';

let searchCategories = (text) => {

  client.search({
    index: 'categories',
    type: 'Material',
    body: {
      query: {
        match_phrase_prefix: {
          CategoryName: text
        }
      },
    },
    _source: ['CategoryName', 'CategoryId']
  }, function (error, response, status) {
    if (error) {
      console.log('search error: ' + error);
    } else {
      console.log('--- Response ---');
      console.log(response);
      return response.hits.hits;
    }
  });

};

module.exports = {
  searchCategories
};
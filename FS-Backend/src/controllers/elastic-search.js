import { searchCategories } from '../functions/document_search';

let searchCategoriesRequest = (req, res) => {
    console.log('reqested string', req.body.textToSearch);
    if (req.body.textToSearch){
        searchCategories('F', (data) => {
            console.log('data', data);
        });
    }
};


module.exports = {
    searchCategoriesRequest
};
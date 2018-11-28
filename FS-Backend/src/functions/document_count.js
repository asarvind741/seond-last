import client from './elastic-search-connection';

client.count({
    index: 'arvind',
    type: 'categories'
}, (err, res, status) => {
    if (err)
        console.log("Error------>", err);
    else if (res)
        console.log("Response---->", res);
})
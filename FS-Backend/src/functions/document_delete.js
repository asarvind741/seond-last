import client from './elastic-search-connection';

client.delete({
    index: 'arvind',
    id: '1',
    type: 'categories'
}, (err, res, status) => {
    if (err)
        console.log("Error------>", err);
    else if (res)
        console.log("Response---->", res);
})
import client from './elastic-search-connection';

client.indices.delete({
    index: 'arvind',
}, (err, res, status) => {
    if(err)
    console.log("Error------>", err);
    else if (res)
    console.log("Response---->", res);
})
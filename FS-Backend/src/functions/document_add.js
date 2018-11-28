import client from './elastic-search-connection';

client.index({
    index: 'categories',
    id: '5',
    type: 'Material',
    body: {
        CategoryName: 'Cow Leather',
        CategoryId: 'M05',
        CategoryType: 'Material',
        Profit: 40,
        Loss: 30,
    }
}, (err, res, status) => {
    if (err)
        console.log('Error------>', err);
    else if (res)
        console.log('Response---->', res);
});
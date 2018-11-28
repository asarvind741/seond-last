import client from './elastic-search-connection';

client.cluster.health({}, (error, res, status) => {
    if (error){
        console.log('error', error);
    }
    else {
    console.log('-- Client Health --', res);
    console.log('status', status);
    }
});


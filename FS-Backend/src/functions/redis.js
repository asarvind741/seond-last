import redis from 'redis';
import bluebird from 'bluebird';


let client = redis.createClient();
// let client = null;

async function connectToRedis() {
    try {
        client.on('connect', () => {
            console.log('connected to Redis store');
        });
    } catch (e) {
        console.log('Not connected to redis store', e);
    }
}

async function storeRefreshToken(userId, refreshToken) {
    try {
        client.set(userId, refreshToken);
    } catch (e) {
        console.log('Refresh token not stored to redis db');
    }
}

function getRefreshToken(userId) {
    return new Promise(function (resolve, reject) {
        client.get(userId, function (err, value) {
            console.log(err, value);
            if (err)
                reject(err);
            else
                resolve(value);
        });

    });

}

module.exports = {
    connectToRedis,
    storeRefreshToken,
    getRefreshToken
};
import History from '../models/history';
import {
    sendResponse
} from '../controllers/functions';

async function addVisitedUrls(req, res) {
    try {
        let history = await History.findOne({
            user: req.body.id
        });
        console.log('history==>', history);
        if (!history) {
            let createHistory = await History.create({
                user: req.body.id
            });
        }
        let data = {
            url: req.body.url
        };
        let urlHistory = await History.findOne({
            $and: [{
                user: req.body.id
            }, {
                visitedUrls: {
                    $elemMatch: {
                        url: req.body.url
                    }
                }
            }],

        });
        console.log('previously visited==>', urlHistory);
        if (urlHistory) {
            let removeOldUrls = await History.update({
                _id: urlHistory._id

            }, {
                $pull: {
                    visitedUrls: {
                        url: req.body.url
                    }
                }
            }, {
                multi: true
            });
            console.log('remove old', removeOldUrls);
        }
        let addVisitedUrl = await History.findOneAndUpdate({
            user: req.body.id
        }, {
            $push: {
                visitedUrls: data
            }
        });
        sendResponse(res, 200, 'Successful.', addVisitedUrl);
        console.log('send rspo', addVisitedUrl);
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected Error.', e);
    }

}


async function addSearchKeywords(req, res) {
    try {
        let history = await History.findOne({
            user: req.body.id
        });
        if (!history) {
            let createHistory = await History.create({
                user: req.body.id
            });
        }
        let data = {
            name: req.body.name,
            pageUrl: req.body.url,
        };
        let searchKeyword = await History.findOneAndUpdate({
            user: req.body.id
        }, {
            $push: {
                searchKeywords: data
            }
        });
        sendResponse(res, 200, 'Successful.', searchKeyword);
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected Error.', e);
    }

}


async function addViewedProducts(req, res) {
    try {
        let history = await History.findOne({
            user: req.body.id
        });
        if (!history) {
            let createHistory = await History.create({
                user: req.body.id
            });
        }
        let addViewedProduct = await History.findOneAndUpdate({
            user: req.body.id
        }, {
            $push: {
                viewedProducts: {
                    productUrl: req.body.url
                }
            }
        });
        sendResponse(res, 200, 'Successful.', addViewedProduct);
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected Error.', e);
    }

}

async function getUserSearchResults(req, res) {
    try {
        let history = await History.findOne({
            user: req.params.id
        });
        if (history)
            sendResponse(res, 200, 'Successful.', history);
        else
            sendResponse(res, 200, 'No user history found.', history);

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected Error.', e);
    }
}

async function clearHistory(req, res) {
    try {
        let history = await History.remove({
            user: req.params.id
        });
        if (history)
            sendResponse(res, 200, 'Successful.', history);
        else
            sendResponse(res, 200, 'No user history found.', history);

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected Error.', e);
    }
}

module.exports = {
    addVisitedUrls,
    addSearchKeywords,
    addViewedProducts,
    getUserSearchResults,
    clearHistory
};
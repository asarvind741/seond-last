import History from '../models/history';
import {
    sendResponse
} from '../controllers/functions';

async function addVisitedUrls(req, res) {
    try {
        let historyId = req.body.id;
        let history = await History.findById(req.body.id);
        if (!history) {
            let createHistory = await History.create({
                user: req.body.id
            });
            historyId = createHistory._id;
        }
        let addVisitedUrl = await History.findByIdAndUpdate(historyId, {
            $push: {
                visitedUrls: {
                    url: req.body.url
                }
            }
        });
        sendResponse(res, 200, 'Successful.', addVisitedUrl);
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected Error.', e);
    }

}


async function addSearchKeywords(req, res) {
    try {
        let historyId = req.body.id;
        let history = await History.findById(req.body.id);
        if (!history) {
            let createHistory = await History.create({
                user: req.body.id
            });
            historyId = createHistory._id;
        }
        let searchKeyword = await History.findByIdAndUpdate(historyId, {
            $push: {
                searchKeywords: {
                    name: req.body.name,
                    pageUrl: req.body.url,
                }
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
        let historyId = req.body.id;
        let history = await History.findById(req.body.id);
        if (!history) {
            let createHistory = await History.create({
                user: req.body.id
            });
            historyId = createHistory._id;
        }
        let addViewedProduct = await History.findByIdAndUpdate(historyId, {
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
        let history = await History.findById(req.params.id);
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
    getUserSearchResults
};
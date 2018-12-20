import HistoryController from '../controllers/history';
const history = '/history/';
module.exports = app => {
    app.post(`${history}url`, HistoryController.addVisitedUrls);
    app.post(`${history}keyword`, HistoryController.addSearchKeywords);
    app.post(`${history}product`, HistoryController.addViewedProducts);
    app.get(`${history}:id`, HistoryController.getUserSearchResults);
    app.post(`${history}delete/:id`, HistoryController.clearHistory);

};
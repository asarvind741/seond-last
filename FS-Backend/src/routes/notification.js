import NotificationController from '../controllers/notification';
module.exports = app => {
    let notification = '/notification/';
    app.get(`${notification}:id`, NotificationController.getNotifications);

};
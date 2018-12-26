import Notification from '../models/notification';

async function addNotification(data) {
    try {
        let notification = await Notification.create(data);
        console.log(notification);
        if (notification)
            return true;
        else
            return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function getNotifications(req, res) {
    try {

    } catch (e) {

    }
}

module.exports = {
    addNotification
};
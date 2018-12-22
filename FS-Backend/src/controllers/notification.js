import Notification from '../models/notification';

async function addNotification(sender, reciever, message, notifcationType, senderName, recieverName) {
    try {
        let notification = Notification.create({
            sender: sender,
            reciever: reciever,
            message: message,
            notifcationType: notifcationType,
            senderName: senderName,
            recieverName: recieverName
        });
        console.log(notification);
        return true;
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
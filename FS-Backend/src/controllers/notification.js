import Notification from '../models/notification';

console.log(require('./functions'), 'require');
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
        let notifications = await Notification.find({
            reciever: req.params.id
        }).sort({
            time: -1
        }).lean();
        if (notifications) {
            let updated = [];
            notifications.forEach(data => {
                let newData = {};
                console.log();
                newData = Object.assign(data, {
                    time: timeDifference(new Date(data.time).getTime())
                });
                console.log(newData);
                updated.push(newData);
            });
            res.status(200).send({
                status: 200,
                message: 'Successful.',
                data: updated
            });
        } else
            res.status(400).send({
                status: 400,
                message: 'No notifications found.',
            });

    } catch (e) {
        console.log(e, 'error');
        res.status(500).send({
            status: 500,
            message: 'Unexpected Error.',
        });
    }
}

function timeDifference(previous) {
    console.log('called');
    let current = Date.now();
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;
    console.log(elapsed, '======', msPerMinute, msPerHour);
    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
    } else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
    } else {
        return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
    }
}


async function readNotification(req, res) {
    try {
        let notifications = await Notification.update({
            reciever: req.params.id
        }, {
            $set: {
                read: true
            }
        }, {
            multi: true,
            new: true
        });
        if (notifications)
            res.status(200).send({
                status: 200,
                message: 'Successful.',
                data: notifications
            });
        else
            res.status(400).send({
                status: 400,
                message: 'No notifications found.',
            });


    } catch (e) {
        console.log(e, 'error');
        res.status(500).send({
            status: 500,
            message: 'Unexpected Error.',
        });
    }
}

module.exports = {
    addNotification,
    getNotifications,
    readNotification
};
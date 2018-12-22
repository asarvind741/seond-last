import {
    CronJob
} from 'cron';
import Cron from './db-backup.js';
import couponExpiration from './coupon-expiration';
let cronJob = new CronJob('0 0 0 * * *', function () {
    Cron.dbAutoBackUp();
    couponExpiration();
    console.log('cron job is running');
}, null, true, 'Asia/Calcutta');
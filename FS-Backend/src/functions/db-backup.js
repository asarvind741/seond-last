import fs from 'fs';
import _ from 'lodash';
import {
    exec
} from 'child_process';

let dbOptions = {
    user: '',
    pass: '',
    host: 'localhost',
    port: 27017,
    database: process.env.DB_NAME,
    autoBackup: true,
    removeOldBackup: true,
    keepLastDaysBackup: 2,
    autoBackupPath: `${__dirname}/../../mongo-backups`
};

/* return date object */
function stringToDate(dateString) {
    return new Date(dateString);
};

/* return if letiable is empty or not. */
function empty(mixedlet) {
    let undef, key, i, len;
    let emptyValues = [undef, null, false, 0, '', '0'];
    for (i = 0, len = emptyValues.length; i < len; i++) {
        if (mixedlet === emptyValues[i]) {
            return true;
        }
    }
    if (typeof mixedlet === 'object') {
        for (key in mixedlet) {
            return false;
        }
        return true;
    }
    return false;
};


// Auto backup script

function dbAutoBackUp() {
    console.log('db called');
    // check for auto backup is enabled or disabled
    if (dbOptions.autoBackup === true) {
        console.log('db called 2');

        let date = new Date();
        let beforeDate, oldBackupDir, oldBackupPath;
        let currentDate = stringToDate(date); // Current date
        let newBackupDir = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
        let newBackupPath = dbOptions.autoBackupPath + 'mongodump-' + newBackupDir; // New backup path for current backup process
        // check for remove old backup after keeping # of days given in configuration
        if (dbOptions.removeOldBackup === true) {
            beforeDate = _.clone(currentDate);
            beforeDate.setDate(beforeDate.getDate() - dbOptions.keepLastDaysBackup); // Substract number of days to keep backup and remove old backup
            oldBackupDir = beforeDate.getFullYear() + '-' + (beforeDate.getMonth() + 1) + '-' + beforeDate.getDate();
            oldBackupPath = dbOptions.autoBackupPath + 'mongodump-' + oldBackupDir; // old backup(after keeping # of days)
        }
        let cmd = 'mongodump --host ' + dbOptions.host + ' --port ' + dbOptions.port + ' --db ' + dbOptions.database + ' --out ' + newBackupPath; // Command for mongodb dump process

        exec(cmd, function (error, stdout, stderr) {
            console.log('db called 3', error);

            if (empty(error)) {
                console.log(error, 'error');
                // check for remove old backup after keeping # of days given in configuration
                if (dbOptions.removeOldBackup === true) {
                    if (fs.existsSync(oldBackupPath)) {
                        exec('rm -rf ' + oldBackupPath, function (err) {
                            if (err)
                                console.log(err, 'mongo error');
                        });
                    }
                }
            }
        });
    }
}

module.exports = {
    dbAutoBackUp
};
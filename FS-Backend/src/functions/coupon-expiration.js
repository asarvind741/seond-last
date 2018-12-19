import Rfp from '../models/rfp';

function setRfpAutoExpire() {
    Rfp.find({
        timeEnd: {
            $lte: new Date()
        }
    }, {
        _id: 1
    }).exec((success) => {
        if (success.length > 0) {
            success.forEach(ids => {
                let setRfpExpire = Rfp.findByIdAndUpdate(ids, {
                    $set: {
                        status: 'Expired'
                    }
                }).exec().then((success) => {
                    console.log('success==>', success);
                }).catch((failed) => {
                    console.log(failed, 'failed');
                });
            });
        } else {
            console.log('no coupon found with criteria');
        }
    }).catch((failed) => {
        console.log(failed, 'failed');
    });
}

module.exports = setRfpAutoExpire;
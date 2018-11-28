import nexmo from 'nexmo';

const Nexmo = new nexmo({
    apiKey: 'a2efc576',
    apiSecret: 'NxVPjKUUS6Pvb2Zk'
})


const from = 'Nexmo';

let sendSMS = (otp, mobile) => {
    console.log("otp", otp, "moble", mobile);
    const text = `Your otp is: ${otp}`
    Nexmo.message.sendSms(from, '9315849265', text, (err, data) => {
        console.log("data", data);
        console.log("err", err);
    })
}

module.exports = sendSMS;
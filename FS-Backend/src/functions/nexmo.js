import Twilio from 'twilio';
import constants from '../controllers/constant';
var client = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
let sendSMS = (otp, mobile) => {
        client.messages.create({
                        body: `${constants.SEND_OTP_TEXT}: ${otp}`,
                        to: '+91' + mobile,
                        from: process.env.TWILIO_NUMBER // From a valid Twilio number
                })
                .then((message) => console.log(message.sid))
                .catch((err) => console.log(err));
};


module.exports = sendSMS;
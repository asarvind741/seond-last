console.log(process.env.MAILGUN_API_KEY)
const mailgun = require('mailgun-js')({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAN,
    proxy: process.env.PROXY
});
import jwt from 'jsonwebtoken';
import constants from '../controllers/constant';
module.exports = {
    sendResponse(res, status, message, data) {
        res.status(status).send({
            status: status,
            message: message,
            data: data
        });
    },

    SendMail(from, to, subject, text) {
        let data = {
            from: from,
            to: to,
            subject: subject,
            text: text
        };
        mailgun.messages().send(data, (error, body) => {
            if (error) {
                console.log(error);
            } else {
                console.log(body);
            }
        });
    },
    jwtAuth(req, res, next) {
        console.log(req.body, 'jwt');
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        console.log(token);
        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, constants.JWT_SECRET, function (err, decoded) {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    console.log(req.body, 'func');
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    }


};
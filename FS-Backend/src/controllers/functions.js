import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
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

        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.ETHERAL_USER_NAME, // generated ethereal user
                pass: process.env.ETHERAL_USER_PASSWORD // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: from, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: text // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
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
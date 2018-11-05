import User from '../models/user';
import jwt from 'jsonwebtoken';
import {
    sendResponse
} from './functions';
async function addUser(req, res) {
    try {
        let user = await User.findOne({
            email: req.body.email
        });
        if (user)
            sendResponse(res, 500, 'User already exists');
        else {
            let newUser = await new User(req.body);
            sendResponse(res, 200, 'User added', newUser);
        }

    } catch (e) {
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function loginUser(req, res) {
    try {
        let user = await User.findOne(req.body);
        if (user) {
            let token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: user
            }, 'secret');
            let data = user;
            data.token = token;
            sendResponse(res, 200, 'Login Successfully', data);

        } else {
            sendResponse(res, 400, 'Username or password maybe incorrect');

        }

    } catch (e) {
        console.log(e)
        sendResponse(res, 500, 'Unexpected error', e);

    }
}
module.exports = {
    addUser,
    loginUser
};
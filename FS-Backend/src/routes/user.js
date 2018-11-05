import UserController from '../controllers/user';
module.exports = app => {
    let user = '/user/';
    app.post(`${user}sign-up`, (req, res) => {
        UserController.addUser(req, res);
    });
    app.post(`${user}login`, (req, res) => {
        UserController.loginUser(req, res);
    });
};
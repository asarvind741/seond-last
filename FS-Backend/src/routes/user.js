import UserController from '../controllers/user';
import {
    jwtAuth
} from '../controllers/functions';
import passport from 'passport';
module.exports = app => {
    let user = '/user/';
    app.post(`${user}sign-up`, UserController.addUser);

    app.post(`${user}verify`, UserController.verifyUser);
    app.post(`${user}send-otp`,
        UserController.sendOTPLogin);
    app.post(`${user}sign-in`,
        passport.authenticate('local'),
        UserController.loginUser
    );
    app.get('/auth/linkedin',
        passport.authenticate('linkedin'));

    app.get('/auth/linkedin/callback',
        passport.authenticate('linkedin'),
        function (req, res) {
            res.redirect('http://localhost:4200/profile?' + req.user);
        });
    app.post(`${user}social-login`, UserController.sociaLoginUser);
    app.get(`${user}`, jwtAuth, UserController.getAllUsers);
    app.post(`${user}update`, jwtAuth, UserController.editUser);
    app.get(`${user}:id`, jwtAuth, UserController.getUser);
    app.post(`${user}modify-status`, jwtAuth, UserController.updateUserStates);
    app.post(`${user}add`, jwtAuth, UserController.addUserFromAdmin);
    app.post(`${user}invite`, jwtAuth, UserController.inviteUser);
    app.post(`${user}sign-up-invite`, jwtAuth, UserController.addFromInvitation);
    app.post(`${user}token`, UserController.refreshTokenStrategy);
};
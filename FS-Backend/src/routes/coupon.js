import CouponController from '../controllers/coupon';
import passport from 'passport';
module.exports = app => {
    let coupon = '/coupon/';
    app.post(`${coupon}create`, CouponController.createCoupon);
    app.post(`${coupon}edit`, CouponController.editCoupon);
    app.post(`${coupon}status-modify`, CouponController.updateCouponStatus);
    app.post(`${coupon}delete`, CouponController.deleteCoupoon);
    app.get(`${coupon}`, CouponController.getCoupons);

};
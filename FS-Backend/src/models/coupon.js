import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const statusTypes = ['Active', 'Inactive'];

const Coupon = new Schema({
  name: {
    type: String,
    required: true,
  },
  // module: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'ServiceModule',
  // },
  module: {
    type: String
  },
  discount: {
    type: Number,
    required: true,
  },
  sentTo: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  couponUrl: String,
  noOfUsersAllowed: {
    type: Number,
    default: 1
  },
  description: {
    type: String
  },
  expiresOn: Date,
  status: {
    type: String,
    enum: statusTypes,
    default: 'Active'
    // select: false,
  },
}, {
  timestamps: true
});

Coupon.pre('save', function(next) {
  const coupon = this;
  let url = 'http://40.71.47.14:5000/coupon';
  let couponUrl = `${url}/${coupon.name}`;
  coupon.couponUrl = couponUrl;
  next();
});

export default mongoose.model('Coupon', Coupon);
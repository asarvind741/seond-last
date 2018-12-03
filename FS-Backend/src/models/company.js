import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Address = new Schema({
  line1: String,
  line2: String,
  city: String,
  state: String,
  postalCode: String,
  country: String
});
const Company = new Schema({
  name: {
    type: String
  },
  address: [{
    type: Address,
    default: Address,
  }],
  primaryAdmin: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  description: String,
  subscription: {
    type: Schema.Types.ObjectId,
    ref: 'Subscription',
  },
  subscriptionLastDate: Date,
  subscriptionBilledAmount: {
    type: Number,
    select: false
  },
  maximumNoOfUsers: Number,
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
    timestamps: true,
  });

export default mongoose.model('Company', Company);
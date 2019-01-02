import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const statusTypes = ['Active', 'Inactive'];
const Subscription = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: statusTypes,
    default: 'Active',
    // select: false,
  },
  price: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  duration: {
    type: String,
    enum: ['2 YEARS', '1 YEAR', 'Monthly', 'Half Yearly', 'Quaterly'],
    default: '1 YEAR',
  },
  rolesAllowed: {
    roleName: String,
    roleType: String
  },
  features: {
    _id: {

      type: Schema.Types.ObjectId,
      ref: 'Features'
    },
    name: String
  },
  moduleIncluded: [{
    // name: String,
    // _id: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'ServiceModule',
    // },
    moduleName: String
  }, ],
}, {
  timestamps: true,
});

export default mongoose.model('Subscription', Subscription);
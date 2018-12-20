import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const statusTypes = ['Active', 'Inactive', 'Expired'];

// discussed with arvind singh
const rfp = new Schema({
  name: {
    type: String,
    required: true,
  },
  company: String,
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: false,
    // select: false,
  },
  countryIsdCode: {
    type: String,
    select: false,
  },
  description: String,
  documents: [String],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  timeStart: {
    type: Date,
    default: Date.now(),
  },
  timeEnd: {
    type: Date,
  },
  status: {
    type: String,
    enum: statusTypes,
    default: 'Active',
    // select: false,
  },
}, {
  timestamps: true
});

export default mongoose.model('RFP', rfp);
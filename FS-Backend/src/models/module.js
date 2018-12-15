import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const statusTypes = ['Active', 'Inactive'];

const ServiceModule = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [String],
  categories: [{
    name: String,
    id: Schema.Types.ObjectId,
  }, ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    default: 'Active',
    enum: statusTypes
  }
}, {
  timestamps: true
});

export default mongoose.model('ServiceModule', ServiceModule);
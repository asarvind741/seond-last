import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const statusTypes = ['Active', 'Inactive'];

const Notification = new Schema({
  notifcationType: {
    type: String,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  reciever: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  senderName: String,
  time: {
    type: Date,
    default: Date.now()
  },
  recieverName: String,
  message: String,
  read: {
    type: Boolean,
    default: false
  },
  images: String,
  status: {
    type: String,
    default: 'Active',
    enum: statusTypes,
    select: false,
  },
}, {
  timestamps: true
});

export default mongoose.model('Notification', Notification);
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const statusTypes = ['Active', 'Inactive'];

const Features = new Schema({
    role: {
        type: String,
        enum: ['Buyer', 'Supplier'],
    },
    name: String,
    feature: [{
        name: String,
        value: String
    }],
    status: {
        default: 'Active',
        type: String,
        enum: statusTypes
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

export default mongoose.model('Features', Features);
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const statusTypes = ['Active', 'Inactive', 'Invited'];

const Vat = new Schema({
    country: {
        id: Number,
        name: String
    },
    state: [{
        id: Number,
        name: String
    }],
    taxes: [{
        value: Number,
        name: String
    }],
    paymentMode: [{
        name: String,
        id: Number
    }],
    status: {
        type: String,
        enum: statusTypes,
        default: 'Active'
    }
}, {
        timestamps: true,
    });

export default mongoose.model('Vat', Vat);
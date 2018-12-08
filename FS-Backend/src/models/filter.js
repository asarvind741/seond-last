import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const filterTypes = ['Product', 'Subscription', 'Special', 'Category'];
const statusTypes = ['Active', 'Inactive'];
const Filter = new Schema({
    serviceCategory: {
        name: String,
        id: Schema.Types.ObjectId
    },
    serviceSection: {
        name: String,
        id: Schema.Types.ObjectId
    },
    category: {
        name: String,
        id: Schema.Types.ObjectId
    },
    type: {
        enum: filterTypes,
        type: String,
        default: 'Product'
    },
    name: String,
    value: [String],
    status: {
        type: String,
        default: 'Active',
        enum: statusTypes
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// posts.createIndex( { location : "2dsphere" } )
export default mongoose.model('Filter', Filter);
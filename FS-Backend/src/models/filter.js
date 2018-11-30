import mongoose from 'mongoose';
const Schema = mongoose.Schema;

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
    subFilters: [{
        name: String,
        value: [String]
    }]
});

// posts.createIndex( { location : "2dsphere" } )
export default mongoose.model('Filter', Filter);
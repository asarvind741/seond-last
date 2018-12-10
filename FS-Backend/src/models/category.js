import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';
import client from '../functions/elastic-search-connection';
const Schema = mongoose.Schema;

const statusTypes = ['Active', 'Inactive'];
const filter = [{
  id: {
    type: Schema.Types.ObjectId,
    ref: 'Filter'

  },
  name: {
    type: String,
    es_indexed: true
  }
}];
const Category = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  image: {
    type: String
  },
  status: {
    type: String,
    enum: statusTypes,
    default: 'Active'
  },
  filter: {
    type: filter,
    es_indexed: false
  }
}, {
  timestamps: true
});

Category.plugin(mongoosastic, {
  esClient: client
});

export default mongoose.model('Category', Category);
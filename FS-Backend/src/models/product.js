import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';
import esClient from '../functions/elastic-search-connection';
const Schema = mongoose.Schema;
const statusTypes = ['Active', 'Inactive'];

const Product = new Schema({
  name: {
    type: String,
    required: true,
  },
  // title: {
  //   type: String,
  //   required: true,
  // },
  description: String,
  gender: {
    type: String,
    enum: ['Men', 'Women', 'Boys', 'Girls', 'Kids'],
  },
  material: String,
  images: [String],

  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  modules: [{
    name: String,
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'ServiceModule',
    },
  }],
  category: {
    name: String,
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
  },
  SubCategory: {
    name: String,
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
  },
  dimensions: {
    width: String,
    height: String,
    length: String,
  },
  size: String,
  productionCountry: String,
  regions: [{
    id: String,
    name: String
  }],
  productRawData: {
    type: Schema.Types.Mixed,
    es_indexed: false

  },
  color: String,
  quantity: {
    type: Number,
  },
  status: {
    type: String,
    default: 'Active',
    enum: statusTypes
  }
}, {
  timestamps: true,
});

Product.plugin(mongoosastic, {
  esClient: esClient
});

export default mongoose.model('Product', Product);
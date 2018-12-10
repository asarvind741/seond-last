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
  // gender: {
  //   type: String,
  //   enum: ['Men', 'Women', 'Boys', 'Girls', 'Kids'],
  // },
  // material: String,
  images: [String],
  price: Number,
  // seller: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  // },
  modules: [{
    name: String,
    id: {
      type: Schema.Types.ObjectId,
      ref: 'ServiceModule',
    },
  }],
  category: {
    name: String,
    id: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
  },
  SubCategory: {
    name: String,
    id: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
  },

  width: String,

  height: String,
  length: String,

  // size: String,
  productionCountry: String,
  regions: [{
    id: String,
    name: String
  }],
  productRawData: {
    type: Schema.Types.Mixed,
    es_indexed: false

  },
  filters: [{
    name: String,
    value: [String],
    id: Schema.Types.ObjectId
  }],
  // color: String,
  // quantity: {
  //   type: Number,
  // },
  status: {
    type: String,
    default: 'Active',
    enum: statusTypes
  },
  createdBy: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }
}, {
  timestamps: true,
});

Product.plugin(mongoosastic, {
  esClient: esClient
});

export default mongoose.model('Product', Product);
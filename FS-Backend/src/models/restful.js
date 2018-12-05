import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Restful = new Schema({
    headers: [{
        key: String,
        value: String
    }],
    ports: [{
        key: String,
        value: String
    }]
});

const RestfulModel = mongoose.model('Restful', Restful);
RestfulModel.find({}, function (err, success) {
    if (err)
        console.log(err);
    else
        new RestfulModel({}).save();

});

export default RestfulModel;
const mongoose = require('mongoose');
const util = require('util');

function BaseSchema(){
    mongoose.Schema.apply(this, arguments);

    this.add({
        createdAt: { type: String, default: Date.now() },
        name: { type: String, required: true},
        rate: {type: Number},
        price: {type: Number, default: 0},
        no_rate: {type: Number},
        preview: {type: String}
    })
}

util.inherits(BaseSchema, mongoose.Schema);

const MeshSchema = new BaseSchema({
    asset: {type: String}
});

module.exports = mongoose.model('MeshAsset', MeshSchema);
let mongoose = require('mongoose');

// create a model class
let productSchema = mongoose.Schema({
    productName: String,
    category: String,
    quantity: Number,
    mfgDate: Date,
    expDate: Date,
    location: String
},
{
    collection: "product"
});

module.exports = mongoose.model('product', productSchema);
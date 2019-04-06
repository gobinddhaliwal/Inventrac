let mongoose = require('mongoose');

// create a model class
let orderSchema = mongoose.Schema({
    orderDescription: String,
    orderNumber: String,
    productQuantity: Number,
    orderPlaceDate: Date,
    orderDeliveryDate: Date,
    Status:String,
    Location: String
   
},
{
    collection: "inventrac"
});

module.exports = mongoose.model('order', orderSchema);
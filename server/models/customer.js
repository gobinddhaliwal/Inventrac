let mongoose = require('mongoose');

// create a model class
let customerSchema = mongoose.Schema({
    
   // customerID: Number,
    customerFirstName: String,
    customerLastName: String,
    customerEmail: String,
    customerPhone: Number,
    customerAddress: String,
    customerCity: String,
    customerPostalCode: String,
    orderPlacedId: Number
},
{
    collection: "customer"
});

module.exports = mongoose.model('customer', customerSchema);
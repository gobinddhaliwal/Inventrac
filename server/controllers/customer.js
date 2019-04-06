let express = require('express');
let router = express.Router();

// create a reference to the db schema
let customerModel = require('../models/customer');

module.exports.displayCustomerList = (req, res, next) =>{
    customerModel.find((err, customerList) => {
        if(err) {
            return console.error(err);
        }
        else {
           // console.log(contactList);

            res.render('customer/index', {
                title: 'Customer List',
                customerList: customerList,
                displayName: req.user ? req.user.displayName : ""
            });
            
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('customer/add', {
        title: 'Add New Customer',
        displayName: req.user ? req.user.displayName : ""
    });
}

module.exports.processAddPage = (req, res, next) => {

    let newCustomer = customerModel({
        "customerFirstName": req.body.customerFirstName,
        "customerLastName": req.body.customerLastName,
        "customerEmail": req.body.customerEmail,
        "customerPhone": req.body.customerPhone,
        "customerAddress": req.body.customerAddress,
        "customerCity": req.body.customerCity,
        "customerPostalCode": req.body.customerPostalCode,
        "orderPlacedId": req.body.orderPlacedId

    });

    customerModel.create(newCustomer, (err, customerModel) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the contact list
            res.redirect('/customer-list');
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    customerModel.findById(id, (err, customerObject) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else
        {
            // show the edit view
            res.render('customers/edit', {
                title: 'Edit Customer',
                customer: customerObject,
                displayName: req.user ? req.user.displayName : ""
            });
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedCustomer = customerModel({
        "_id": id,
        "customerFirstName": req.body.customerFirstName,
        "customerLastName": req.body.customerLastName,
        "customerEmail": req.body.customerEmail,
        "customerPhone": req.body.customerPhone,
        "customerAddress": req.body.customerAddress,
        "customerCity": req.body.customerCity,
        "customerPostalCode": req.body.customerPostalCode,
        "orderPlacedId": req.body.orderPlacedId


    });

    customerModel.update({_id: id}, updatedCustomer, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the contact list
            res.redirect('/customer-list');
        }
    })
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    customerModel.remove({_id: id}, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the contact list
            res.redirect('/customer-list');
        }
    });
}


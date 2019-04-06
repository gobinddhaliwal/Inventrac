let express = require('express');
let router = express.Router();

// create a reference to the db schema
let productModel = require('../models/product');

module.exports.displayProductList = (req, res, next) =>{
    productModel.find((err, productList) => {
        if(err) {
            return console.error(err);
        }
        else {
           // console.log(contactList);

            res.render('products/index', {
                title: 'Product List',
                productList: productList,
                displayName: req.user ? req.user.displayName : ""
            });
            
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('products/add', {
        title: 'Add New Product',
        displayName: req.user ? req.user.displayName : ""
    });
}

module.exports.processAddPage = (req, res, next) => {

    let newProduct = productModel({
        "productName": req.body.productName,
        "category": req.body.category,
        "quantity": req.body.quantity,
        "mfgDate": req.body.mfgDate,
        "expDate": req.body.expDate,
        "location": req.body.location

    });

    productModel.create(newProduct, (err, productModel) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the contact list
            res.redirect('/product-list');
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    productModel.findById(id, (err, productObject) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else
        {
            
                res.render('products/edit', {
                    title: 'Edit Product',
                    product: productObject,
                    displayName: req.user ? req.user.displayName : ""
                });
               
            
            // show the edit view
           
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedProduct = productModel({
        "_id": id,
        "productName": req.body.firstName,
        "category": req.body.category,
        "quantity": req.body.quantity,
        "mfgDate": req.body.mfgDate,
        "expDate": req.body.expDate,
        
        "location": req.body.location


    });

    productModel.update({_id: id}, updatedProduct, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the contact list
            res.redirect('/product-list');
        }
    })
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    productModel.remove({_id: id}, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the contact list
            res.redirect('/product-list');
        }
    });
}


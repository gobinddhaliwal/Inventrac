let express = require('express');
let router = express.Router();

// create a reference to the db schema
let orderModel = require('../models/order');
let productModel = require('../models/product');

module.exports.displayOrdersList = (req, res, next) =>{
    orderModel.find((err, orderList) => {
        if(err) {
            return console.error(err);
        }
        else {
           // console.log(contactList);

            res.render('order/index', {
                title: 'Order List',
                orderList: orderList,
                displayName: req.user ? req.user.displayName : ""
            });
            
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    productModel.find((err,productList) => {
        if(err) {
            return console.error(err);
        }
        else {
           // console.log(contactList);

            res.render('order/add', {
                title: 'Order List',
                product: productList,
                displayName: req.user ? req.user.displayName : ""
            });
}
    });
}



module.exports.processAddPage = (req, res, next) => {

    let newOrder = orderModel({
        "orderDescription": req.body.prod,
        "productQuantity": req.body.productQuantity,
        "orderPlaceDate": req.body.orderPlaceDate,
        "orderDeliveryDate": req.body.orderDeliveryDate,
        "Location":req.body.Location,
        "orderNumber":random,
        "Status":req.body.Status


       
    });

    orderModel.create(newOrder, (err, orderModel) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the contact list
            res.redirect('/order-list');
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    orderModel.findById(id, (err, orderObject) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else
        {
            // show the edit view
            res.render('order/edit', {
                title: 'Edit Order',
                order: orderObject,
                displayName: req.user ? req.user.displayName : ""
            });
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedOrder = orderModel({
        "_id": id,
        "orderDescription": req.body.orderDescription,
        "productQuantity": req.body.productQuantity,
        "orderPlaceDate": req.body.orderPlaceDate,
        "orderDeliveryDate": req.body.orderDeliveryDate,
        "Location":req.body.Location,
        "Status":req.body.Status       

    });

    orderModel.update({_id: id}, updatedOrder, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            if(req.body.Status=="Confirmed")
            {
                

                
                res.render('order/confirm',{
                    title:'Confirm Order',
                    _id:updatedOrder._id
                                })
            }
            else{
            // refresh the contact list
            res.redirect('/order-list');
            }
        }
    })
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    orderModel.remove({_id: id}, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the contact list
            res.redirect('/order-list');
        }
    });
}
module.exports.trackOrder = (req,res,next) => {
    let id = req.params.id;

    orderModel.findById(id, (err, orderObject) => {
        if(err) {
            console.log(err);
            res.end(err);
            
        }
        else
        {
            // show the edit view
           
            res.render('order/track', {
                title: 'Track Order',
                order: orderObject,
                displayName: req.user ? req.user.displayName : "",
            });
        }
    });
}
module.exports.search = (req,res, next) =>{
    let q = req.body.q;
    orderModel.find({orderDescription:q}, (err, orderList) => {
        if(err) {
            console.log(err);
            res.end(err);
            
        }
        else
        {
            // show the edit view
           
            res.render('order/search', {
                title: 'Search Order',
                order: orderList,
                displayName: req.user ? req.user.displayName : "",
            });
        }
    });
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
var random = getRandomInt(10000000);


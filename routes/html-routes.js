// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************
var express = require("express")

var db = require("../models")

// Routes
// =============================================================
module.exports = function(app) {

    //redirects to the home page and puts the customers data onto a dropdown
    app.get("/", function(req, res) {
        db.Customer.findAll({
            include: [db.Burger]
        }).then(function (dbCustomer) {
            console.log(dbCustomer)
            var hbsObject = {
                Customer: dbCustomer,
            }
            res.render("home", hbsObject)
        })
        });

    //this will find the customer selected from the dropdown and proceed to grab their affiliated burgers and redirec to a page only showing their burgers
    //you will also be able to create burgers specifically for this user from that page.
    app.get("/customer/:id", function (req, res) {
        db.Customer.findAll({
            where: {
                id: req.params.id
            },
            include: [db.Burger]
        }).then(function (dbCustomer) {
            var hbsObject = {
                Customer : dbCustomer
            }
            res.render("index", hbsObject)
        })
    })

    //this redirects to the customer list management where you can add and delete and a ref hypertext link to their affiliated json data.
    app.get("/customerlist", function (req, res) {
        db.Customer.findAll({}).then(function (dbCustomer) {
            var hbsObject = {
                customers: dbCustomer
            }
            res.render("customer", hbsObject)
        })
    })

    //put route to update burger status
    app.put("/customer/:id", function (req, res) {
        var directory= "/customer/" + req.params.id
        db.Burger.update({devoured: req.body.devoured}, {
            where: {id: req.body.id}
        }).then(function (dbBurger) {
            res.redirect(directory)
        })
    })

    //delete route to delete a customer
    app.delete("/delete/customers/:id", function(req, res) {
        db.Customer.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbCustomer) {
            res.redirect("/customerlist");
        });
    });

    //post route to create a new burger
    app.post("/create/burger/:id", function (req, res) {
        var directory = "/customer/" + req.params.id
        db.Burger.create({
            burger_name: req.body.burger_name,
            CustomerId: req.params.id
        })
            .then(function (dbBurger) {
                res.redirect(directory)
            })
    })

    //post route to create a new burger
    app.post("/create/customer/", function (req, res) {
        console.log("Creating Customer")
        db.Customer.create({name: req.body.name}).then(function (dbBurger) {
            res.redirect("/customerlist")
        })
    })
};
/**
 * Created by esteb on 5/20/2017.
 */

// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************
var express = require("express")

var db = require("../models")

// Routes
// =============================================================
module.exports = function(app) {

    //Takes you to home page
    app.get("/", function(req, res) {

    });

    //Create a new customer profile
    app.post("/create", function (req, res) {

    });

    //Update customer's info for selected month
    app.put("/id/:month", function (req, res) {

    });

    //Retrieve customer's info for selected month
    app.get("/id/:month", function (req, res) {

    });

};

/**
 * Created by esteb on 5/20/2017.
 */

// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************
var express = require("express")

var passport = require("passport")

var db = require("../models")

// Routes
// =============================================================
module.exports = function (app) {
var mockData = [
    {
        id: 1,
        name: "Bob",
        password: "123456123",
        updatedAt: "2017-05-24T03:17:44.854Z",
        createdAt: "2017-05-24T03:17:44.854Z",
        Goals: [
            {
                id: 1,
                targetGoal: 30,
                updatedAt: "2017-05-24T03:18:37.972Z",
                createdAt: "2017-05-24T03:18:37.972Z",
                UserId: 1
            }
        ],
        Budgets: [
            {
                id: 1,
                salary: 1,
                saving: 1,
                updatedAt: "2017-05-24T03:19:12.049Z",
                createdAt: "2017-05-24T03:19:12.049Z",
                UserId: 1,
                Month: "January"
            },
            {
                id: 1,
                salary: 1,
                saving: 1,
                updatedAt: "2017-05-24T03:19:12.049Z",
                createdAt: "2017-05-24T03:19:12.049Z",
                UserId: 1,
                Month: "May"
            },
            {
                id: 1,
                salary: 1,
                saving: 1,
                updatedAt: "2017-05-24T03:19:12.049Z",
                createdAt: "2017-05-24T03:19:12.049Z",
                UserId: 1,
                Month: "January"
            }
        ],
        Expenses: [
            {
                id: 1,
                month: "may",
                groceries: 30,
                gas: 20,
                mortgage: 10,
                utilities: 12,
                miscellaneous: 30,
                updatedAt: "2017-05-24T03:18:59.203Z",
                createdAt: "2017-05-24T03:18:59.203Z",
                UserId: 1,
                Month: "May"
            },
            {
                id: 2,
                groceries: 30,
                gas: 10,
                mortgage: 20,
                utilities: 10,
                miscellaneous: 20,
                updatedAt: "2017-05-24T03:18:59.203Z",
                createdAt: "2017-05-24T03:18:59.203Z",
                UserId: 1,
                Month: "June",
            },
            {
                id: 2,
                groceries: 30,
                gas: 10,
                mortgage: 20,
                utilities: 10,
                miscellaneous: 20,
                updatedAt: "2017-05-24T03:18:59.203Z",
                createdAt: "2017-05-24T03:18:59.203Z",
                UserId: 1,
                Month: "January",
            },


        ]
    }
]
    app.get("/test", function (req, res) {

        var object =  {
            User : mockData
        };
        console.log(object);
        res.render("dashbar", object);


    });

    app.post('/login', function(req, res, next) {
        passport.authenticate('local', function(err, data) {
            if (!data) { return res.render('failure'); }
            req.logIn(data, function(err) {
                if (err) { return next(err); }
                return res.render('dashbar');
            });
        })
        (req, res, next);
    });

    app.get("/", function (req, res) {
        res.render("login")
    });

    app.get('/logout', function (req, res) {
        req.logOut()
        res.redirect("/")
    })

    app.get("/create", function (req, res) {
        res.render("create");
    });

    app.get("/", function (req, res) {
        res.render("login")
    })

    //Create a new customer profile
    app.post("/create", function (req, res) {
    });

    //Update customer's info for selected month
    app.put("/id/:month", function (req, res) {

    });

    //Retrieve customer's info for selected month
    app.get("/id/:month", function (req, res) {

    });

}


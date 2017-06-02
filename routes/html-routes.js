/**
 * Created by esteb on 5/20/2017.
 */

// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************
var express = require("express");

var passport = require("passport");

var db = require("../models");

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
];
    app.get("/test", function (req, res) {

        var object =  {
            User : mockData
        };
        console.log(object);
        res.render("dashboard", object);


    });

    app.post("/:id/add", function (req, res) {

    })

    app.post('/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user) {
            if (err) { return next(err); }
            if (!user) { return res.redirect('/failure'); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.redirect("/dashboard/" + user.id)
            });
        })(req, res, next);
    });

// As with any middleware it is quintessential to call next()
// if the user is authenticated
    var isAuthenticated = function (req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    };

    app.get("/failure", function (req, res) {
        res.render("failure")
    });

    app.get("/dashboard/:id/", isAuthenticated , function (req, res) {
        var hbsObject =  req.user
        res.render("dashboard", hbsObject)
    });

    app.get("/dashboard/:id/:month",isAuthenticated, function (req, res) {
        db.User.findOne({ where: {id: req.params.id},
        include: [ { model: db.Goal},
                    { model: db.Budget, where: {month: req.params.month}},
                    { model: db.Expense, where: {month: req.params.month}}
        ]
        } )
            .then(function (data) {
                res.render("dashboard", data)
            })
    })

    app.get("/", function (req, res) {
        res.render("login")
    });

    app.get('/logout', function (req, res) {
        req.logOut();
        res.redirect("/")
    });

    app.get('/dashboard/:id/:month/edit', function (req, res) {

    })

    app.get("/create", function (req, res) {
        res.render("create");
    });

    app.get("/:id/add", isAuthenticated, function (req, res) {
        res.render("add", req.user);
    });

    //Create a new customer profile
    app.post('/create', function (req, res) {
        db.User.findOrCreate({
            where: {name: req.body.name},
            defaults: {email: req.body.email, password: req.body.password}
        })
            .then(function (err, data) {
                if (err)
                    throw err
                else res.redirect("/")
            })
        }

    );


    //Update customer's info for selected month
    app.put("/dashboard/:id/:month/edit", function (req, res) {

    });


};


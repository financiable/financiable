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
    app.get("/test", function (req, res) {

        var object =  {
            User : mockData
        };
        console.log(object);
        res.render("dashboard", object);


    })

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

    app.post("/:id/add", function (req, res) {
        db.Expense.findOrCreate({
            where: {month: req.body.month},
            defaults: {
                mortgage: req.body.mortgage,
                utilities: req.body.utilities,
                gas: req.body.gas,
                groceries: req.body.groceries,
                miscellaneous: req.body.misc,
                UserId: req.params.id
            }
        })
            .then(function (err, data) {
                db.Budget.findOrCreate({
                    where: {month: req.body.month},
                    defaults: {
                        earnings: req.body.earnings,
                        UserId: req.params.id
                    }
                })
                    .then(function (err, data) {
                        res.redirect("/dashboard/" + req.params.id + "/" + req.body.month)
                    })
        })
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
        var hbsObject =  req.user;
        //res.json(hbsObject);
        res.render("dashboard", hbsObject);
    });

    app.get("/dashboard/:id/:month", function (req, res) {
        db.User.findOne({ where: {id: req.params.id},
        include: [ { model: db.Goal},
                    { model: db.Budget, where: {month: req.params.month}},
                    { model: db.Expense, where: {month: req.params.month}}
        ]
        } )
            .then(function (data) {
                var hbsObject = {User: data};
                //res.json(data);
                //console.log(data.id);
                res.render("dashsummary", hbsObject)
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
        db.User.findOne({ where: {id: req.params.id},
            include: [ { model: db.Goal},
                { model: db.Budget, where: {month: req.params.month}},
                { model: db.Expense, where: {month: req.params.month}}
            ]
        } )
            .then(function (data) {
                var hbsObject = {User: data};
                //res.json(data);
                //console.log(data.id);
                res.render("edit", hbsObject)
            })

    })

    app.get("/create", function (req, res) {
        res.render("create");
    });

    app.get("/:id/add", function (req, res) {
        res.render("add", req.user);
    });

    //Update customer's info for selected month
    app.put("/dashboard/:id/:month/edit", function (req, res) {
        res.send(req.body.mrg + " " + req.body.utl)
    });


};


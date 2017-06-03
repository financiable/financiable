/**
 * Created by esteb on 5/20/2017.
 */

var express = require("express");

var passport = require("passport");

var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
    app.get("/test", function (req, res) {
        db.Budget.findOne({
            where: {month: "May"}
        })
            .then(function (data) {

                console.log(data.savings)
            })


    })

    app.post('/create', function (req, res) {
            db.User.findOrCreate({
                where: {email: req.body.email},
                defaults: {name: req.body.name, password: req.body.password}
            })
                .then(function (data) {
                    res.redirect("/")
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
                db.Expense.findOne({
                    where: {month: req.body.month},
                })
                    .then(function (data) {
                        console.log(data.totalExpenses)
                        db.Budget.findOrCreate({
                            where: {month: req.body.month},
                            defaults: {
                                totalExpenses: data.totalExpenses,
                                earnings: req.body.earnings,
                                UserId: req.params.id
                            }
                        })
                            .then(function (err, data) {
                                var route = "/dashboard/" + req.params.id + "/" + req.body.month
                                res.redirect(route)
                            })
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

    var isAuthenticated = function (req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    };

    app.get("/failure", function (req, res) {
        res.render("failure")
    });

    app.get("/:id/goal", isAuthenticated, function (req, res) {
        console.log(req.user)
        res.render("goal", req.user)
    })

    app.post("/:id/goal", function (req, res) {
        db.Goal.findOne({
            where: {UserId: req.params.id}}
        )
            .then(function (data) {
                if (!data) {
                    db.Goal.create({
                        targetGoal: req.body.targetGoal,
                        UserId: req.params.id
                    })
                        .then(function (data) {
                            console.log("created a goal")
                            res.redirect("/dashboard/" + req.params.id )
                        })
                }
                    db.Goal.update({
                        targetGoal: req.body.targetGoal},
                        {where: {UserId: req.params.id}
                    })
                        .then(function (data) {
                            console.log("updated a goal")
                            res.redirect("/dashboard/" + req.params.id )
                        })

            })
    })

    app.get("/dashboard/:id/", isAuthenticated , function (req, res) {
        db.User.findOne({ where: {id: req.params.id},
            include: [db.Goal, db.Budget, db.Expense]
        } )
            .then(function (data) {
                var hbsObject = {User: data,
                };
                //res.json(hbsObject)
                res.render("dashboard", hbsObject)
            })
    })

    app.get("/dashboard/:id/:month", function (req, res) {
        db.User.findOne({ where: {id: req.params.id},
        include: [ { model: db.Goal},
                    { model: db.Budget, where: {month: req.params.month}},
                    { model: db.Expense, where: {month: req.params.month}}
        ]
        } )
            .then(function (data) {
                var hbsObject = {User: data,
                                totalExpenses: data.Expenses[0].totalExpenses,
                                savings: data.Budgets[0].savings
                };
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
                res.render("edit", hbsObject)
            })

    })

    app.get("/create", function (req, res) {
        res.render("create");
    });

    app.get("/:id/add",isAuthenticated, function (req, res) {
        console.log(req.user)
        res.render("add", req.user);
    });

    //Update customer's info for selected month
    app.put("/dashboard/:id/:month/edit", function (req, res) {
        db.Expense.update({
            mortgage : req.body.mortgage,
            groceries : req.body.groceries,
            gas: req.body.gas,
            miscellaneous: req.body.miscellaneous,
            utilities: req.body.utilities
        }, {
            where: {
                UserId: req.params.id,
                month: req.params.month
            }
        }).then(function (err, data) {
            db.Expense.findOne({
                where: {month: req.params.month},
            })
                .then(function (data) {
                    console.log(data.totalExpenses)
                    db.Budget.update({
                        earnings: req.body.earnings,
                        totalExpenses: data.totalExpenses,
                    }, {
                        where: {
                            UserId: req.params.id,
                            month: req.params.month
                        }
                    })
                        .then(function (err, data) {
                            var route = "/dashboard/" + req.params.id + "/" + req.params.month
                            res.redirect(route)
                        })
                })
        })
    });


};


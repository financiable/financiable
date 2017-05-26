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
                UserId: 1
            }
        ],
        Expenses: [
            {
                id: 1,
                groceries: 30,
                gas: 20,
                mortgage: 10,
                utilities: 12,
                miscellaneous: 30,
                updatedAt: "2017-05-24T03:18:59.203Z",
                createdAt: "2017-05-24T03:18:59.203Z",
                UserId: 1
            }
        ]
    }
]
    app.get("/test", function (req, res) {
        //db.User.findAll({
             // include: [db.Goal, db.Budget, db.Expense]
            //}).then(function (dbUser) {
        res.render("login");
           // res.render("create", dbUser)
  //      })
    });

    app.get("/", function (req, res) {
        //db.User.findAll({
        // include: [db.Goal, db.Budget, db.Expense]
        //}).then(function (dbUser) {
        res.render("login");
        // res.render("create", dbUser)
        //      })
    });

    app.get("/create", function (req, res) {
        //db.User.findAll({
        // include: [db.Goal, db.Budget, db.Expense]
        //}).then(function (dbUser) {
        res.render("create");
        // res.render("create", dbUser)
        //      })
    });

    app.get("/dashbar", function (req, res) {
        //db.User.findAll({
        // include: [db.Goal, db.Budget, db.Expense]
        //}).then(function (dbUser) {
        res.render("dashbar");
        // res.render("create", dbUser)
        //      })
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

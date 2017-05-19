var db = require("../models");

module.exports = function(app) {

    app.get("/api/customers", function(req, res) {
        db.Customer.findAll({}).then(function(dbCustomer) {
            res.json(dbCustomer);
        });
    });

    app.get("/api/customers/:id", function(req, res) {
        db.Customer.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Burger]
        }).then(function(dbCustomer) {
            res.json(dbCustomer);
        });
    });

};
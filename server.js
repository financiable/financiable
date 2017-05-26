/**
 * Created by esteb on 5/20/2017.
 */
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var logger = require("morgan")
var request = require("request")
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var PORT = process.env.PORT || 3000

var app = express();

app.use(logger("dev"))


// Requiring our models for syncing
var db = require("./models")

passport.use(new Strategy(
    function(username, password, cb) {
        db.User.findOne({ where: {
            name: username,
            password: password
        }
        }
        , function(err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            if (user.password != password) { return cb(null, false); }
            return cb(null, user);
        });
    }));


// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(passport.initialize());
app.use(passport.session());

require("./routes/html-routes.js")(app);
//require("./routes/burger-api-routes.js")(app);
//require("./routes/customer-api-routes.js")(app);

db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT)
    })










})

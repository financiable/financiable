/**
 * Created by esteb on 5/20/2017.
 */
var express = require("express"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    logger = require("morgan"),
    request = require("request"),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    PORT = process.env.PORT || 3000,
    expressSession = require('express-session'),
    cookieParser = require("cookie-parser"),
    flash = require("connect-flash")

var app = express();

app.use(cookieParser());

app.use(flash());

app.use(logger("dev"));

app.use(expressSession({
    secret: 'DingDong',
    resave: true,
    saveUninitialized: true
}));

// Requiring our models for syncing
var db = require("./models");

passport.use("local-login" , new LocalStrategy(
    function(username, password, cb) {
            db.User.findOne({
                where: {name: username},
                include: [db.Goal, db.Budget, db.Expense]
            })
                .then(function (data) {
                    console.log("Strategy is working" + data);
                    if (!data) {
                        return cb(null, false);
                    }
                    if (data.password != password) {
                        return cb(null, false);
                    }
                    return cb(null, data)
                });
    })
    );
passport.serializeUser(function(user, done) {
    console.log('serializing user: ' + ' ' + user);
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    console.log("deserializing user: " + " " + user);
    done(null, user)
});


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

require("./routes/html-routes.js")(app, passport);

db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT)
    })
});


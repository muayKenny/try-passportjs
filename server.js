var express = require('express');

var app = express();

var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var env = require('dotenv').load();
var exphbs = require('express-handlebars');

//For Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// for bodyparse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// passport
app.use(session({secret: 'l00l00', resave: true, saveUninitialized: true})); //session secret

app.use(passport.initialize());

app.use(passport.session()); //persistent login session

app.get('/', function(req, res) {
    res.send('Welcome to Passport with Sequelize');
});

//Models
var models = require("./app/models");

//Routes
var authRoute = require('./app/routes/auth.js')(app);

//Sync Database
models.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});

app.listen(3000, function(err) {
    if (!err)
        console.log("site is live");
    else console.log(err)
});
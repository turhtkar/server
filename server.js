require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const Semester = require('./Models/SemesterModel');  // Add this line at the top of your server.js
const cors = require('cors');
const User = require('./Models/User');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
require('./Controllers/auth');



const app = express();
mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to MongoDB");
});
// 1. Setting up express session
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 's3cur3R@nd0mStr1ng',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
    ,cookie: {
        secure: false, // Set this to true if you're using HTTPS
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));


app.use(bodyParser.json());
app.use(cors({ origin: 'https://interactive-video-player.vercel.app/', credentials: true }));


function getCurrentTerm() {
    const month = new Date().getMonth() + 1; // +1 because getMonth() is 0-indexed

    if (month >= 10 && month <= 2) return 'א';
    if (month >= 3 && month <= 6) return 'ב';
    return 'ג';
}

// Trust proxy (only if you're behind a reverse proxy like Nginx, necessary for 'secure' cookie)
app.set('trust proxy', 1);


// 2. Initialize passport and session support
app.use(passport.initialize());
app.use(passport.session());



app.use("/api", require("./Controllers/CalendarController"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));


module.exports = app;
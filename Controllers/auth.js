const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require("../Models/User");
const Semester = require('../Models/SemesterModel');
const mongoose = require("mongoose");
require('../server')

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

function getCurrentTerm() {
    const date = new Date();
    const month = date.getMonth() + 1; // +1 because getMonth() is 0-indexed
    console.log('this is the date ' + date);
    console.log('this is the month '+ month );
    console.log('this is the day of the month ' + date.getDate());

    if (month >= 9 && date.getDate()>=15 || month <= 2) return {term: 'א', year: date.getFullYear()+1};
    if (month >= 2 && date.getDate()>=15 || month <= 6) return {term: 'ב', year: date.getFullYear()};
    if (month >= 6 && date.getDate()>=15 || month <=9) return {term: 'ג', year: date.getFullYear()};
}


// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: "http://localhost:5000/auth/google/callback",
//   passReqToCallback: true,
// },
// function(request, accessToken, refreshToken, profile, done) {
//   return done(null, profile);
// }));

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/calendar/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
    console.log("Inside GoogleStrategy\n\n\n");
    try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
            const date = new Date();
            // var currentYear = getCurrentTerm().year;
            // var currentTerm = getCurrentTerm().term;
            // if(date.getDate()>20) {
            //     switch (currentTerm) {
            //         case 'א': currentTerm = 'ב';
            //         break;
            //         case 'ב': currentTerm = 'ג';
            //         break;
            //         case 'ג': currentTerm = 'א';
            //         currentYear++;
            //         break;
            //     }
            // }
            // console.log(currentYear + currentTerm);
    
            // Find the current semester from the Semester collection
            const currentSemester = await Semester.findOne({ 
                name: `${'א'}${'2024'}` // Assuming the naming format is 'Term Year', adjust if different
            });
    
            if (!currentSemester) {
                // Handle the error or create the semester if you wish
                return done(new Error("Current semester not found"));
            }
    
            user = new User({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                semesters: [{
                    semesterReference: currentSemester._id,
                    events: []  // This initializes an empty array for events
                }]
            });
            await user.save();
        }
        console.log("Inside GoogleStrategy\n\n\n");
        return done(null, user);
    } catch(error) {
        console.error("Error during authentication:", error);
        console.log("Inside GoogleStrategy\n\n\n");
        done(null, error); 
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const User = require('../Models/User');
    const user = await User.findById(id);
    done(null, user);
});
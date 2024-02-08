const router = require("express").Router();
const Event = require("../Models/Event");
const Semester = require('../Models/SemesterModel');
const Course = require('../Models/Course');
const Guidance = require('../Models/Guidance');
const Histogram = require('../Models/Histograms.js');
const moment = require("moment");
const axios = require('axios');
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../Models/User");
const Degree = require("../Models/Degree");
const Interaction = require("../Models/interactions.js")

require('../server');
require('./auth');

router.get('/auth/google', (req, res) => {
    console.log("Auth route in controller triggered");
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res);
});

router.get('/auth/google/callback', (req, res, next) => {
    console.log("Inside /auth/google/callback route");
    next();
}, passport.authenticate("google", {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: '/auth/google/failure'
}));


router.get('/auth/google/failure', (req, res) => {
    res.send('something went wrong....');
});


router.get('/logout', function(req, res, next){
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Could not log out, please try again.' });
        }
        res.redirect('/');
    });
  });

router.get('/current_user', (req, res) => {
    res.send(req.user);  // Send back the user details
});


router.post('/login', async (req, res) => {
    // ... your login logic, e.g., check password, etc.

    if (loginSuccessful) { // This is a placeholder. You'd replace this with your own login logic.
        req.session.userId = user._id;  // Store the user's ID in the session
        res.send('Login successful');
    } else {
        res.status(401).send('Login failed');
    }
});


router.post('/interactions', async (req, res) => {
    try {
      // Create a new interaction from the request body
      const interaction = new Interaction(req.body);
      console.log(interaction);
  
      // Save the interaction to the database
      await interaction.save();
  
      // Respond with the saved interaction
      res.status(201).json(interaction);
    } catch (error) {
      // Handle errors
      console.error('Error saving interaction:', error);
      res.status(400).json({ message: 'Error saving interaction', error: error.message });
    }
  });

module.exports = router;

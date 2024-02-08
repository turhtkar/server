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
require('../server');
require('./auth');

// get degrees
router.get('/degrees', async (req, res) => {
    try {
        console.log('Fetching all degree names');

        // Fetch only the degree_name field from all Degree documents
        const degrees = await Degree.find({}, { degree_name: 1, _id: 0 });

        return res.status(200).send(degrees);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal server error" });
    }
});
const express = require("express");
const Application = require("../models/Application");

const router = express.Router();


// Submit Application
router.post("/", async (req, res) => {

  try {

    const {
      userId,
      jobId,
      jobTitle,
      company,
      candidateName,
      candidateEmail,
      phone,
      education,
      skills,
      coverLetter,
      status
    } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required"
      });
    }

    const application = new Application({
      userId,
      jobId,
      jobTitle,
      company,
      candidateName,
      candidateEmail,
      phone,
      education,
      skills,
      coverLetter,
      status
    });

    const savedApplication = await application.save();

    res.status(201).json(savedApplication);

  } catch (error) {

    console.error("Application Error:", error);

    res.status(400).json({
      message: error.message
    });

  }

});


// Get Applications of logged-in user
router.get("/", async (req, res) => {

  try {

    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required"
      });
    }

    const applications = await Application
      .find({ userId })
      .sort({ createdAt: -1 });

    res.json(applications);

  } catch (error) {

    console.error("Get Applications Error:", error);

    res.status(500).json({
      message: error.message
    });

  }

});


module.exports = router;
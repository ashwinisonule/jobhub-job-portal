const express = require("express");
const Job = require("../models/Job");

const router = express.Router();


// =========================
// GET ALL JOBS
// =========================

router.get("/", async (req, res) => {
  try {

    const jobs = await Job.find().sort({
      createdAt: -1
    });

    res.json(jobs);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});


// =========================
// DELETE ALL JOBS
// IMPORTANT: keep this BEFORE /:id
// =========================

router.delete("/delete-all", async (req, res) => {

  try {

    await Job.deleteMany({});

    res.json({
      message: "All jobs deleted successfully"
    });

  } catch (error) {

    console.error("Delete all error:", error);

    res.status(500).json({
      message: error.message
    });

  }

});


// =========================
// GET SINGLE JOB
// =========================

router.get("/:id", async (req, res) => {

  try {

    const job = await Job.findById(req.params.id);

    if (!job) {

      return res.status(404).json({
        message: "Job not found"
      });

    }

    res.json(job);

  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }

});


// =========================
// ADD JOB
// =========================

router.post("/", async (req, res) => {

  try {

    const job = new Job(req.body);

    const savedJob = await job.save();

    res.status(201).json(savedJob);

  } catch (error) {

    console.error("Add job error:", error);

    res.status(400).json({
      message: error.message
    });

  }

});


// =========================
// DELETE SINGLE JOB
// =========================

router.delete("/:id", async (req, res) => {

  try {

    const deletedJob =
      await Job.findByIdAndDelete(req.params.id);

    if (!deletedJob) {

      return res.status(404).json({
        message: "Job not found"
      });

    }

    res.json({
      message: "Job deleted successfully"
    });

  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }

});


module.exports = router;
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },

    jobTitle: {
      type: String,
      required: true
    },

    company: {
      type: String,
      required: true
    },

    candidateName: {
      type: String,
      required: true
    },

    candidateEmail: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    education: {
      type: String,
      required: true
    },

    skills: {
      type: String,
      required: true
    },

    coverLetter: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      default: "Applied"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Application", applicationSchema);
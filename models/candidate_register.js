const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CandidateSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    phone_number: {
      type: Number,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 10,
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Cand_r = mongoose.model("Cand_r", CandidateSchema, "C_register");

module.exports = Cand_r;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
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

employeeSchema.virtual('job',{
  ref:'job',
  localField:'_id',
  foreignField:'owner'
})

const Emp_r = mongoose.model("Emp_r", employeeSchema, "E_register");

module.exports = Emp_r;

const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGO;

mongoose.connect(
  url,
  {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err, db) => {
    if (err) {
      return console.log(err);
    } else {
      return console.log("database connected!");
    }
  }
);

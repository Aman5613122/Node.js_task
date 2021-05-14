const express = require("express");
const app = express();
const cookie = require("cookie-parser");
const bodyParser = require("body-parser");

require("dotenv").config();
require("./server/server");

app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookie());

const Route = require("./router/route");

app.use("/", Route);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
  });
  
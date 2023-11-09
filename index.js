const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const UserRouter = require("./Routes/UserRoutes.js");
const BlogRouter = require("./Routes/BlogRoutes.js");

const app = express();
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3000, () => {
  "Server is running...";
});

app.use("/user", UserRouter);
app.use("/blogs", BlogRouter);

mongoose
  .connect(process.env.MONGODB_STRING)
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch(err => {
    console.log(err);
  });

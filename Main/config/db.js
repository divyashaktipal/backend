const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb://0.0.0.0/men").then(() => {
  console.log("Connected to MongoDB database");
});

module.exports = connection;

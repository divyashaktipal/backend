const express = require("express");
const morgan = require("morgan");
const app = express();

const dbConnection = require("./config/db");
const userModel = require("./models/user");
// morgan is a middleware used for logging and debugging
app.use(morgan("dev"));

// built-in middleware to handle urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public")); // to serve static files like css, js, images

app.set("view engine", "ejs");

// custom middleware
// app.use((req, res, next) => {
//   console.log("this is middleware");
// res.send("Response from middleware");
// const a = 2,
//   b = 3;
// console.log("Sum is ", a + b);
// res.send(a + b);
//   next();
// });

// custom and third party middleware for specific route
// app.get(
//   "/",
//   (req, res, next) => {
//     console.log("this middleware is used only for / route");
//     next();
//   },
//   (req, res) => {
//     res.send("Hello World!");
//   }
// );

app.get("/", (req, res) => {
  // res.send("Home Page");
  res.render("index"); // rendering index.ejs file
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.get("/contact", (req, res) => {
  res.send("Contact Page");
});

app.post("/get-form-data", (req, res) => {
  console.log(req.query); // for get request

  console.log(req.body); // for post request
  // res.send(req.query);
  res.send("Form Data Received");
});

// show the register form
app.get("/register", (req, res) => {
  res.render("register");
});

// use to create the register form
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const newUser = await userModel.create({
    username: username,
    email: email,
    password: password,
  });

  // console.log(req.body);
  res.send(newUser);
});

// CRUD - Read operation
app.get("/get-users", (req, res) => {
  userModel
    .find({
      username: "dsp",
    })
    .then((users) => {
      res.send(users);
    });
});

// CRUD - Update Operation
app.get("/update-user", async (req, res) => {
  await userModel.findOneAndUpdate(
    { username: "dsp" },
    { email: "dsp2@gmail.com" }
  );
  res.send("user has updated!");
});

// CRUD - Delete Operation
app.get("/delete-user", async (req, res) => {
  await userModel.findOneAndDelete({
    username: "dh",
  });
  res.send("user has deleted!");
});
app.listen(3000);

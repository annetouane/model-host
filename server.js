const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("./logger/logger");
const connectDB = require("./config/db");
const exphbs = require("express-handlebars");
const path = require("path");

// routes
const InputRoute = require("./routes/InputRoute");
const EmailRoute = require("./routes/EmailRoute");
const SignUpRoute = require("./routes/SignUpRoute");
const AccountConfirmationRoute = require("./routes/AccountConfirmationRoute");
const SignInRoute = require("./routes/SignInRoute");
const ForgottenRoute = require("./routes/ForgottenRoute");
const ChangePasswordRoute = require("./routes/ChangePasswordRoute");
const LoadUserRoute = require("./routes/LoadUserRoute");
const DeleteAccount = require("./routes/DeleteAccount");

// delete
// const config = require("config");
// const db = config.get("mongoURI");

// init server
const app = express();

// init middleware
app.use(cors()); // allows cross origin requests
app.use(logger); // log requests
app.use(express.json({ extended: false })); // parse json
app.use(express.urlencoded({ extended: false })); // allows to handle url encoded data

// view engine set-up
app.engine("handlebars", exphbs({ defaultLayout: false }));
app.set("view engine", "handlebars");

// Static folder
app.use("/public", express.static(path.join(__dirname, "public")));

// app.get("/confirmation", (req, res) => {
//   res.render("contact");
// });

connectDB();

app.use("/input", InputRoute);
app.use("/user-email", EmailRoute);
app.use("/signup", SignUpRoute);
app.use("/email-confirmation", AccountConfirmationRoute);
app.use("/signin", SignInRoute);
app.use("/forgotten-pwd", ForgottenRoute);
app.use("/change-pwd", ChangePasswordRoute);
app.use("/", LoadUserRoute);
app.use("/delete-user", DeleteAccount);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder -> build folder
  app.use(express.static("client/build"));
  // load anything appart the API routes
  app.get("*", (req, res) => {
    // goes to the client/build folder and loads the index.html
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

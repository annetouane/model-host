const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("./logger/logger");
const connectDB = require("./config/db");
const exphbs = require("express-handlebars");
const path = require("path");

// routes
const CreateProjectRoute = require("./routes/CreateProjectRoute");
const UpdateProjectRoute = require("./routes/UpdateProjectRoute");
const InputRoute = require("./routes/InputRoute");
const EmailRoute = require("./routes/EmailRoute");
const SignUpRoute = require("./routes/SignUpRoute");
const AccountConfirmationRoute = require("./routes/AccountConfirmationRoute");
const SignInRoute = require("./routes/SignInRoute");
const ForgottenRoute = require("./routes/ForgottenRoute");
const ChangePasswordRoute = require("./routes/ChangePasswordRoute");
const LoadUserRoute = require("./routes/LoadUserRoute");
const DeleteAccount = require("./routes/DeleteAccount");

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

app.use("/api/create", CreateProjectRoute);
app.use("/api/update", UpdateProjectRoute);
app.use("/api/input", InputRoute);
app.use("/api/user-email", EmailRoute);
app.use("/api/signup", SignUpRoute);
app.use("/api/email-confirmation", AccountConfirmationRoute);
app.use("/api/signin", SignInRoute);
app.use("/api/forgotten-pwd", ForgottenRoute);
app.use("/api/change-pwd", ChangePasswordRoute);
app.use("/api/delete-user", DeleteAccount);
app.use("/api", LoadUserRoute);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder -> build folder
  app.use(express.static("client/build"));
  // app.use("/static", express.static(path.join(__dirname, "client/build")));
  // load anything appart the API routes
  app.get("*", (req, res) => {
    // goes to the client/build folder and loads the index.html
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

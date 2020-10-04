const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("./logger/logger");
const connectDB = require("./config/db");
const exphbs = require("express-handlebars");
const path = require("path");

// routes
const InputRoute = require("./routes/InputRoute");

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

// db configuration
connectDB();

app.use("/input", InputRoute);

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

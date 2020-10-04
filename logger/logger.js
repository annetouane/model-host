const moment = require("moment");

// middleware function
// next allows to move to the next middlewar
// can set the middlewear to return the protocol, host and full url of the request
// can get the date and time of the request with "moment().format()"
// can insert the result in a file

const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }: ${moment().format()}`
  );
  next();
};

module.exports = logger;

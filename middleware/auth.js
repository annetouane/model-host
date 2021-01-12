const jwt = require("jsonwebtoken");
const config = require("config");

// middleware that will valide the token sent in the request
// middleware functions have access to request and response objects
// next is a callback that needs to be run so it can move on to the next piece of middleware
module.exports = function (req, res, next) {
  // get the token from the header
  const token = req.header("x-auth-token");

  // check if there is a token, if not, sends 401
  if (!token) {
    return res.status(401).json({ msg: "token" });
  }

  // verify token's validity
  try {
    // decode the token received from the front-end with the secret key
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // take request object and assign the decoded value which has user in the payload
    // req.user can then be used in any protected route for authentification purpose
    req.user = decoded.user;
    next();
  } catch {
    return res.status(401).send({ msg: "token" });
  }
};

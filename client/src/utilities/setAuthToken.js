import api from "./api";

// JWT is stateless, it won't be stored in the app level or any component state

// check to see if there is a token in localStorage
// put the token in a global header
// send a req to the server for auth validation
// access the token : devtool > application > Local Storage > token
const setAuthToken = (token) => {
  if (token) {
    // assign the token to the header and assign it to the local storage
    api.defaults.headers.common["x-auth-token"] = token;
  } else {
    // else delete the token from the global header and local storage
    delete api.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;

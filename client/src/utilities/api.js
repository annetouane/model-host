import axios from "axios";
// import store from "../store";
// import { LOGOUT } from "../actions/types";

const api = process.env.NODE_ENV === "production" ? 
  axios.create({
    baseURL: "https://simulimo.herokuapp.com/",
    headers: {
      "Content-Type": "application/json",
    },
}) : 
  axios.create({
    baseURL: "http://localhost:5000/",
    headers: {
      "Content-Type": "application/json",
    },
  })

// create a new instance of axios with a custom config.
// const api = axios.create({
//   baseURL: "http://localhost:5000/",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

export default api;
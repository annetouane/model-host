// packages
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Helmet from "react-helmet";
import favicon from "./img/favicon.ico";

// components
import NavBar from "./components/Layout/NavBar";
// import AlerteStrip from "./components/Layout/AlerteStrip";
import MainForm from "./components/InputForm/mainForm";
// import Spinner from "./components/Layout/Spinner";
import ChangePasswordLanding from "./components/auth/ChangePasswordLanding";

// actions
import { loadUser } from "./actions/auth";
import setAuthToken from "./utilities/setAuthToken";

// stylesheets
import "./css/utilities.css";
import "./css/slider.css";

if (localStorage.token) {
  // console.log("app1.js");
  // console.log(localStorage.token);
  setAuthToken(localStorage.token);
}

// // useEffect will execute each time the app is updated
// // this sets the token in local storage
const App = () => {
  useEffect(() => {
    // dispatch is a method on the store, dispatch load user which will dispatch the action to the reducer
    // console.log("app2.js");
    // console.log(localStorage.token);
    store.dispatch(loadUser());
    // [] argument makes sure it only run ones instead of an infinite nbr of times
  }, []);

  return (
    <Provider store={store}>
      <Fragment>
        <Router>
          <Helmet>
            <title>Simulimo</title>
            <link
              rel='icon'
              type='image/png'
              href={favicon}
              sizes='256x256'
              style={{ borderRadius: "100px" }}
            />
          </Helmet>
          <NavBar />
          {/* <AlerteStrip /> */}
          <Switch>
            <Route exact path='/' component={MainForm} />
            <Route
              exact
              path='/change-pwd/:id'
              component={ChangePasswordLanding}
            />
          </Switch>
        </Router>
      </Fragment>
    </Provider>
  );
};

export default App;

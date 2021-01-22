// packages
import React, { Fragment, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Helmet from "react-helmet";
import favicon from "./img/favicon.ico";

// components
import NavBar from "./components/Layout/NavBar";
import Page404Redirect from "./components/Layout/Page404Redirect";
import MainForm from "./components/InputForm/mainForm";
import ForgottenPassword from "./components/auth/ForgottenPassword";
// import AlerteStrip from "./components/Layout/AlerteStrip";
// import Spinner from "./components/Layout/Spinner";
// import ChangePasswordLanding from "./components/auth/ChangePasswordLanding";

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

// useEffect will execute each time the app is updated
// this sets the token in local storage
const App = () => {
  // useEffect(() => {
  //   // dispatch is a method on the store, dispatch load user which will dispatch the action to the reducer
  //   store.dispatch(loadUser());
  // }, []);

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
            <Route exact path='/forgotten-pwd' component={ForgottenPassword} />
            <Route path='/404' component={Page404Redirect} />
            <Redirect to='/404' />
          </Switch>
        </Router>
      </Fragment>
    </Provider>
  );
};

export default App;

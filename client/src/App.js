// packages
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

// components
import NavBar from "../src/components/Layout/NavBar";
import MainForm from "./components/InputForm/MainForm";

// stylesheets
import "./css/utilities.css";
import "./css/slider.css";

const App = () => {
  return (
    <Provider store={store}>
      <Fragment>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path='/' component={MainForm} />
          </Switch>
        </Router>
      </Fragment>
    </Provider>
  );
};

export default App;

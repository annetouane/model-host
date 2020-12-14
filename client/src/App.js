// packages
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Helmet from "react-helmet";
import favicon from "./img/favicon.ico";

// components
import NavBar from "./components/Layout/NavBar";
import Authentication from "./components/auth/Authentication"
import MainForm from "./components/InputForm/mainForm";

// stylesheets
import "./css/utilities.css";
import "./css/slider.css";

const App = () => {
  return (
    <Provider store={store}>
      <Fragment>
        <Router>
        <Helmet>
          <title>Simulimo</title>
          <link rel="icon" type="image/png" href={favicon} sizes="256x256" style={{ borderRadius: "100px" }}/>
        </Helmet>
          <NavBar />
          <Switch>
            <Route exact path='/auth' component={Authentication} />
            <Route exact path='/' component={MainForm} />
          </Switch>
        </Router>
      </Fragment>
    </Provider>
  );
};

export default App;

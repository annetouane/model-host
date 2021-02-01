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
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";

// components
import NavBar from "./components/Layout/NavBar";
import Page404Redirect from "./components/Layout/Page404Redirect";
import MainForm from "./components/InputForm/mainForm";
import ForgottenPassword from "./components/auth/ForgottenPassword";
import Spinner from "./components/Layout/Spinner";
import InfoPage from "././components/Layout/InfoPage";
import CondGenUtil from "././components/Layout/CondGenUtil";

// actions
import { loadUser } from "./actions/auth";
import setAuthToken from "./utilities/setAuthToken";

// stylesheets
import "./css/utilities.css";
import "./css/slider.css";

// place le token dans le global header si présent
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

if (process.env.NODE_ENV === "production") {
  // initialize GA tracking
  ReactGA.initialize("UA-156554460-1", {
    debug: true,
    titleCase: false,
    name: "simulimo-prod",
    gaOptions: {
      siteSpeedSampleRate: 100,
      alwaysSendReferrer: true,
    },
  });
  // call pageView on each route change
  const browserHistory = createBrowserHistory();
  browserHistory.listen((location, action) => {
    ReactGA.pageview(location.pathname + location.search);
  });
}

// useEffect will execute each time the app is updated
// this sets the token in local storage
const App = () => {
  useEffect(() => {
    // dispatch is a method on the store, dispatch load user which will dispatch the action to the reducer
    store.dispatch(loadUser());
    if (process.env.NODE_ENV === "production") {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
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
            {/* <!-- Start of HubSpot Embed Code --> */}
            <script
              type='text/javascript'
              id='hs-script-loader'
              async
              defer
              src='//js.hs-scripts.com/9320762.js'
            ></script>
            {/* <!-- End of HubSpot Embed Code --> */}
            <noscript>You need to enable JavaScript to run this app.</noscript>
          </Helmet>
          <Spinner />
          <NavBar />
          <Switch>
            <Route exact path='/' component={MainForm} />
            <Route exact path='/forgotten-pwd' component={ForgottenPassword} />
            <Route exact path='/information' component={InfoPage} />
            <Route exact path='/cgu' component={CondGenUtil} />
            <Route path='/404' component={Page404Redirect} />
            <Redirect to='/404' />
          </Switch>
        </Router>
      </Fragment>
    </Provider>
  );
};

export default App;

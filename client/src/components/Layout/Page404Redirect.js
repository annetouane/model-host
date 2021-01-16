// package
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// action
import { passwordChangePage } from "../../actions/modals";

const Page404 = ({
  passwordChangePage, // detect si route URL ou autre route
  history, // props router
}) => {
  useEffect(() => {
    // inform the reducer about the current page
    const url = history.location.pathname;
    if (url.includes("404")) {
      passwordChangePage(true);
    }
  }, [history, passwordChangePage]);

  return (
    <section className='background'>
      <div className='page-404'>
        <i className='fas fa-bug'> 404</i>
        <h1>Oops ... cette page n'existe pas</h1>
      </div>
    </section>
  );
};

Page404.propTypes = {
  passwordChangePage: PropTypes.func.isRequired,
};

export default connect(null, { passwordChangePage })(Page404);

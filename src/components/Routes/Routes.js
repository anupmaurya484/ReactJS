import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';

// Authentication related pages
import LoginPage from "../../pages/LoginPage";
import SignupPage from '../../pages/SignupPage';
import ChangePasswordPage from '../../pages/ChangePasswordPage';
import HomePage from "../../pages/HomePage";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        {/* Login and Sign  path*/}
        <Route exact path="/login/:google_id" component={LoginPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/registration" component={SignupPage} />
        <Route exact path="/changepassword/:_id" component={ChangePasswordPage} />

        {/* Home Path  */}
        <Route exact path="/home" component={HomePage} />

      </Switch >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}


export default connect(mapStateToProps, null)(Routes);
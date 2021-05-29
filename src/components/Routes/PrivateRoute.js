import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ user, isAuthenticated, applicationError, level, component: Component, ...rest }) => {

  var obj = { ...rest }, routes, router = obj.location.pathname.split('/')[1];

  const defaultPath = '/Dashboard';

  routes = <Route {...rest} render={props => isAuthenticated ? (router === "") ? <Redirect to={defaultPath} /> : <Component {...props} /> : <Redirect to="/login" />} />

  return routes
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.isLoggedIn
  }
}


export default connect(mapStateToProps)(PrivateRoute);



import React, { Component } from "react";
import { connect } from "react-redux";
import { IntlProvider } from 'react-intl';
import { Route, Switch, IndexRedirect, BrowserRouter as Router, } from "react-router-dom";

// Import Routes all
import PrivateRoute from "./components/Routes/PrivateRoute";
import Layout from "./components/Layout";
import Routes from "./components/Routes/Routes";
import messages from './utils/translations'

// Import scss
import "./assets/scss/theme.scss";

import app_loader from './assets/images/app_loader.svg';

class App extends Component {

	render() {
		const { location } = this.props;
		return (
			<IntlProvider locale={is_lenguage} key={is_lenguage} messages={messages[is_lenguage]}>
				<div id="app-loader" className="app-loader">
					<img width="5%" src={app_loader} />
				</div>
				<Layout>
					<PrivateRoute location={location} path="/" component={Routes} />
				</Layout>
			</IntlProvider>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		layout: state.Layout
	}
}

export default connect(mapStateToProps, null)(App);
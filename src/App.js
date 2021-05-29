import React, { Component } from "react";
import { connect } from "react-redux";
import { IntlProvider } from 'react-intl';
import { Route, Switch, IndexRedirect, BrowserRouter as Router, } from "react-router-dom";
// Import Routes all
import PrivateRoute from "./components/Routes/PrivateRoute";
import Routes from "./components/Routes/Routes";
import messages from './utils/translations'
import * as ACT from './actions';

import Layout from "./components/Layout";
import PreviewFormio from './pages/PreviewFormio'
// Import scss
import "./assets/scss/theme.scss";

import app_loader from './assets/images/app_loader.svg';

class App extends Component {

	UNSAFE_componentWillReceiveProps(props) {
		if (props.user.isLoggedIn && typeof props.user.app_id == "undefined" && props.location) {
			try {
				var app_id = "5f190371db85375976b48101";
				var PathName = "/" + (props.location.pathname.split("/")[1] == "design" ? props.location.pathname.split("/")[2] : props.location.pathname.split("/")[1]);
				if (PathName == "/Admin") {
					app_id = "5f190371db85375976b48102";
				} else if (props.user.UserApps.find(x => x.link == PathName)) {
					app_id = props.user.UserApps.find(x => x.link == PathName)._id
				}
				this.props.loadSidenavConfig(app_id);
			} catch (err) {
				this.props.loadSidenavConfig('5f190371db85375976b48101');
			}
		}
	}

	PublicRouter = () => (
		<Switch>
			<Route exact path="/public/preview-formio" component={PreviewFormio} />
		</Switch>
	)


	render() {
		const { isLoggedIn } = this.props.user;
		const { location } = this.props;
		const is_lenguage = this.props.user.languageType ? this.props.user.languageType.key : 'en';
		const public_paths = ['/public/preview-formio']
		console.log(public_paths.includes(location.pathname));
		console.log(location);
		return (
			<IntlProvider locale={is_lenguage} key={is_lenguage} messages={messages[is_lenguage]}>
				<div id="app-loader" className="app-loader">
					<img width="5%" src={app_loader} />
				</div>

				{public_paths.includes(location.pathname) ?
					<PrivateRoute location={location} path="/" component={this.PublicRouter} />
					:
					<Layout>
						<PrivateRoute location={location} path="/" component={Routes} />
					</Layout>
				}

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

const mapDispatchToProps = (dispatch) => {
	return {
		setApp: (appName) => dispatch(ACT.setApp(appName)),
		loadSidenavConfig: (appName) => dispatch(ACT.loadSidenavConfig(appName)),
		setcurrentPage: (appName) => dispatch(ACT.setcurrentPage(appName))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
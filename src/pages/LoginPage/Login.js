import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import OauthPopup from 'react-oauth-popup';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';

import { fetchUser, loadSidenavConfig } from '../../actions';
import { checkTenatLogin, getQueryString, Toast, GetTenantName } from "../../utils/helperFunctions";
import { verifyemails, doforget, login, loginwithMicrosoft, loginwithGoogle } from "../../actions/users";
import API from "../../config";

import constants from '../../config';
import './loginPage.css';

let authStateParam = btoa(JSON.stringify({ origin: window.location.origin }));
let microsoftUrls = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${constants.microsoftClientId}&scope=${encodeURIComponent(constants.microsoftLoginScopes)}&response_type=code&redirect_uri=${encodeURIComponent(constants.microsoftRedirectUri)}&state=${authStateParam}`


class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = { email: "", password: "", isCall: false, isforget: false, isTenantLogin: false };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.state.isCall = true
        var payload = {
            email: this.state.email,
            password: this.state.password,
            isLogin: this.state.isTenantLogin ? 2 : 1,
            connection: this.props.connection
        }

        this.props.login(payload).then(response => {
            if (response.status === false) {
                Toast(response.message);
            }
        });
    }

    render() {

        let { email, password, isforget, isTenantLogin } = this.state;
        const isLoginButtonDisabled = !email || !password;

        return (
            <div className='login'>
                <Card className="mt-2">
                    <CardBody>
                        <form onSubmit={this.onSubmit} style={{ "textAlign": "left" }}>
                            <p className="h4 text-center py-4 brand-font-color">LOG IN</p>
                            <label htmlFor="lblEmail">
                                Email</label>
                            <input
                                type="text"
                                id="lblEmail"
                                className="form-control"
                                value={email}
                                maxLength="256"
                                onChange={e => this.setState({ email: e.target.value.toLowerCase(), isCall: false })}
                            />
                            <br />
                            <label htmlFor="lblPassword">
                                Password
                                         </label>
                            <input
                                id="lblPassword"
                                type="password"
                                className="form-control"
                                value={password}
                                maxLength="256"
                                onChange={e => this.setState({ password: e.target.value, isCall: false })}
                            />
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" name="is_notify_email" />
                                <label className="form-check-label" htmlFor="inlineRadio1">Stay signed in?</label>
                            </div>
                            <div className="text-center mt-3">
                                <Button type="submit" variant="flat" disabled={isLoginButtonDisabled} className='w-100 m-0 p-2 brand-background-color'>Sign In</Button>
                                <div className="justify-content-between mt-2 d-flex small">
                                    {/* for tenant login we are not showing registration link */}
                                    {!isTenantLogin && <Link to="/registration" onClick={this.handleClickDashboard}>Register a new account</Link>}
                                    <a href="#" onClick={this.forgetPassword}>Reset Password</a>
                                </div>
                            </div>
                        </form>
                    </CardBody>
                </Card>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        User_data: state.user.User_data
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (payload) => dispatch(login(payload)),
        verifyemails: (code) => dispatch(verifyemails(code)),
        doforget: (email) => dispatch(doforget(email)),
        fetchUser: () => dispatch(fetchUser())

    };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

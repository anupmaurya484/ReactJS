import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

// Redux
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { decode } from '../../../utils/crypto'


import { getRandomColor, checkTenatLogin, GetAppName, GetTenantName, isValidProfileURL } from "../../../utils/helperFunctions";
import API from '../../../config';

import * as ACT from '../../../actions'
import * as user from '../../../actions/users';

const ProfileMenu = (props) => {
    const { User_data } = props.user;

    // Declare a new state variable, which we'll call "menu"
    const [menu, setMenu] = useState(false);

    const Logout = (event) => {
        event.preventDefault();
        const payload = { "refresh_token": decode(localStorage.access_token) };
        props.logout(payload);
    }

    const GetTwoName = (name) => {
        try {
            return (name.split(" ")[0][0] + " " + name.split(" ")[1][0]).toUpperCase()
        } catch (e) {
            return name
        }
    }

    return (
        <React.Fragment>
            <Dropdown isOpen={menu} toggle={() => setMenu(!menu)} className="d-inline-block" >
                <DropdownToggle className="btn header-item waves-effect" id="page-header-user-dropdown" tag="button">
                    {(User_data.profile_img && User_data.profile_img != "") ? <img className="rounded-circle header-profile-user" src={isValidProfileURL(API.API_URL, User_data.profile_img)} alt="Header Avatar" />
                        : <div className="profile-name profile-text-imge-small"><span>{GetTwoName(User_data.firstname + " " + User_data.lastname)}</span></div>}
                    <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                </DropdownToggle>
                <DropdownMenu right>
                    <div style={{ "display": "grid", "textAlign": "center", borderBottom: "0.5px solid gray", marginBottom: "10px " }}>
                        {(User_data.profile_img && User_data.profile_img != "") ? <img src={isValidProfileURL(API.API_URL, User_data.profile_img)} className="rounded-circle z-depth-0" style={{ width: "100px", height: "100px", padding: 0, margin: "0 auto" }} alt="" />
                            : <div className="profile-name profile-text-imge"><span>{GetTwoName(User_data.firstname + " " + User_data.lastname)}</span></div>
                        }

                        <span>{User_data.firstname + " " + User_data.lastname}</span>
                        <span style={{ margin: "0px 10px 10px" }}>{User_data.email}</span>
                    </div>

                  <Link to="/home/credit" className="header-credit"><DropdownItem><FormattedMessage id="profile.menu.Credit" /> &nbsp;&nbsp;&nbsp;<strong style={{ color: "rgb(135, 203, 22)" }}>`${User_data.credits}`</strong></DropdownItem></Link> 
                    <Link to="/home/profile" className="header-profile"> <DropdownItem><FormattedMessage id="profile.menu.myaccount" /></DropdownItem></Link>
                    {(!checkTenatLogin()) && false && <DropdownItem className="non-hoverable"></DropdownItem>}
                    {(!checkTenatLogin() && User_data.level != 6) && <Link to="/home/tenantrequest" className="header-profile"> <DropdownItem><FormattedMessage id="profile.menu.reqTenant" /></DropdownItem></Link>}
                    <div className="dropdown-divider"></div>
                    <DropdownItem onClick={Logout} className="dropdown-item"> <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i><span>{'Logout'}</span></DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return { user: state.user }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (payload) => dispatch(user.logout(payload)),
        loadApps: (data) => dispatch(user.loadApps(data)),
        setApp: (appName) => dispatch(ACT.setApp(appName)),
        loadSidenavConfig: (appName) => dispatch(ACT.loadSidenavConfig(appName)),
        setcurrentPage: (appName) => dispatch(ACT.setcurrentPage(appName)),
        setLanagugae: (language) => dispatch(ACT.setLanagugae(language))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileMenu))



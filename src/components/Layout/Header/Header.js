import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import API from '../../../config';

// Redux Store
import { showLeftSidebarAction } from "../../../actions";
// reactstrap
import { Button, Dropdown } from "reactstrap";

// // Import menuDropdown
import LanguageDropdown from "./LanguageDropdown";
import AppDropdown from "./AppDropdown";
import ProfileMenu from "./ProfileMenu";
import TopAppSetting from "./TopAppSetting";
import { GetAppData, AppDesign, AppDeveloperMode } from "../../../utils/helperFunctions";

import logo from "../../../assets/images/logo-small.png";
import beta from "../../../assets/images/beta-new.svg";


const Header = (props) => {
  const { isLoggedIn, User_data, app_id, applicationError } = props.user;
  const company_logo = (isLoggedIn && User_data && User_data.company && User_data.company.company_logo) ? (API.API_URL + '/download?filename=' + User_data.company.company_logo) : logo;
  const header_setting = GetAppData(props.user)
  return (
    <React.Fragment>
      <header id="page-topbar" data-topbar="dark" >
        <div className="navbar-header">
          <div className="d-flex">
            {(isLoggedIn && !applicationError && (header_setting.isSideNav || AppDesign())) &&
              <div className="dropdown d-inline-block">
                <button
                  onClick={() => { props.showLeftSidebarAction(!props.showLeftSidebar); }}
                  type="button"
                  className="btn header-item noti-icon right-bar-toggle waves-effect" >
                  <i className="fa fa-fw fa-bars"></i>
                </button>
              </div>
            }
            <div className="navbar-brand-box">
              <Link to="/" className="logo logo-light">
                <img src={company_logo} alt="" height="22" />
              </Link>

              {AppDeveloperMode() && <img src={beta} alt="" height="15" style={{ marginLeft: "-5px", marginTop: "5px" }} />}

            </div>
          </div>
          {(isLoggedIn) &&
            <div className="d-flex">
              {(AppDesign() && !applicationError) && <TopAppSetting user={props.user} selectedId={app_id} />}
              {((header_setting.is_portalApp == 1 || AppDesign()) && !applicationError) && <AppDropdown />}
              {!applicationError && <LanguageDropdown />}
              <ProfileMenu />
            </div>
          }
        </div>
      </header>
    </React.Fragment>
  );
}

const mapStatetoProps = state => {
  const { showLeftSidebar } = state.Layout;
  return { showLeftSidebar, user: state.user };
};

export default connect(mapStatetoProps, { showLeftSidebarAction })(Header);



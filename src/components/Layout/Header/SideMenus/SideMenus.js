import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { FormGroup } from "reactstrap";

import { connect } from "react-redux";
import { showLeftSidebarAction } from "../../../../actions";
import initialSidenavConfig from '../../../../assets/json/initialSidenavConfig';
import { checkTenatLogin, AppDesign } from "../../../../utils/helperFunctions";
import * as ACT from '../../../../actions';

//SimpleBar
import SimpleBar from "simplebar-react";

import { withRouter, Link } from "react-router-dom";



const SideMenus = (props) => {
  const [state, setState] = useState({
    groupLinks: [],
    rootPath: ""
  });

  useEffect(() => {
    SetGroupLinks(props);
  }, [])

  const SetGroupLinks = (props) => {
    const { isLoggedIn, UserApps, app_id } = props.user;
    var groupLinks = [];
    if (props.user && props.user.sidenavConfig) {
      let rootPath = "";
      if ((!props.user.sidenavConfig.groupLinks || props.user.sidenavConfig.groupLinks.length == 0) || !props) {
        groupLinks = initialSidenavConfig.groupLinks;
      } else {
        groupLinks = props.user.sidenavConfig.groupLinks;
        if (UserApps && app_id && app_id != "") {
          if (app_id == "5f190371db85375976b48101")
            rootPath = "/Dashboard";
          else if (app_id == "5f190371db85375976b48102")
            rootPath = "/Admin";
          else if (app_id == "5f190371db85375976b48103")
            rootPath = "/Admin";
          else if (UserApps.length != 0)
            rootPath = "/" + UserApps.find(x => x._id == app_id).name
          else
            rootPath = "";
        }
      }

      rootPath = (AppDesign() && rootPath != "/Admin") ? ('/design' + rootPath) : rootPath;
      setState({ ...state, groupLinks: groupLinks, rootPath: rootPath })
    }
  }

  const handleClickNavItem = (index, i, idx) => {
    let tempState = state;
    tempState.groupLinks.forEach(ele => {
      ele.links.forEach(eles => {
        if (eles.sublink) {
          eles.sublink.map(eles2 => {
            eles2.is_selected = 0;
          });
        }
        eles.is_selected = 0;
      });
    });
    if (idx >= 0) {
      tempState.groupLinks[index].links[i].sublink[idx].is_selected = 1;
    } else {
      tempState.groupLinks[index].links[i].is_selected = 1;
    }
    setState({ state: tempState });
  }

  let { groupLinks, rootPath } = state;
  const { isLoggedIn, User_data } = props.user;

  return (
    <React.Fragment>
      <div className="side-menu left-bar">
        <SimpleBar style={{ height: "900px" }}>
          <div data-simplebar className="h-100">
            {(groupLinks && groupLinks && groupLinks.length != 0) &&
              groupLinks.map((item, i) => {

                if (!AppDesign() && item.header == "Setup") {
                  return false;
                }

                return (
                  <div key={i}>
                    <div style={MenuHeader}>
                      {item.header}
                    </div>
                    {(item.links && item.links.length != 0) && item.links.map((links, ikinks) => {
                      links.route = (links.route == "/Dashboard" || links.route == "/dashboard") ? "" : links.route;
                      if (links.route == "/sidenav-setup" && isLoggedIn && (User_data.level != 8 && User_data.level != 6))
                        return false;

                      if (links.text == "Tanant management" && isLoggedIn && (User_data.level == 6 || checkTenatLogin()))
                        return false;

                      return (
                        <div key={ikinks} >
                          <Link style={{ padding: "15px 10px 15px 10px", display: "flex" }} to={rootPath + links.route} onClick={(e) => { e.preventDefault(); props.showLeftSidebarAction(false); props.history.push(rootPath + links.route) }} className="rightbar-title">
                            <i style={{ "marginLeft": "10px", "marginRight": "10px" }} className="material-icons brand-font-color left-bar-toggle float-left">{links.icon}</i>
                            <h5 className="m-0">{links.text}</h5>
                          </Link>
                          {links.sublink &&
                            links.sublink.map((sublinks, isublinks) => {
                              return (
                                <span key={isublinks}>
                                  <Link style={{ padding: "20px", display: "flex" }} onClick={(e) => { e.preventDefault(); props.showLeftSidebarAction(false); props.history.push(rootPath + sublinks.route) }} className="rightbar-title">
                                    <i style={{ "marginLeft": "10px", "marginRight": "10px" }} className="material-icons brand-font-color left-bar-toggle float-left">{sublinks.icon}</i>
                                    <h5 className="m-0">{sublinks.text}</h5>
                                  </Link>
                                </span>
                              )
                            })
                          }
                        </div>
                      )
                    })}
                  </div>
                )
              })
            }
          </div>
        </SimpleBar>
      </div>
      <div className="leftbar-overlay" onClick={() => props.showLeftSidebar && props.showLeftSidebarAction(false)}></div>
    </React.Fragment>
  );
}


const MenuHeader = {
  textAlign: "left",
  fontWeight: "700",
  fontSize: "16px",
  textTransform: "capitalize",
  padding: "8px 12px 8px 21px",
  borderBottom: "1px solid #d8d5cf",
  borderTop: "1px solid #d8d5cf",
  marginBottom: "0px"
}


const mapStateToProps = (state) => {
  return {
    user: state.user,
    appName: state.user.appName,
    groupLinks: state.user.sidenavGroupLinks ? state.user.sidenavGroupLinks : [],
    sidenavConfig: state.user.sidenavConfig,
    ...state.Layout
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setApp: (appName) => dispatch(ACT.setApp(appName)),
    setSidenavFromConfig: (collections, groupLinks) => dispatch(ACT.setSidenavFromConfig(collections, groupLinks)),
    showLeftSidebarAction: (flag) => dispatch(showLeftSidebarAction(flag)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideMenus));


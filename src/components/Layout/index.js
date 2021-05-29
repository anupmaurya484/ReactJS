import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container } from 'reactstrap';
// Other Layout related Component
import Navbar from "./Navbar";
import Header from "./Header/Header";
import Footer from "./Footer";
import SideMenus from "./Header/SideMenus";
import { GetAppData, AppDesign } from "../../utils/helperFunctions";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpened: false
    };
  }
  /**
   * Opens the menu - mobile
   */
  openMenu = e => {
    this.setState({ isMenuOpened: !this.state.isMenuOpened });
  };
  render() {
    const { isLoggedIn } = this.props.user;
    const header_setting = GetAppData(this.props.user)
    return (
      <React.Fragment>
        <div id="layout-wrapper">

          {/* With Header  */}
          {(header_setting.isTopNav || AppDesign()) && <Header theme={this.props.topbarTheme} isMenuOpened={this.state.isMenuOpened} openLeftMenuCallBack={this.openMenu} />}
          {(header_setting.isTopNav || AppDesign()) &&
            <div className="main-content">
              <div className="page-content">
                <Container fluid>
                  {this.props.children}
                </Container>
              </div>
            </div>
          }
          <Footer />
        </div>

        {/* With SideNav  */}
        {((header_setting.isSideNav || AppDesign()) && this.props.showLeftSidebar && isLoggedIn) ? <SideMenus /> : null}

        {/* Without Header  */}
        {(!header_setting.isTopNav && !AppDesign()) &&
          <div className="main-content">
            <Container fluid>
              {this.props.children}
            </Container>
          </div>
        }
      </React.Fragment>
    );
  }
}
const mapStatetoProps = state => {
  return {
    ...state.Layout,
    user: state.user,
  };
};
export default connect(mapStatetoProps, {

})(withRouter(Layout));
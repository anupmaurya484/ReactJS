import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col, Modal, ModalBody } from "reactstrap";
import { connect } from 'react-redux';
import AppUserPermission from '../../../pages/AppsSetting/AppUserPermission';
import SidenavSetup from '../../../pages/Sidenav/SidenavSetup';
import CreateApp from '../../../pages/AppsSetting/CreateApp';
import { Toast } from '../../../utils/helperFunctions';
import axiosService from '../../../utils/axiosService'

import {
  CreateUpdateAppList,
  loadApps,
  CreateSidenavConfig
} from "../../../actions/users";

import { loadSidenavConfig } from '../../../actions';

const defaultApss = ["5f190371db85375976b48102", "5f190371db85375976b48101"];

const AppSettingDropdown = (props) => {

  const [Button, setButton] = useState(false);
  const [modalSideMenu, setModalSideMenu] = useState(false);
  const [modalUserPermission, setModalUserPermission] = useState(false);
  const [modalAppSetip, setModalAppSetup] = useState(false);

  const handleClickCreateApp = async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { User_data, UserApps } = props.user;
        const userId = User_data._id;
        const appData = props.user.UserApps.find(x => x._id == props.selectedId);
        if (appData) {
          let groupLink_date = (appData.sidenav && appData.sidenav.groupLinks && appData.sidenav.groupLinks.length >= 1) ? {
            groupLinks: appData.sidenav.groupLinks[0],
            _id: appData.sidenav.sidenavs_id,
            app_id: props.selectedId
          } : [];

          const newDate = new Date().toISOString();
          const defaultData = { _id: "", appName: "", appLogo: "" };
          var isUnique = UserApps.some(x => (x.name == data.appName && x._id != data._id));
          if (isUnique) {
            Toast("Name is already used, please change", 'error');
            resolve(false)
          } else {
            const body = {
              _id: data._id,
              name: data.appName,
              description: data.description,
              application_type: data.application_type,
              isSideNav: data.isSideNav,
              isTopNav: data.isTopNav,
              icon: data.appLogo,
              modifiedTime: newDate,
              modifiedBy: userId,
              default_path: data.default_path === 'custom_url' ? data.default_path_url : data.default_path,
              is_url_page: data.default_path === 'custom_url' ? true : false
            }
            const result = await props.CreateUpdateAppList(body);
            if (groupLink_date.groupLinks) {
              groupLink_date.groupLinks[0]["links"] = data.sidenav_config;
              const sidenav = {
                _id: groupLink_date._id,
                app_id: groupLink_date.app_id,
                groupLinks: groupLink_date.groupLinks
              }
              await props.CreateSidenavConfig(sidenav);
            }
            props.loadSidenavConfig(groupLink_date.app_id)
            const result2 = result.res == 200 ? await props.loadApps({ _id: userId }) : result.res;
            Toast(result.message);
            resolve(true);
          }
        }
      } catch (err) {
        console.log(err);
        resolve(false);
      }
    });
  }

  const UserPermissionModel = () => {
    const appData = props.user.UserApps.find(x => x._id == props.selectedId);
    if (appData)
      return (
        <AppUserPermission
          selectedId={props.selectedId}
          selectedUsers={appData.users ? appData.users : []}
          user={props.user}
          toggle={() => setModalUserPermission(false)}
          CreateUpdateAppList={props.CreateUpdateAppList}
          loadApps={props.loadApps}
        />
      )
  }

  const AppSetupModel = () => {
    try {
      const data = props.user.UserApps.find(x => x._id == props.selectedId);
      var payloadData = {
        _id: data._id,
        appName: data.name,
        description: data.description,
        application_type: data.application_type,
        appLogo: data.icon,
        default_path: data.is_url_page ? 'custom_url' : data.default_path,
        sidenav_config: (data.sidenav && data.sidenav.groupLinks && data.sidenav.groupLinks.length >= 1) ? data.sidenav.groupLinks[0] : [],
        isSideNav: data.isSideNav,
        isTopNav: data.isTopNav,
        is_url_page: data.is_url_page || false,
        default_path_url: data.is_url_page ? data.default_path : ""
      }

      console.log(payloadData);

      return (< CreateApp
        data={payloadData}
        handleClickCreateUpdateApp={handleClickCreateApp}
        onClose={() => setModalAppSetup(false)} />)

    } catch (err) {
      console.log(err.message);
    }

  }

  const SidenavModel = () => {
    var appconfig = { selectedId: props.selectedId }
    return (
      <Modal className="sidenav-page-model" isOpen={modalSideMenu} toggle={() => setModalSideMenu(false)} size="xl">
        <ModalBody>
          <SidenavSetup
            appconfig={appconfig}
            closeModel={(e) => setModalSideMenu(false)} />
        </ModalBody>
      </Modal>
    )
  }

  const appData = props.user.UserApps && props.user.UserApps.find(x => x._id == props.selectedId);

  if (!appData) return false;
  return (
    <React.Fragment>

      {modalSideMenu && SidenavModel()}
      {modalUserPermission && UserPermissionModel()}
      {modalAppSetip && AppSetupModel()}

      <div className="stylish-button d-none d-lg-block d-md-block" style={{ paddingTop: "12px" }}>
        <label onClick={() => setModalUserPermission(true)} title="User Permission" className='mr-3'><i className="fa fa-lock" aria-hidden="true"></i></label>
        <label onClick={() => setModalAppSetup(true)} title="App Setup" className='mr-3'><i className="fa fa-cog" aria-hidden="true"></i></label>
        <label onClick={() => setModalSideMenu(true)} title="App SideMenu Setup" className='mr-3'><i className="fa fa-sliders" aria-hidden="true"></i></label>
      </div>

      <Dropdown isOpen={Button} toggle={() => setButton(!Button)} className="d-md-none d-lg-none">
        <DropdownToggle className="btn header-item noti-icon waves-effect" caret tag="button">
          <i className="fa fa-cogs ml-1"></i>
        </DropdownToggle>
        <DropdownMenu className="" right>
          <Row className="no-gutters">
            <Col>

              {(!defaultApss.includes(props.selectedId)) &&
                <>
                  <DropdownItem tag="button" className="ml-2" onClick={() => setModalUserPermission(true)}>
                    <span id="btn-create-new-app " className="custom-btn header-admin-btn btn btn-primary btn-sm">User Permission</span>
                  </DropdownItem>
                  <DropdownItem tag="button" className="ml-2" onClick={() => setModalAppSetip(true)}>
                    <span id="btn-create-new-app " className="custom-btn header-admin-btn btn btn-primary btn-sm">App Setup</span>
                  </DropdownItem>
                </>
              }
              <DropdownItem tag="button" className="ml-2" onClick={() => setModalSideMenu(true)}>
                <span id="btn-create-new-app " className="custom-btn header-admin-btn btn btn-primary btn-sm">App SideMenu Setup</span>
              </DropdownItem>
            </Col>
          </Row>
        </DropdownMenu >
      </Dropdown >
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => ({
  CreateUpdateAppList: (data) => dispatch(CreateUpdateAppList(data)),
  CreateSidenavConfig: (data) => dispatch(CreateSidenavConfig(data)),
  loadSidenavConfig: (appName) => dispatch(loadSidenavConfig(appName)),
  loadApps: (data) => dispatch(loadApps(data)),
});


export default connect(null, mapDispatchToProps)(AppSettingDropdown)
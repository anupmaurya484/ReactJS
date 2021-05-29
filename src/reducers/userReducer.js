import * as TYPES from '../actions/types';

const initialState = {
  isLoggedIn: false,
  User_data: false,
  isLoginPending: false,
  loginError: null,
  UserApps: [],
  applicationError: false,
  current_page: null
}

export default function (state = initialState, action) {
  switch (action.type) {

    case TYPES.SET_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        User_data: action.User_data
      };

    case TYPES.SET_LOGIN_ERROR:
      return {
        ...state,
        loginError: action.loginError
      };

    case TYPES.LOGOUT_SUCCESS:
      return {
        isLoggedIn: false,
      };

    case TYPES.FETCH_USER:
      return { ...state, ...action.payload }

    case TYPES.ADD_CREDITS:
      return { ...state, ...action.payload }

    case TYPES.SET_APP: {
      const { app_id } = action
      return { ...state, app_id }
    }

    case TYPES.LOAD_COLLECTION_NAV_ITEM_LINKS: {
      const newCollectionNavItem = {
        ...state.collectionNavItem,
        links: action.payload
      }
      return {
        ...state,
        collectionNavItem: newCollectionNavItem
      }
    }

    case TYPES.SET_DEFAULT_NAV_ITEM: {
      const { defaultNavItem } = action
      return { ...state, defaultNavItem }
    }

    case TYPES.SET_ADMIN_SIDENAV_LINKS: {
      const { defaultNavItem } = action
      return {
        ...state,
        collectionNavItem: undefined,
        defaultNavItem
      }
    }

    case TYPES.SET_COLLECTION_NAV_ITEM: {
      const { collectionNavItem } = action
      return { ...state, collectionNavItem }
    }

    case TYPES.SET_SIDENAV_FROM_CONFIG: {
      const { sidenavGroupLinks } = action
      return { ...state, sidenavGroupLinks }
    }

    case TYPES.SET_SIDENAV_GROUP_LINKS: {
      const { sidenavGroupLinks } = action
      return { ...state, sidenavGroupLinks }
    }

    case TYPES.LOAD_SIDENAV_CONFIG: {
      const { sidenavConfig } = action
      return { ...state, sidenavConfig }
    }


    case TYPES.ADMIN_CONFIG_RESPONSE_SUCCESS: {
      const { adminConfig } = action
      return { ...state, adminConfig }
    }

    case TYPES.USER_LISTS_RESPONSE_SUCCESS: {
      const { userLists } = action
      return { ...state, userLists }
    }

    case TYPES.TENANT_REQUEST_RESPONSE_SUCCESS: {
      const { tenantLists } = action
      return { ...state, tenantLists }
    }

    case TYPES.TENANT_CONNECTION_SUCCESS: {
      const { TenantConnection } = action
      return { ...state, TenantConnection }
    }

    case TYPES.SET_DUMMY_MANAGER_AND_DEPARTMENT: {
      const { department, manager } = action.payload
      return { ...state, department, manager }
    }

    case TYPES.SURVEY_COLLECTERS_LISTS_RESPONSE_SUCCESS: {
      const { SurveyCollecterList } = action
      return { ...state, SurveyCollecterList }
    }
    case TYPES.SURVEY_ANALYSIS_RESPONSE_SUCCESS: {
      const { SurveyAnalysis } = action
      return { ...state, SurveyAnalysis }
    }

    case TYPES.SET_CURRENT_PAGE:
      return { ...state, current_page: action.current_page };

    case TYPES.SET_USER_APPS:
      return { ...state, UserApps: action.UserApps };

    case TYPES.SET_APPLICATION_ERROR:
      return { ...state, applicationError: action.applicationError };

    case TYPES.SET_LANGUAGE:
      return { ...state, languageType: action.languageType };

    case TYPES.SET_ShareForm:
      return { ...state, ShareForm: action.ShareForm };


    default:
      return state;
  }
}

import axios from '../utils/axiosService';
import * as TYPES from './types';
import auth from "./auth";


export const SetUserData = (User_data) => {
    return {
        type: TYPES.SET_LOGIN_SUCCESS,
        User_data
    };
}

export const SetLogoutSuccess = (LogoutSuccess) => {
    return {
        type: TYPES.LOGOUT_SUCCESS,
        LogoutSuccess
    };
}
export const TenantConnectionSuccess = (TenantConnection) => {
    return {
        type: TYPES.TENANT_CONNECTION_SUCCESS,
        TenantConnection
    };
}

export const signup = (payload) => async dispatch => {
    try {
        const res = await axios.apis("POST", "/api/signup", payload);
        return res;
    } catch (err) {
        return { status: false, message: "Something is worng." }
    }
}

export const doforget = (payload) => async dispatch => {
    try {
        const res = await axios.apis("POST", "/api/forgetpassword", payload);
        return res;
    } catch (err) {
        return { status: false, message: "Something is worng." }
    }
}

export const changepassword = (payload) => async dispatch => {
    try {
        const res = await axios.apis("POST", "/api/changepassword", payload);
        return res;
    } catch (err) {
        return { status: false, message: "Something is worng." }
    }
}

export const logout = (payload) => async dispatch => {
    try {
        await axios.apis("POST", "/api/logout", payload);
        localStorage.clear();
        auth.resetAuthToken();
        axios.resetAuthToken();
        dispatch(SetLogoutSuccess(false));
    } catch (err) {
        return { res: 200, status: false, message: "Some thing wrong, Please try again." };
    }
}



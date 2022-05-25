import UserService from '../../services/UserService';
import {reset} from 'redux-form';

export const SET_USER = "SET_USER";
export const SET_USER_SIGN_OUT = "SET_USER_SIGN_OUT";

export const SET_USERS = "SET_USERS";

export const SET_MODAL_SHOW = "SET_MODAL_SHOW";
export const SET_CHANGE_PASSWORD_ERROR = "SET_CHANGE_PASSWORD_ERROR";

const api_serv = new UserService();

export function GetUserById(id) {
    return dispatch => {
        api_serv.GetUserById(id)
            .then(response => {
                if (!response.error) {
                    
                    if (!response.photo) {
                        response.photo = {};
                        response.photo.img = null;
                    } else {
                        response.photo.img = "data:image/png;base64," + response.photo.img;
                    }
                    
                    dispatch(SetUser(response));
                }
            });
    }
}

export function GetAllUsers(filterData) {
    return dispatch => {
        api_serv.GetAllUsers(filterData).then(res => {
            if (!res.error) {
                dispatch(SetUsers(res));
            }
        })
    }
}

export function UpdateUserPhoto(userData) {
    return dispatch => {
        api_serv.UpdateUserPhoto({id: userData.id, photo: userData.photoBytes})
            .then(response => {
                if (!response.error) {
                    response.photo.img = "data:image/png;base64," + response.photo.img;
                    dispatch(SetUser(response));
                }
            });
    } 
}

export function UpdateUserRole(userData) {
    return dispatch => {
        api_serv.UpdateUserRole(userData)
            .then(response => {
                if (!response.error) {
                    
                }
            });
    } 
}

export function UpdateUserInfo(userInfo) {
    return dispatch => {
        api_serv.UpdateUserInfo(userInfo)
            .then(response => {
                if (!response.error) {
                    response.photo.img = "data:image/png;base64," + response.photo.img;
                    dispatch(SetUser(response));
                }
            })
    }
}

export function ShowChangePasswordModal(show) {
    return dispatch => {
        dispatch(SetModal(show));
        if (!show) {
            dispatch(reset('change-password-form'));
        }
    }
}

export function ChangePassword(changePasswordData) {
    return dispatch => {
        api_serv.ChangePassword(changePasswordData)
            .then(response => {
                if (!response.error) {
                    dispatch(reset('change-password-form'));
                    dispatch(SetModal(false));
                } else {
                    dispatch(SetChangePasswordFail(response.error));
                }
            });
    }
}

function SetUser(payload) {
    return {
        type: SET_USER,
        payload: payload
    };
}

function SetUsers(payload) {
    return {
        type: SET_USERS,
        payload: payload
    };
}

function SetModal(payload) {
    return {
        type: SET_MODAL_SHOW,
        payload: payload
    }
}

function SetChangePasswordFail(payload) {
    return {
        type: SET_CHANGE_PASSWORD_ERROR,
        payload: payload
    }
}
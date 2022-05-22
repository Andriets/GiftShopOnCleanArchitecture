import UserService from '../../services/UserService';
import { GetUserById } from '../UserProfile/UserAction';

export const SET_REGISTER_SUCCESS = "SET_REGISTER_SUCCESS";
export const SET_REGISTER_FAIL = "SET_REGISTER_FAIL";

const api_serv = new UserService();

export function Register(registerData) {
    return dispatch => {
        const res = api_serv.Register(registerData);
        registerResponseHandler(res, dispatch);
    }
}

const registerResponseHandler = (res, dispatch) => {
    res.then(response => {
        if (response.error) {
            dispatch(setRegisterFail(response.error));
        } else {
            localStorage.setItem('JwtToken', response.jwtToken);
            localStorage.setItem('Id', response.id);
            dispatch(setLoginSuccess(true));
            window.location.replace(`${window.location.origin}/Login`);
        }
    });
};

function setRegisterFail(payload) {
    return {
        type: SET_REGISTER_FAIL,
        payload: payload
    };
}

function setLoginSuccess(payload) {
    return {
        type: SET_REGISTER_SUCCESS,
        payload: payload
    };
}

function validate(formData) {
    
}
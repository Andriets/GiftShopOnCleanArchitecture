import UserService from '../../services/UserService';

export const SET_LOGIN_SUCCESS = "SET_LOGIN_SUCCESS";
export const SET_LOGIN_FAIL = "SET_LOGIN_FAIL";

const api_serv = new UserService();

export function SignIn(email, password) {
    return dispatch => {
        const res = api_serv.SignIn({ Email: email, Password: password }); 
        loginResponseHandler(res, dispatch);
    }
}

const loginResponseHandler = (res, dispatch) => {
    res.then(response => {
        if (!response.error) {
            localStorage.setItem('JwtToken', response.jwtToken);
            localStorage.setItem('Id', response.id);
            dispatch(setLoginSuccess(true));
            window.location.replace(`${window.location.origin}/Home`);
        } else {
            localStorage.clear();
            dispatch(setLoginFail(response.error));
        }
    });
};

function setLoginSuccess(payload) {
    return {
        type: "SET_LOGIN_SUCCESS",
        payload: payload
    };
}
  
  function setLoginFail(payload) {
    return {
        type: "SET_LOGIN_FAIL",
        payload: payload
    };
}
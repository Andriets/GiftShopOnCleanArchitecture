import UserService from '../../services/UserService';

export const SET_USER = "SET_USER";
export const SET_USER_SIGN_OUT = "SET_USER_SIGN_OUT";

const api_serv = new UserService();

export function GetUserById(id) {
    return dispatch => {
        api_serv.GetUserById(id)
            .then(response => {
                if (!response.error) {
                    dispatch(SetUser(response));
                }
            });
    }
}

export async function UpdateUserPhoto(userData) {
    await api_serv.UpdateUserPhoto(userData);
}

function SetUser(payload) {
    return {
        type: SET_USER,
        payload: payload
    };
}
import UserService from '../../services/UserService';

export const SET_USER = "SET_USER";
export const SET_USER_SIGN_OUT = "SET_USER_SIGN_OUT";

const api_serv = new UserService();

export function GetUserById(id) {
    return dispatch => {
        api_serv.GetUserById(id)
            .then(response => {
                if (!response.error) {
                    response.photo.img = "data:image/png;base64," + response.photo.img;
                    dispatch(SetUser(response));
                }
            });
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

function SetUser(payload) {
    return {
        type: SET_USER,
        payload: payload
    };
}
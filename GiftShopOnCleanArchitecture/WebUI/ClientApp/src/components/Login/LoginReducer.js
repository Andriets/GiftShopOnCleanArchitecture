import initialState from '../../store/initialState';
import { SET_LOGIN_SUCCESS, SET_LOGIN_FAIL } from './LoginAction';

export const reducer = (state = initialState.login, action) => {
    switch(action.type) {
        case SET_LOGIN_SUCCESS:
            return {
                ...state,
                isLoginSuccess: action.payload
            };
        case SET_LOGIN_FAIL:
            return {
                ...state,
                isLoginSuccess: false,
                loginError: action.payload
            };
        default:
            return state;
    }
} 
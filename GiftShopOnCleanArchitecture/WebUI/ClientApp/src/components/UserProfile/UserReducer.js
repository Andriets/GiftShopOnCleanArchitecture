import initialState from '../../store/initialState';
import { SET_USER, SET_USER_SIGN_OUT } from './UserAction';

export const reducer = (state = initialState.user, action) => {
    switch(action.type) {
        case SET_USER:
            return action.payload;
        case SET_USER_SIGN_OUT:
            return action.payload;
        default:
            return state;
    }
} 
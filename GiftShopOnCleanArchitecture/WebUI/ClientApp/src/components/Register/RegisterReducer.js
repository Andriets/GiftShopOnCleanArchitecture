import initialState from '../../store/initialState';
import { SET_REGISTER_SUCCESS, SET_REGISTER_FAIL } from './RegisterAction';

export const reducer = (state = initialState.register, action) => {
    switch(action.type) {
        case SET_REGISTER_SUCCESS: 
        return {
            ...state,
            isRegisterSuccess: action.payload
        };
    case SET_REGISTER_FAIL:
        return {
            ...state,
            isRegisterSuccess: false,
            registerError: action.payload
        };
    default:
        return state;
    }
} 
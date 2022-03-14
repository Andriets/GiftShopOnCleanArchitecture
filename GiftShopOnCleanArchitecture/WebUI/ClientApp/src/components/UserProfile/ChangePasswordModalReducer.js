import initialState from '../../store/initialState';
import { SET_MODAL_SHOW, SET_CHANGE_PASSWORD_ERROR } from './UserAction';

export const reducer = (state = initialState.changePasswordModal, action) => {
    switch(action.type) {
        case SET_MODAL_SHOW:
            return {
                ...state,
                isOpen: action.payload,
                changingPasError: null
            };
        case SET_CHANGE_PASSWORD_ERROR: 
            return {
                ...state,
                isChangingPasSuccess: false,
                changingPasError: action.payload
            }
        default:
            return state;
    }
}

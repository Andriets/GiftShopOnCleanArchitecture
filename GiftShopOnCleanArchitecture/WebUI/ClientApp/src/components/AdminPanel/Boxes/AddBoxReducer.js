import initialState from '../../../store/initialState';
import { ADD_BOX_SUCCESS, ADD_BOX_FAIL, SET_MODAL_OPEN, SET_BOX_IMAGE } from './BoxAction';

export const reducer = (state = initialState.addBox, action) => {
    switch(action.type) {
        case ADD_BOX_SUCCESS:
            return {
                ...state,
                imagefile: {},
                isOpen: false,
                isAddingPending: false,
                isAddingSuccess: action.payload
            };
        case ADD_BOX_FAIL:
            return {
                ...state,
                isAddingPending: false,
                isAddingSuccess: false,
                addBoxError: action.payload
            };
        case SET_MODAL_OPEN: 
            return {
                ...state,
                isOpen: action.payload
            };
        case SET_BOX_IMAGE: {
            return {
                ...state,
                imagefile: action.payload
            }
        }
        default:
            return state;
    }
} 
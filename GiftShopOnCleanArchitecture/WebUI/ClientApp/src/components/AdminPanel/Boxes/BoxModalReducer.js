import initialState from '../../../store/initialState';
import { SET_MODAL_OPEN, SET_BOX_IMAGE, SET_EDIT_MODE } from './BoxAction';

export const reducer = (state = initialState.boxModal, action) => {
    switch(action.type) {
        case SET_MODAL_OPEN: 
            return {
                ...state,
                editMode: false,
                initialValues: {},
                isOpen: action.payload
            };
        case SET_BOX_IMAGE: {
            return {
                ...state,
                imagefile: action.payload
            }
        };
        case SET_EDIT_MODE: {
            return {
                ...state,
                isOpen: true,
                editMode: true,
                initialValues: action.payload
            }
        }
        default:
            return state;
    }
} 
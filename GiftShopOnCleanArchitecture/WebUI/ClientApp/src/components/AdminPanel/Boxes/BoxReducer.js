import initialState from '../../../store/initialState';
import { SET_BOXES, SET_BOXES_PENDING } from './BoxAction';

export const reducer = (state = initialState.boxes, action) => {
    switch(action.type) {
        case SET_BOXES:
            return {
                isPending: false,
                list: action.payload
            };
        case SET_BOXES_PENDING:
            return {
                list: [],
                isPending: action.payload
            };
        default:
            return state;
    }
} 
import initialState from '../../../store/initialState';
import { SET_BOX, SET_BOX_PENDING } from './BoxAction';

export const reducer = (state = initialState.box, action) => {
    switch(action.type) {
        case SET_BOX:
            return {
                isPending: false,
                box: action.payload
            };
        case SET_BOX_PENDING:
            return {
                box: {},
                isPending: action.payload
            };
        default:
            return state;
    }
} 
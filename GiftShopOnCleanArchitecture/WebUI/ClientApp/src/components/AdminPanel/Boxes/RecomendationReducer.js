import initialState from '../../../store/initialState';
import { SET_RECOMENDATION, SET_RECOMENDATION_PENDING } from './BoxAction';

export const reducer = (state = initialState.recomendation, action) => {
    switch(action.type) {
        case SET_RECOMENDATION:
            return {
                isPending: false,
                list: action.payload
            };
        case SET_RECOMENDATION_PENDING:
            return {
                list: [],
                isPending: action.payload
            };
        default:
            return state;
    }
} 
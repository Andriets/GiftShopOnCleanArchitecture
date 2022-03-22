import initialState from '../../../store/initialState';
import { SET_TAGS, SET_TAGS_PENDING } from './TagAction';

export const reducer = (state = initialState.tags, action) => {
    switch(action.type) {
        case SET_TAGS:
            return {
                isPending: false,
                list: action.payload
            };
        case SET_TAGS_PENDING:
            return {
                list: [],
                isPending: action.payload
            };
        default:
            return state;
    }
} 
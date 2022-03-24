import initialState from '../../../store/initialState';
import { ADD_TAG_SUCCESS, ADD_TAG_FAIL } from './TagAction';

export const reducer = (state = initialState.addTag, action) => {
    switch(action.type) {
        case ADD_TAG_SUCCESS:
            return {
                ...state,
                isAddingPending: false,
                isAddingSuccess: action.payload
            };
        case ADD_TAG_FAIL:
            return {
                isAddingPending: false,
                isAddingSuccess: false,
                addTagError: action.payload
            };
        default:
            return state;
    }
} 
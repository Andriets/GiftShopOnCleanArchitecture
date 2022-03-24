import initialState from '../../../store/initialState';
import { EDIT_TAG_SUCCESS, EDIT_TAG_FAIL } from './TagAction';

export const reducer = (state = initialState.editTag, action) => {
    switch(action.type) {
        case EDIT_TAG_SUCCESS:
            return {
                ...state,
                isEditingPending: false,
                isEditingSuccess: action.payload
            };
        case EDIT_TAG_FAIL:
            return {
                isEditingPending: false,
                isEditingSuccess: false,
                editTagError: action.payload
            };
        default:
            return state;
    }
} 
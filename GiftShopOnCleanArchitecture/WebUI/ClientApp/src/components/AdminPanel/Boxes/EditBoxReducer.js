import initialState from '../../../store/initialState';
import { EDIT_BOX_SUCCESS, EDIT_BOX_FAIL } from './BoxAction';

export const reducer = (state = initialState.editBox, action) => {
    switch(action.type) {
        case EDIT_BOX_SUCCESS:
            return {
                ...state,
                isEditingPending: false,
                isEditingSuccess: action.payload
            };
        case EDIT_BOX_FAIL:
            return {
                isEditingPending: false,
                isEditingSuccess: false,
                editBoxError: action.payload
            };
        default:
            return state;
    }
} 
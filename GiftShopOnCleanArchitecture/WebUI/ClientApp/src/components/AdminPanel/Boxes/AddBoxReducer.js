import initialState from '../../../store/initialState';
import { ADD_BOX_SUCCESS, ADD_BOX_FAIL } from './BoxAction';

export const reducer = (state = initialState.addBox, action) => {
    switch(action.type) {
        case ADD_BOX_SUCCESS:
            return {
                ...state,
                isAddingPending: false,
                isAddingSuccess: action.payload
            };
        case ADD_BOX_FAIL:
            return {
                isAddingPending: false,
                isAddingSuccess: false,
                addBoxError: action.payload
            };
        default:
            return state;
    }
} 
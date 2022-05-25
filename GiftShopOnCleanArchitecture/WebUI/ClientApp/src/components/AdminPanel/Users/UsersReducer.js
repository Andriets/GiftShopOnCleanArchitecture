import initialState from '../../../store/initialState';
import { SET_USERS } from '../../UserProfile/UserAction';

export const reducer = (state = initialState.users, action) => {
    switch(action.type) {
        case SET_USERS:
            return {
                isPending: false,
                list: action.payload
            };
        default:
            return state;
    }
} 
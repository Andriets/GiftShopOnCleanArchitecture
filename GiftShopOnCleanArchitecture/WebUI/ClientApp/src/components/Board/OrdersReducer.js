import initialState from '../../store/initialState';
import { SET_ORDERS_PENDING, SET_ORDERS } from '../Cart/OrderAction';

export const reducer = (state = initialState.orders, action) => {
    switch(action.type) {
        case SET_ORDERS_PENDING:
            return {
                ...state,
                isPending: action.payload
            };
        case SET_ORDERS:
            return {
                isPending: false,
                list: action.payload
            };
        default:
            return state;
    }
} 
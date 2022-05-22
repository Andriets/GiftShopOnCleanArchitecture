import initialState from '../../store/initialState'
import { CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL } from './OrderAction';

export const reducer = (state = initialState.createOrder, action) => {
    switch(action.type) {
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                isOrderPending: false,
                isOrderSuccess: action.payload
            };
        case CREATE_ORDER_FAIL:
            return {
                isOrderPending: false,
                isOrderSuccess: false,
                orderError: action.payload
            };
        default:
            return state;
    }
} 
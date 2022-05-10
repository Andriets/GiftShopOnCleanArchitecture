import initialState from '../../store/initialState'
import { SET_CART, SET_CART_PENDING } from './CartAction';

export const reducer = (state = initialState.cart, action) => {
    switch(action.type) {
        case SET_CART:
            return {
                isPending: false,
                list: action.payload
            };
        case SET_CART_PENDING:
            return {
                list: [],
                isPending: action.payload
            };
        default:
            return state;
    }
} 
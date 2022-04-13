import CartService from '../../services/CartService';

export const SET_CART = "SET_CART";
export const SET_CART_PENDING = "SET_CART_PENDING";

export const ADD_BOX_TO_CART_SUCCESS = "ADD_BOX_TO_CART_SUCCESS";
export const ADD_BOX_TO_CART_FAIL = "ADD_BOX_TO_CART_FAIL";

export const DELETE_BOX_FROM_CART_SUCCESS = "DELETE_BOX_FROM_CART_SUCCESS";
export const DELETE_BOX_FROM_CART_FAIL = "DELETE_BOX_FROM_CART_FAIL";

const api_serv = new CartService();

export function GetUserCart(userId) {
    return dispatch => {
        api_serv.GetUserCart(userId).then(res => {
            if (!res.error) {
                dispatch(setCart(res));
            }
        });
    }
}

export function AddBoxToCart(userId, boxId, newCart) {
    return dispatch => {
        api_serv.AddBoxToCart(userId, boxId).then(res => {
            if (!res.error) {
                dispatch(setCart(newCart));
            }
        })
    }
}

export function DeleteBoxFromCart(userId, boxId, newCart) {
    return dispatch => {
        api_serv.DeleteBoxesFromCart(userId, boxId).then(res => {
            if (!res.error) {
                dispatch(setCart(newCart));
            }
        })
    }
}

function setCart(payload) {
    return {
        type: SET_CART,
        payload: payload
    };
}



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

export function DeleteBoxFromCart(userId, boxId) {
    return dispatch => {
        api_serv.DeleteBoxesFromCart(userId, boxId).then(res => {
            if (!res.error) {
                dispatch(GetUserCart(userId));
            }
        })
    }
}

export function UpdateQuantity(cartItemInfo) {
    return dispatch => {
        api_serv.UpdateQuantity(cartItemInfo).then(res => {
            if (!res.error) {
                dispatch(GetUserCart(cartItemInfo.userId));
            }
        })
    }
}

export function GetCartsByBoxesIds(boxesIds) {
    return dispatch => {
        api_serv.GetCartsByBoxesIds(boxesIds.map(b => b.id)).then(res => {
            if (!res.error) {
                const newCartList = res.map(box => {
                    box.quantity = boxesIds.find(b => b.id === box.id).quantity;
                    return box;
                });
                dispatch(setCart(newCartList));
            }
        });
    }
}

export function SetCartList(cartList) {
    return dispatch => {
        dispatch(setCart(cartList));
    }
}

function setCart(payload) {
    return {
        type: SET_CART,
        payload: payload
    };
}



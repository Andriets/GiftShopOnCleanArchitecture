import OrderService from '../../services/OrderService';
import { SetCartList } from './CartAction';

export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAIL = "CREATE_ORDER_FAIL";

export const SET_ORDERS_PENDING = "SET_ORDERS_PENDING";
export const SET_ORDERS = "SET_ORDERS";

const api_serv = new OrderService();

export function CreateOrder(order) {
    return dispatch => {
        api_serv.CreateOrder(order).then(res => {
            if (!res.error) {
                dispatch(createOrderSuccess(true));
                dispatch(SetCartList([]));
                localStorage.removeItem('Cart');
                alert("Order registered successfully")
                return;
            }

            dispatch(createOrderFail(res.error))
        });
    }
}

export function GetAllOrders() {
    return dispatch => {
        api_serv.GetAllOrders().then(res => {
            if (!res.error) {
                dispatch(setOrders(res));
            }
        });
    }
}

export function UpdateOrderStatus(orderStatusInfo) {
    return dispatch => {
        api_serv.UpdateOrderStatus(orderStatusInfo).then(res => {
            if (!res.error) {
                dispatch(GetAllOrders());
            }
        });
    }
}

function createOrderSuccess(payload) {
    return {
        type: CREATE_ORDER_SUCCESS,
        payload: payload
    };
}

function createOrderFail(payload) {
    return {
        type: CREATE_ORDER_FAIL,
        payload: payload
    };
}

function setOrders(payload) {
    return {
        type: SET_ORDERS,
        payload: payload
    }
}


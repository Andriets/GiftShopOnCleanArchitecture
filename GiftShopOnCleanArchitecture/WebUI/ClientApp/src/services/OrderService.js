import BaseService from "./BaseService";

const baseService = new BaseService();

export default class OrderService {
    CreateOrder = async (order) => {
        const res = await baseService.postQuery('Order/CreateOrder', order);
        return !res.ok 
            ? { error: await res.text() }
            : await res.json();
    }

    GetAllOrders = async () => {
        const res = await baseService.getQuery('Order/GetAllOrders');
        return res;
    }

    UpdateOrderStatus = async (orderStatusInfo) => {
        const res = await baseService.postQuery('Order/UpdateOrderStatus', orderStatusInfo);
        return !res.ok 
            ? { error: await res.text() }
            : await res.json();
    }
}
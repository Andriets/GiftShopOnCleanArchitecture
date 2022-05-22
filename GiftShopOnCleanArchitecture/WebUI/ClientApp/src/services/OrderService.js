import BaseService from "./BaseService";

const baseService = new BaseService();

export default class OrderService {
    CreateOrder = async (order) => {
        const res = await baseService.postQuery('Order/CreateOrder', order);
        return !res.ok 
            ? { error: await res.text() }
            : await res.json();
    }
}
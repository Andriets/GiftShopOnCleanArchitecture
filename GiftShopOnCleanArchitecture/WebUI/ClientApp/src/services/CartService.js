import BaseService from "./BaseService";

const baseService = new BaseService();

export default class CartService {

    GetUserCart = async (userId) => {
        return await baseService.getQuery(`Cart/GetUserCart?userId=${userId}`);
    }

    AddBoxToCart = async (userId, boxId) => {
        const res = await baseService.postQuery('Cart/AddBoxToCart', {userId: userId, boxId: boxId});
        return !res.ok
            ? { error: await res.text() }
            : await res.json();
    }

    DeleteBoxesFromCart = async (userId, boxId) => {
        const res = await baseService.postQuery('Cart/DeleteBoxFromCart', {userId: userId, boxId: boxId});
        return !res.ok
            ? { error: await res.text() }
            : await res.json();
    }
}
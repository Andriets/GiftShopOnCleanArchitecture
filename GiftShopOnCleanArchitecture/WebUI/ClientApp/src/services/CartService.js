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

    UpdateQuantity = async (cartItemInfo) => {
        const res = await baseService.postQuery('Cart/UpdateQuantity', cartItemInfo);
        return !res.ok
            ? { error: await res.text() }
            : await res.json();
    }

    GetCartsByBoxesIds = async (boxesIds) => {
        let file = new FormData();
        boxesIds.forEach((id, key) => {
            file.append(`BoxesIds[${key}]`, id);
        });

        const res = await baseService.postQueryWithData('Cart/GetCartsByBoxesIds', file);
        return !res.ok
            ? { error: await res.text() }
            : await res.json();
    }
}
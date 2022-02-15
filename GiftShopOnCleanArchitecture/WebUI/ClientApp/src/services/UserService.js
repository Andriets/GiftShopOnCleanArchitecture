import BaseService from "./BaseService";

const baseService = new BaseService();

export default class AuthenticationService {

    Register = async (data) => {
        const res = await baseService.postQuery('User/CreateUser', data);
        return !res.ok 
            ? { error: await res.text() }
            : await res.json();
    }

    SignIn = async (data) => {
        const res = await baseService.postQuery('User/SignIn', data);
        return !res.ok
            ? { error: await res.text() }
            : await res.json();
    }

    GetUserById = async (id) => {
        const res = await baseService.getQuery(`Account/GetUserById/?id=${id}`);
        return res;
    }

    
}
import BaseService from "./BaseService";

const baseService = new BaseService();

export default class AuthenticationService {

    Register = async (registerData) => {
        const res = await baseService.postQuery('User/CreateUser', registerData);
        return !res.ok 
            ? { error: await res.text() }
            : await res.json();
    }

    SignIn = async (loginData) => {
        const res = await baseService.postQuery('User/SignIn', loginData);
        return !res.ok
            ? { error: await res.text() }
            : await res.json();
    }

    GetUserById = async (id) => {
        const res = await baseService.getQuery(`User/GetUserById?userid=${id}`);
        return res;
    }

    UpdateUserPhoto = async (userData) => {
        let file = new FormData();
        file.append('UserId', userData.id);
        file.append('Photo', userData.photo);
        const res = await baseService.postQueryWithData('User/UpdateUserPhoto', file);
        return !res.ok
            ? { error: await res.text() }
            : await res.json();
    }

    UpdateUserInfo = async (userInfo) => {
        const res = await baseService.postQuery('User/UpdateUserInfo', userInfo);
        return !res.ok
            ? { error: await res.text() }
            : await res.json(); 
    }

    ChangePassword = async (changePasswordData) => {
        const res = await baseService.postQuery('User/ChangePassword', changePasswordData);
        return !res.ok
            ? { error: await res.text() }
            : res;
    }
}
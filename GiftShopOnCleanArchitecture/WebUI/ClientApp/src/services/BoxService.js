import BaseService from "./BaseService";

const baseService = new BaseService();

export default class BoxService {

    GetAllBoxes = async (filterData) => {
        const res = await baseService.getQuery(`Box/GetAllBoxes?page=${filterData.page}&PageSize=${filterData.pageSize}&KeyWord=${filterData.keyWord}`);
        return res;
    }

    CreateBox = async (boxData) => {
        let file = new FormData();
        file.append('Title', boxData.title);
        file.append('Description', boxData.description);
        file.append('Price', boxData.price);
        file.append('Photo', boxData.image.file);
        boxData.tags.forEach((tag, key) => {
            file.append(`Tags[${key}].Id`, tag.id);
        });

        const res = await baseService.postQueryWithData('Box/CreateBox', file);
        return !res.ok
            ? { error: await res.text() }
            : res;
    }

    EditBox = async (boxData) => {
        let file = new FormData();
        file.append('Id', boxData.id);
        file.append('Title', boxData.title);
        file.append('Description', boxData.description);
        file.append('Price', boxData.price);
        file.append('Photo', boxData.image.file);
        boxData.tags.forEach((tag, key) => {
            file.append(`Tags[${key}].Id`, tag.id);
        });

        const res = await baseService.postQueryWithData('Box/UpdateBox', file);
        return !res.ok
            ? { error: await res.text() }
            : res;
    }
}
import BaseService from "./BaseService";

const baseService = new BaseService();

export default class TagService {

    GetAllTags = async (keyWord) => {
        const res = await baseService.getQuery(`Tag/GetAllTags?KeyWord=${keyWord}`);
        return res;
    }
}
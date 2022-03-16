import BaseService from "./BaseService";

const baseService = new BaseService();

export default class BoxService {

    GetAllBoxes = async (filterData) => {
        const res = await baseService.getQuery(`Box/GetAllBoxes?page=${filterData.page}&PageSize=${filterData.pageSize}&KeyWord=${filterData.keyWord}`);
        return res;
    }
}
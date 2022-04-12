import BaseService from "./BaseService";

const baseService = new BaseService();

export default class BoxService {

    GetBasicFiltersInfo = async () => {
        const res = await baseService.getQuery('Box/GetBasicFiltersInfo');
        return res;
    }

    GetAllBoxes = async (filterData) => {
        let file = new FormData();
        file.append('Page', filterData.page);
        file.append('PageSize', filterData.pageSize);
        file.append('KeyWord', filterData.keyWord);
        if (filterData.minPrice) {
            file.append('MinPrice', filterData.minPrice);
            file.append('MaxPrice', filterData.maxPrice);
        }
        filterData.tags?.forEach((tag, key) => {
            file.append(`Tags[${key}].Id`, tag.tag.id);
        });

        const res = await baseService.postQueryWithData('Box/GetAllBoxes', file);
        return !res.ok
            ? { error: await res.text() }
            : await res.json();
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
        file.append('Photo', boxData?.image?.file);
        boxData.tags.forEach((tag, key) => {
            file.append(`Tags[${key}].Id`, tag.id);
        });

        const res = await baseService.postQueryWithData('Box/UpdateBox', file);
        return !res.ok
            ? { error: await res.text() }
            : res;
    }

    DeleteBoxById = async (id) => {
        const res = await baseService.postQuery('Box/DeleteBoxById', {boxId: id});
        return !res.ok
            ? { error: await res.text() }
            : await res.json();
    }
}
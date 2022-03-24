import BaseService from "./BaseService";

const baseService = new BaseService();

export default class TagService {

    GetAllTags = async (keyWord) => {
        const res = await baseService.getQuery(`Tag/GetAllTags?KeyWord=${keyWord}`);
        return res;
    }

    CreateTag = async (tagName) => {
        const res = await baseService.postQuery('Tag/CreateTag', { tagName: tagName });
        return !res.ok 
            ? { error: await res.text() }
            : await res.json();
    }

    UpdateTag = async (tag) => {
        const res = await baseService.postQuery('Tag/UpdateTag', tag);
        return !res.ok 
            ? { error: await res.text() }
            : await res.json();
    }

    DeleteTagById = async (id) => {
        const res = await baseService.postQuery('Tag/DeleteTagById', { tagId: id });
        return !res.ok 
            ? { error: await res.text() }
            : await res.json();
    }
}
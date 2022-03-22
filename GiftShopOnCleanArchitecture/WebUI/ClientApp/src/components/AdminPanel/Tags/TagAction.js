import TagService from "../../../services/TagService";

export const SET_TAGS = "SET_TAGS";
export const SET_TAGS_PENDING = "SET_TAGS_PENDING";

const api_serv = new TagService();

export function GetAllTags(keyWord) {
    return dispatch => {
        api_serv.GetAllTags(keyWord).then(res => {
            if (!res.error) {
                dispatch(setTags(res));
            }
        });
    }
}

function setTags(payload) {
    return {
        type: SET_TAGS,
        payload: payload
    }
}
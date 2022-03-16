import BoxService from "../../../services/BoxService";

export const SET_BOXES = "SET_BOXES";
export const SET_BOXES_PENDING = "SET_BOXES_PENDING";

const api_serv = new BoxService();

export function GetAllBoxes(filterData) {
    return dispatch => {
        api_serv.GetAllBoxes(filterData).then(res => {
            if (!res.error) {
                dispatch(setBoxes(res));
            }
        });
    }
}

function setBoxes(payload) {
    return {
        type: SET_BOXES,
        payload: payload
    }
}
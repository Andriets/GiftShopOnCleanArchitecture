import BoxService from "../../../services/BoxService";
import {reset} from 'redux-form';

export const SET_BOXES = "SET_BOXES";
export const SET_BOXES_PENDING = "SET_BOXES_PENDING";
export const SET_PAGES_INFO = "SET_PAGES_INFO";

export const SET_BOX = "SET_BOX";
export const SET_BOX_PENDING = "SET_BOX_PENDING";

export const SET_RECOMENDATION = "SET_RECOMENDATION";
export const SET_RECOMENDATION_PENDING = "SET_RECOMENDATION_PENDING";

export const SET_MODAL_OPEN = "SET_MODAL_OPEN";
export const SET_BOX_IMAGE = "SET_BOX_IMAGE";
export const SET_EDIT_MODE = "SET_EDIT_MODE";

export const ADD_BOX_SUCCESS = "ADD_BOX_SUCCESS";
export const ADD_BOX_FAIL = "ADD_BOX_FAIL";

export const EDIT_BOX_SUCCESS = "EDIT_BOX_SUCCESS";
export const EDIT_BOX_FAIL = "EDIT_BOX_FAIL";

export const SET_FILTERS = "SET_FILTERS";


const api_serv = new BoxService();

export function GetBasicFiltersInfo() {
    return dispatch => {
        api_serv.GetBasicFiltersInfo().then(res => {
            dispatch(setFilters(res));
        });
    }
}

export function GetAllBoxes(filterData) {
    return dispatch => {
        api_serv.GetAllBoxes(filterData).then(res => {
            if (!res.error) {
                dispatch(setBoxes(res.items));
                dispatch(setPagesInfo({
                    currentPage: res.currentPage,
                    totalPages: res.totalPages
                }));
            }
        });
    }
}

export function GetRecomendationForUser(userId) {
    return dispatch => {
        api_serv.GetRecomendationForUser(userId).then(res => {
            if (!res.error) {
                dispatch(setRecomendation(res));
            }
        });
    }
}

export function GetBoxById(id) {
    return dispatch => {
        api_serv.GetBoxById(id).then(res => {
            if (!res.error) {
                dispatch(setBox(res));
            }
        })
    }
}

export function CreateBox(boxData) {
    return dispatch => {
        api_serv.CreateBox(boxData).then(res => {
            if (!res.error) {
                dispatch(addBoxSuccess(true));
                dispatch(setModalOpen(false));
                dispatch(reset('box-form'));
                dispatch(GetAllBoxes({page: 1, pageSize: 0, keyWord: ""}));
            } else {
                dispatch(addBoxFail(res.error));
            }
        });
    }
}

export function EditBox(boxData) {
    return dispatch => {
        api_serv.EditBox(boxData).then(res => {
            if (!res.error) {
                dispatch(editBoxSuccess(true));
                dispatch(setModalOpen(false));
                dispatch(reset('box-form'));
                dispatch(GetAllBoxes({page: 1, pageSize: 0, keyWord: ""}));
            } else {
                dispatch(editBoxFail(res.error));
            }
        });
    }
}

export function DeleteBoxById(boxId, boxes) {
    return dispatch => {
        api_serv.DeleteBoxById(boxId).then(res => {
            if (!res.error) {
                dispatch(setBoxes(boxes));
            }
        });
    }
}

export function SetBoxAttitudeFromCatalog(userBoxAttitude, boxes) {
    return dispatch => {
        api_serv.SetBoxAttitude(userBoxAttitude).then(res => {
            if (!res.error) {
                dispatch(setBoxes(boxes));
            }
        })
    }
}

export function SetBoxAttitudeFromProduct(userBoxAttitude, box) {
    return dispatch => {
        api_serv.SetBoxAttitude(userBoxAttitude).then(res => {
            if (!res.error) {
                dispatch(GetBoxById(box.id));
                // dispatch(setBox(box));
            }
        })
    }
}

export function SetModalOpen(open) {
    return dispatch => {
        dispatch(setModalOpen(open))
        if (!open) {
            dispatch(reset('box-form'));
        }
    }
}

export function SetBoxImage(imagefile) {
    return dispatch => {
        dispatch(setBoxImage(imagefile));
    }
}

export function SetEditMode(boxInfo) {
    return dispatch => {
        dispatch(setEditMode(boxInfo))
    }
}

function setFilters(payload) {
    return {
        type: SET_FILTERS,
        payload: payload
    }
}

function setEditMode(payload) {
    return {
        type: SET_EDIT_MODE,
        payload: payload
    }
}

function setBoxImage(payload) {
    return {
        type: SET_BOX_IMAGE,
        payload: payload
    }
}

function setBoxes(payload) {
    return {
        type: SET_BOXES,
        payload: payload
    }
}

function setBox(payload) {
    return {
        type: SET_BOX,
        payload: payload
    }
}

function setRecomendation(payload) {
    return {
        type: SET_RECOMENDATION,
        payload: payload
    }
}

function setPagesInfo(payload) {
    return {
        type: SET_PAGES_INFO,
        payload: payload
    }
}

function addBoxSuccess(payload) {
    return {
        type: ADD_BOX_SUCCESS,
        payload: payload
    }
}

function editBoxSuccess(payload) {
    return {
        type: EDIT_BOX_SUCCESS,
        payload: payload
    }
}

function addBoxFail(payload) {
    return {
        type: ADD_BOX_FAIL,
        payload: payload
    }
}

function editBoxFail(payload) {
    return {
        type: EDIT_BOX_FAIL,
        payload: payload
    }
}

function setModalOpen(payload) {
    return {
        type: SET_MODAL_OPEN,
        payload: payload
    }
}
import BoxService from "../../../services/BoxService";
import {reset} from 'redux-form';

export const SET_BOXES = "SET_BOXES";
export const SET_BOXES_PENDING = "SET_BOXES_PENDING";

export const SET_MODAL_OPEN = "SET_MODAL_OPEN";
export const SET_BOX_IMAGE = "SET_BOX_IMAGE";
export const SET_EDIT_MODE = "SET_EDIT_MODE";

export const ADD_BOX_SUCCESS = "ADD_BOX_SUCCESS";
export const ADD_BOX_FAIL = "ADD_BOX_FAIL";

export const EDIT_BOX_SUCCESS = "EDIT_BOX_SUCCESS";
export const EDIT_BOX_FAIL = "EDIT_BOX_FAIL";

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

export function CreateBox(boxData) {
    return dispatch => {
        api_serv.CreateBox(boxData).then(res => {
            if (!res.error) {
                dispatch(addBoxSuccess(true));
                dispatch(setModalOpen(false));
                dispatch(reset('box-form'));
                dispatch(GetAllBoxes({page: 0, pageSize: 0, keyWord: ""}));
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
                dispatch(GetAllBoxes({page: 0, pageSize: 0, keyWord: ""}));
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
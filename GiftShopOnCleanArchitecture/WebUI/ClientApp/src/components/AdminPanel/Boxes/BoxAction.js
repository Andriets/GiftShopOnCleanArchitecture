import BoxService from "../../../services/BoxService";
import {reset} from 'redux-form';

export const SET_BOXES = "SET_BOXES";
export const SET_BOXES_PENDING = "SET_BOXES_PENDING";

export const ADD_BOX_SUCCESS = "ADD_BOX_SUCCESS";
export const ADD_BOX_FAIL = "ADD_BOX_FAIL";

export const SET_MODAL_OPEN = "SET_MODAL_OPEN"

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
                dispatch(reset('box-form'));
                dispatch(GetAllBoxes({page: 0, pageSize: 0, keyWord: ""}));
            } else {
                dispatch(addBoxFail(res.error));
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

function addBoxFail(payload) {
    return {
        type: ADD_BOX_FAIL,
        payload: payload
    }
}

function setModalOpen(payload) {
    return {
        type: SET_MODAL_OPEN,
        payload: payload
    }
}
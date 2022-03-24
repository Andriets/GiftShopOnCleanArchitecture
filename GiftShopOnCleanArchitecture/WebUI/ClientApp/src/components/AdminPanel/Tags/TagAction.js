import TagService from "../../../services/TagService";
import {reset} from 'redux-form';

export const SET_TAGS = "SET_TAGS";
export const SET_TAGS_PENDING = "SET_TAGS_PENDING";

export const ADD_TAG_SUCCESS = "ADD_TAG_SUCCESS";
export const ADD_TAG_FAIL = "ADD_TAG_FAIL";

export const EDIT_TAG_SUCCESS = "EDIT_TAG_SUCCESS";
export const EDIT_TAG_FAIL = "EDIT_TAG_FAIL";


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

export function CreateTag(tagName) {
    return dispatch => {
        api_serv.CreateTag(tagName).then(res => {
            if (!res.error) {
                dispatch(addTagSuccess(true));
                dispatch(GetAllTags(""));
            } else {
                dispatch(addTagFail(res.error));
            }
        });
    }
}

export function EditTag(tag) {
    return dispatch => {
        api_serv.UpdateTag(tag).then(res => {
            if (!res.error) {
                dispatch(editTagSuccess(true));
                dispatch(reset("tag-form"));
                dispatch(GetAllTags(""));
            } else {
                dispatch(editTagFail(res.error));
            }
        });
    }
}

export function DeleteTagById(tagId, tags) {
    return dispatch => {
        api_serv.DeleteTagById(tagId).then(res => {
            if (!res.error) {
                dispatch(setTags(tags));
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

function addTagSuccess(payload) {
    return {
        type: ADD_TAG_SUCCESS,
        payload: payload
    }
}

function editTagSuccess(payload) {
    return {
        type: EDIT_TAG_SUCCESS,
        payload: payload
    }
}

function addTagFail(payload) {
    return {
        type: ADD_TAG_FAIL,
        payload: payload
    }
}

function editTagFail(payload) {
    return {
        type: EDIT_TAG_FAIL,
        payload: payload
    }
}
import initialState from "../../store/initialState";
import { SET_FILTERS, SET_PAGES_INFO } from "../AdminPanel/Boxes/BoxAction";

export const reducer = (state = initialState.catalogFiltersInfo, action) => {
    switch(action.type) {
        case SET_FILTERS:
            return action.payload;
        case SET_PAGES_INFO: 
            return {
                ...state,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages
            }
        default:
            return state;
    }
} 
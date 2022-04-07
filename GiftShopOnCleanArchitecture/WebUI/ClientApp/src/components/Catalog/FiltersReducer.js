import initialState from "../../store/initialState";
import { SET_FILTERS } from "../AdminPanel/Boxes/BoxAction";

export const reducer = (state = initialState.catalogFiltersInfo, action) => {
    switch(action.type) {
        case SET_FILTERS:
            return action.payload;
        default:
            return state;
    }
} 
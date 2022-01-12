import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"


export default function activeCategoryReducers(state=initialState.categoryData,action){
    switch (action.type) {
        case actionTypes.ACTIVECATEGORY:
        return state =action.payload
        default:
            return state;
            
    }
}

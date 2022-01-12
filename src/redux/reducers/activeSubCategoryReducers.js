import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"


export default function activeSubCategoryReducers(state=initialState.activesubcategoryData,action){
    switch (action.type) {
        case actionTypes.ACTIVESUBCATEGORY:
        return state =action.payload
        default:
            return state;
            
    }
}

import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"


export default function subCategoryReducers(state=initialState.categoryData,action){
    switch (action.type) {
        case actionTypes.GETSUBCATEGORYSUCCESS:
        return state =action.payload
        default:
            return state;
            
    }
}
import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"


export default function categoryReducers(state=initialState.categoryData,action){
    switch (action.type) {
        case actionTypes.GETCATEGORYSUCCESS:
        return state =action.payload
        default:
            return state;
            
    }
}
import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"


export default function productReducers(state=initialState.productData,action){
    switch (action.type) {
        case actionTypes.GETPRODUCTSUCCESS:
        return state =action.payload
        default:
            return state;
            
    }
}

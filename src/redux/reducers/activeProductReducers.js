import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"


export default function activeProductReducers(state=initialState.productData,action){
    switch (action.type) {
        case actionTypes.ACTIVEPRODUCT:
        return state =action.payload
        default:
            return state;
            
    }
}

import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"


export default function activeMatchMessageReducers(state=initialState.matchMessageData,action){
    switch (action.type) {
        case actionTypes.ACTIVEMATCH:
        return state =action.payload
        default:
            return state;
            
    }
}

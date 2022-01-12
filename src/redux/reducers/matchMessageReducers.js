import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"


export default function matchMessageReducers(state=initialState.matchMessageData,action){
    switch (action.type) {
        case actionTypes.GETMATCHSUCCESS:
        return state =action.payload
        default:
            return state;
            
    }
}

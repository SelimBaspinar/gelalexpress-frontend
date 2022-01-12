import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"


export default function activeMessageReducers(state=initialState.messageData,action){
    switch (action.type) {
        case actionTypes.ACTIVEMESSAGE:
        return state =action.payload
        default:
            return state;
            
    }
}

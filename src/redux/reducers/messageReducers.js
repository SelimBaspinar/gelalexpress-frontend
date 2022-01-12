import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"


export default function messageReducers(state=initialState.messageData,action){
    switch (action.type) {
        case actionTypes.GETMESSAGESUCCESS:
            const newArray=[...action.payload];
            state=newArray;
            return  state;
        default:
            return state;
            
    }
}


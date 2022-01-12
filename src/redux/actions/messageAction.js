import * as actionTypes from "./actionTypes"
import axios from "axios";
import qs from "qs";

export function getMessageSuccess(res) {
  return {type:actionTypes.GETMESSAGESUCCESS, payload:res}
}

export function getMessage() {
  return  function(dispatch) {
     axios.get("/api/message/") .then(response => {
      return response.data
  }).then((res ) => dispatch(getMessageSuccess(res)));
  }
}

export function getActiveMessage(user) {
  return {type:actionTypes.ACTIVEMESSAGE, payload:user}
}
  
export function deleteMessage(user) {
  return function(dispatch) {
    axios.delete(`/api/message/${user.id}/`).then((res) => dispatch(getMessage()));
  }
}

export function editMessage(user) {
  return function(dispatch) {
    axios.put(`/api/message/${user.id}/`, qs.stringify(user)).then((res) => dispatch(getMessage()));        
  }
}

export function addMessage(user) {
  return function(dispatch){
    axios.post("/api/message/", qs.stringify(user)).catch((err)=>console.log(err)).then((res) => dispatch(getMessage()));
  }
}
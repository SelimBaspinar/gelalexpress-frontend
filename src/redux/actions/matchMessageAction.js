import * as actionTypes from "./actionTypes"
import axios from "axios";
import qs from "qs";

export function getMatchSuccess(res){
  return {type:actionTypes.GETMATCHSUCCESS,
    payload:res
}}

export function getMatch() {
  return async function(dispatch){
   await axios.get("/api/matchtable/").then((res) => dispatch(getMatchSuccess(res.data)));
  }}


  export function getActiveMatch(match) {
    return {type:actionTypes.ACTIVEMATCH,
        payload:match
  }}
  
  export function deleteMatch(match) {
    return function(dispatch){
      axios
      .delete(`/api/matchtable/${match.M_Id}/`)
      .then((res) => dispatch(getMatch()));
      
    }}
    export function editMatch(match) {
      return function(dispatch){
        axios
        .put(`/api/matchtable/${match.M_Id}/`, qs.stringify(match))
        .then((res) => dispatch(getMatch()));        
      }}

      export function addMatch(match) {
        return async dispatch=>{
        const {data}=await axios.post("/api/matchtable/", qs.stringify(match)).catch((err)=>console.log(err))
        dispatch(getActiveMatch(data))
        }}
       

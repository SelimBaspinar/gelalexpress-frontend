import * as actionTypes from "./actionTypes"
import axios from "axios";
import qs from "qs";


export function getCategorySuccess(res){
  return {type:actionTypes.GETCATEGORYSUCCESS,
    payload:res
}}

export function getCategory() {
  return function(dispatch){
     axios.get("/api/category/").then((res) => dispatch(getCategorySuccess(res.data)));

  }}
  export function getActiveCategory(item) {
    return {type:actionTypes.ACTIVECATEGORY,
      payload:item
  }}
  
  export function deleteCategory(itemid) {
    return function(dispatch){
      axios
      .delete(`/api/category/${itemid}/`)
      .then((res) => dispatch(getCategory()));
      
    }}
    export function editCategory(item) {
      return function(dispatch){
        axios
        .put(`/api/category/${item.id}/`, qs.stringify(item))
        .then((res) => dispatch(getCategory()));        
      }}

      export function addCategory(item) {
        return function(dispatch){
          axios
          .post("/api/category/", qs.stringify(item))
          .then((res) => dispatch(getCategory())).catch((err) => console.log(err));;        
        }}

import * as actionTypes from "./actionTypes"
import axios from "axios";
import qs from "qs";


export function getSubCategorySuccess(res){
  return {type:actionTypes.GETSUBCATEGORYSUCCESS,
    payload:res
}}

export function getSubCategory() {
  return function(dispatch){
     axios.get("/api/subcategory/").then((res) => dispatch(getSubCategorySuccess(res.data)));

  }}
  export function getActiveSubCategory(item) {
    return {type:actionTypes.ACTIVESUBCATEGORY,
      payload:item
  }}
  
  export function deleteSubCategory(itemid) {
    return function(dispatch){
      axios
      .delete(`/api/subcategory/${itemid}/`)
      .then((res) => dispatch(getSubCategory()));
      
    }}
    export function editSubCategory(item) {
      return function(dispatch){
        axios
        .put(`/api/subcategory/${item.id}/`, qs.stringify(item))
        .then((res) => dispatch(getSubCategory()));        
      }}

      export function addSubCategory(item) {
        return function(dispatch){
          axios
          .post("/api/subcategory/", qs.stringify(item))
          .then((res) => dispatch(getSubCategory())).catch((err) => console.log(err));;        
        }}

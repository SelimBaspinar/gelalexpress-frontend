import * as actionTypes from "./actionTypes"
import axios from "axios";
import qs from "qs";


export function getProductSuccess(res){
  return {type:actionTypes.GETPRODUCTSUCCESS,
    payload:res
}}

export function getProduct() {
  return function(dispatch){
     axios.get("/api/product/").then((res) => dispatch(getProductSuccess(res.data)));

  }}
  export function getActiveProduct(item) {
    return {type:actionTypes.ACTIVEPRODUCT,
      payload:item
  }}
  
  export function deleteProduct(item) {
    return function(dispatch){
      axios
      .delete(`/api/product/${item}/`)
      .then((res) => dispatch(getProduct()));
      
    }}

    
    export function editProduct(itemid) {
      return function(dispatch){
        axios
        .put(`/api/product/${itemid}/`, qs.stringify(itemid))
        .then((res) => dispatch(getProduct()));        
      }}

      export function addProduct(item) {
        return function(dispatch){
          axios
          .post("/api/product/", item,{
            headers: {
              'content-type': 'multipart/form-data'
            }
          })
          .then((res) => dispatch(getProduct())).catch((err) => console.log(err));;        
        }}

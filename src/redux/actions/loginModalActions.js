import * as actionTypes from "./actionTypes"
import axios from "axios";
import qs from "qs";

export function getLoginModal(res){
  return {type:actionTypes.GETLOGINMODAL,
    payload:res
}}



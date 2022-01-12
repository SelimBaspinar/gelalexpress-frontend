import React, { useState, useEffect ,useRef} from 'react';
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Category from './Category';
import ProductList from './ProductList';
import Login from './Login';
import Register from './Register';
import { getCategory } from '../redux/actions/categoryActions'
import { deleteCategory } from '../redux/actions/categoryActions'
import { getActiveCategory } from '../redux/actions/categoryActions'
import { editCategory } from '../redux/actions/categoryActions'
import { addCategory } from '../redux/actions/categoryActions'
import { getLoginModal } from '../redux/actions/loginModalActions'
import { getRegisterModal } from '../redux/actions/registerModalActions'
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import $ from "jquery"
import '../Css/navi.css';


function Home({ getCategory,deleteCategory,getActiveCategory,editCategory,addCategory,categoryList,getLoginModal,loginmodal,getRegisterModal,registermodal, ...props }) {
  
  const mounted = useRef();
  let history = useNavigate();

  useEffect(() => {
      if (!mounted.current) {
        mounted.current = true;
      }
  }, [])
  
  const togglelogin = () => {
    getLoginModal(!loginmodal)
  };

  const toggleregister = () => {
    getRegisterModal(!registermodal)
  };
 
  return (
    <div>
      <Category></Category>
      <ProductList></ProductList>
    </div>
  );
}
function mapStateToProps(state, ownProps) {
  return {
    categoryList: state.dataListReducers,
    activeCategory: state.activeCategoryReducers,
    loginmodal:state.loginModalReducers,
    registermodal:state.registerModalReducers

  }
}
const mapDispatchToProps = {
  getCategory, addCategory, deleteCategory,editCategory,getActiveCategory,getLoginModal,getRegisterModal
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
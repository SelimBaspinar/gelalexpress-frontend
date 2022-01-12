import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getProduct } from '../redux/actions/productActions'
import { deleteProduct } from '../redux/actions/productActions'
import { getActiveProduct } from '../redux/actions/productActions'
import { editProduct } from '../redux/actions/productActions'
import { addProduct } from '../redux/actions/productActions'
import { getCategory } from '../redux/actions/categoryActions'
import { deleteCategory } from '../redux/actions/categoryActions'
import { getActiveCategory } from '../redux/actions/categoryActions'
import { editCategory } from '../redux/actions/categoryActions'
import { addCategory } from '../redux/actions/categoryActions'
import { getSubCategory } from '../redux/actions/subCategoryActions'
import { deleteSubCategory } from '../redux/actions/subCategoryActions'
import { getActiveSubCategory } from '../redux/actions/subCategoryActions'
import { editSubCategory } from '../redux/actions/subCategoryActions'
import { addSubCategory } from '../redux/actions/subCategoryActions'
import "../Css/productlist.css"
import { Button,  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import logo from '../img/logo-icon.png'
import $ from "jquery"

function MyProduct({ getProduct, deleteProduct, getActiveProduct, editProduct, addProduct, products,activeProduct,
  getCategory, deleteCategory, getActiveCategory, editCategory, addCategory, categories,activeCategories,
  getSubCategory, deleteSubCategory, getActiveSubCategory, editSubCategory, addSubCategory, subcategories,activeSubCategories,activeUser, ...props }) {
  const [modal, setModal] = useState(false);

  const mounted = useRef();
  let history = useNavigate();

  useEffect(() => {
    if (!mounted.current) {
      getCategory();
      getSubCategory();
      getProduct();
      mounted.current = true;
    }
  }, [getCategory, getActiveCategory])

  const productdetail = async (pdt) => {
    await getActiveProduct(pdt);
    localStorage.setItem("activeproduct", JSON.stringify(pdt))
    history("/product")
  }

  const toggle = () => {
    setModal(!modal);
  };

  const removeproduct = async (pdid) => {
    await deleteProduct(pdid);
    toggle();
    getProduct();
    history("/myproduct")
  }

  function renderProduct(){
    return products.map((product) => (
        product.User == activeUser.id ? (
          <div className="col-md-4">
          <div className="wsk-cp-product">
            <div className="wsk-cp-img">
              <img src={product.img} alt="Product" className="img-responsive" />
            </div>
            <div className="wsk-cp-text">
              <div className="category-product">
                <span>{ subcategories.map((category)=>(
          category.id==product.Category ? (
            category.Name
           ) : null
          ))}</span>
              </div>
              <div className="title-product">
                <h3>{product.Name}</h3>
              </div>
              <div className="description-prod">
                <p>{product.Description}</p>
                <hr/>
              </div>
              <i className="fas fa-trash-alt img-responsive d-flex justify-content-center" id="removeicon" onClick={() => removeproduct(product.id)} style={{cursor:"pointer"}}></i>

            </div>
          </div>
        </div>
        ) : null
      )
    )
  }

  function renderProductCategory(categoryid){
    subcategories.map((category) => {
      if(category.id==categoryid){
        $(".category span").text(category.Name)
      }
    });
  }

  return (
    <div>
        <Container>
          <Row>
             {renderProduct()}
          </Row>
        </Container>
        {modal ? (
            <Modal isOpen={true} toggle={toggle} centered scrollable>
             <ModalHeader className="modal-header text-center" toggle={toggle} tag="h2">  Information</ModalHeader>
              <ModalBody>
                <h4>Product Has Been Deleted</h4>
              </ModalBody>
           </Modal>
      ) : null}
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    products: state.productReducers,
    activeProducts: state.activeProducts,
    categories:state.categoryReducers,
    activeCategories:state.activeCategoryReducers,
    subcategories:state.subCategoryReducers,
    activeSubCategories:state.activeSubCategoryReducers,
    activeUser:state.activeUserReducers,
  }
}
const mapDispatchToProps = {
  getProduct, addProduct, deleteProduct, editProduct, getActiveProduct,getCategory, deleteCategory, getActiveCategory, editCategory, addCategory,
  getSubCategory, deleteSubCategory, getActiveCategory, editSubCategory, addSubCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProduct) 
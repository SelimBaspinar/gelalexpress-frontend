import React, {  useEffect, useRef } from 'react';
import useState from 'react-usestateref'

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

import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import logo from '../img/logo-icon.png'
import $ from "jquery"

function ProductList({ getProduct, deleteProduct, getActiveProduct, editProduct, addProduct, products,activeProduct,
  getCategory, deleteCategory, getActiveCategory, editCategory, addCategory, categories,activeCategories,
  getSubCategory, deleteSubCategory, getActiveSubCategory, editSubCategory, addSubCategory, subcategories,activesubcategories, ...props }) {
  const [page, setPage,pageref] = useState(1);
  const [activecategory, setActivecategory,activecategoryref] = useState(activesubcategories);
  const [filterproduct, setFilterProduct,filterproductref] = useState([]);

  const mounted = useRef();
  let history = useNavigate();

  useEffect(() => {
        getCategory();
        getSubCategory();
        getProduct();
    
  }, [page,pageref])

  const productdetail = async (pdt)=>{
    await getActiveProduct(pdt);
    localStorage.setItem("activeproduct", JSON.stringify(pdt))
    history("/product")
  }

  function RenderProduct() {
    return Object.keys(activesubcategories).length !== 0? 
      filterproductref.current.map((product,i) => (
        i<(pageref.current)*9 &&i>=(pageref.current*9)-9 ?
        <div className="productcard col-md-4" onClick={()=>productdetail(product)}>
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
            </div>
          </div>
        </div>
      </div>
      :null) ): products.map((product,i) => (
        i<(pageref.current)*9 &&i>=(pageref.current*9)-9 ?
        <div className="productcard col-md-4" onClick={()=>productdetail(product)}>
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
            </div>
          </div>
        </div>
      </div>
      :null))
  }
const goPage=(i)=>{
  setPage(i);
}
useEffect(()=>{
  setFilterProduct([])
  if(Object.keys(activesubcategories).length !== 0){
products.map((product)=> {
if(activesubcategories.id==product.Category){
  setFilterProduct(filterproduct=> [...filterproductref.current, product]);
}}
  )
}
},[activesubcategories])
function RenderPagination() {
  return filterproductref.current.length!=0?
  filterproductref.current.map((fproduct, i=2,pro) =>
  i>1&&
  i<=Math.ceil(pro.length/9) &&
  <li className="page-item"><a className="page-link pagenumber" href='#' onClick={()=>goPage(i)}>{i}</a></li>            
  )

    : products.map((product, i=2,prod) =>
    i>1&&
    i<=Math.ceil(prod.length/9) &&
     <li className="page-item"><a className="page-link pagenumber" href='#' onClick={()=>goPage(i)}>{i}</a></li>)

 
 
}
  
const nextpage = () => {
  if($(".pagenumber").last().text()!=pageref.current)
        setPage(pageref.current+1)

    }
    const previouspage = () => {
  if(pageref.current!=1)
        setPage(pageref.current-1)

    }
  return (
    <div>
        <Container>
          <Row>
            <RenderProduct></RenderProduct>

            <nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center">
    
  <li className="page-item"><a className="page-link" href="#" onClick={()=>previouspage()}>Previous</a></li>
    <li className="page-item"><a className="page-link pagenumber" href="#"onClick={()=>goPage(1)}>1</a></li>
    <RenderPagination></RenderPagination>
    <li className="page-item"><a className="page-link" href="#" onClick={()=>nextpage()}>Next</a></li>

  </ul>
</nav>
<br/><br/>
          </Row>
   
        </Container>
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
    activesubcategories:state.activeSubCategoryReducers,
  }
}
const mapDispatchToProps = {
  getProduct, addProduct, deleteProduct, editProduct, getActiveProduct,getCategory, deleteCategory, getActiveCategory, editCategory, addCategory,
  getSubCategory, deleteSubCategory, getActiveCategory, editSubCategory, addSubCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
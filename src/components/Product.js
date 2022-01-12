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
import { getMatch } from '../redux/actions/matchMessageAction'
import { deleteMatch } from '../redux/actions/matchMessageAction'
import { getActiveMatch } from '../redux/actions/matchMessageAction'
import { editMatch } from '../redux/actions/matchMessageAction'
import { addMatch } from '../redux/actions/matchMessageAction'
import { getMessage } from '../redux/actions/messageAction'
import { deleteMessage } from '../redux/actions/messageAction'
import { getActiveMessage } from '../redux/actions/messageAction'
import { editMessage } from '../redux/actions/messageAction'
import { addMessage } from '../redux/actions/messageAction'
import { getUsers} from '../redux/actions/userActions'
import { getActiveUser} from '../redux/actions/userActions'
import { getLoginModal } from '../redux/actions/loginModalActions'
import { getRegisterModal } from '../redux/actions/registerModalActions'
import "../Css/product.css"
import {Button} from 'reactstrap';
import loginico from '../img/login-icon.png'
import $ from "jquery"

function Product({ getProduct, deleteProduct, getActiveProduct, editProduct, addProduct, products,activeProduct,
  getCategory, deleteCategory, getActiveCategory, editCategory, addCategory, categories,activeCategories,
  getSubCategory, deleteSubCategory, getActiveSubCategory, editSubCategory, addSubCategory, subcategories,activeSubCategories,getUsers,users,
  getMatch,deleteMatch,getActiveMatch,editMatch,addMatch,matchs,activeMatch,getMessage,deleteMessage,getActiveMessage,editMessage,addMessage,messages,
  activeMesage,activeUser,getActiveUser,getLoginModal,loginmodal,getRegisterModal,registermodal, ...props }) {
  const [modal, setModal] = useState(false);
  const [productowner, setProductowner] = useState([]);
  const [productcategory, setProductcategory] = useState([]);
  const mounted = useRef();
  let history = useNavigate();

  useEffect(() => {
      if (!mounted.current) {
        getCategory();
        getSubCategory();
        getProduct();
        getUsers();
        getMatch();
        getActiveProduct(JSON.parse(localStorage.getItem("activeproduct")))
        mounted.current = true;
      }else {
        getproductowner();
        getproductcategory();
      }
  }, [getCategory, getActiveCategory,getSubCategory,getProduct,getUsers,getproductowner,getproductcategory,getActiveProduct])

  function getproductcategory() {
    subcategories.map((category) => {
      if (activeProduct.Category==category.id) {
        $(".productcategory").text(category.Name);
      }
    });
  }

  function getproductowner() {
    users.map((user)=>{
      if(activeProduct.User == user.id){
        setProductowner(user.Name + " " + user.Surname);
      }
    });
  }

  async function sendmessage(product) {
    if(activeUser !=null){
    if(product.User == activeUser.id) {
      alert("Ürün Zaten Size Ait")
    }else {
      let mid = 0
      let checkmatch = false;
      const match = {
          M_Id:mid,
          U_Id:activeUser.id.toString(),
          OU_Id:product.User.toString(),
          MakeDealU: false,
          MakeDealOU: false,
          Product:product.id.toString(),
          ProductImg:product.img,
          ProductName:product.Name
      }

      await matchs.map((mtch) => {
        if (mtch.U_Id == activeUser.id) {
          mid = activeUser.id + product.User+product.id
          match.M_Id = mid
        }else if (mtch.OU_Id==activeUser.id) {
          mid = product.User + activeUser.id+product.id
          match.M_Id = mid
        }
        if (mtch.M_Id == match.M_Id) {
          checkmatch = true;
          match.U_Id = mtch.U_Id;
          match.OU_Id = mtch.OU_Id;
          match.MakeDealU = mtch.MakeDealU;
          match.MakeDealOU = mtch.MakeDealOU;
          getActiveMatch(match);
          history("/Message");
        }
      });
      if (checkmatch==false) {
        mid = activeUser.id + product.User+product.id
        match.M_Id = mid.toString();
        console.log(match);
        await addMatch(match);
        await getActiveMatch(match);
        history("/Message");
      }
    }}else{
      getLoginModal(!loginmodal);
    }
  }

  return (
    <div className="product-main-container">
      <div className="product-container">
        <div className='left-container'>
          <img src={activeProduct.img} />
        </div>
        <div className='right-container'>
          <h4>{activeProduct.Name}</h4>
          <p>{productowner}</p>
          <p>{activeProduct.Date}</p>
          <p>{activeProduct.Description}</p>
          <Button className="productfoot" onClick={()=>sendmessage(activeProduct)}>Send Message and Make Deal</Button>
        </div>
 
      </div>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    products: state.productReducers,
    activeProduct: state.activeProductReducers,
    categories:state.categoryReducers,
    activeCategories:state.activeCategoryReducers,
    subcategories:state.subCategoryReducers,
    activeSubCategories:state.activeSubCategoryReducers,
    users:state.userReducers,
    matchs:state.matchMessageReducers,
    activeMatch:state.activeMatchMessageReducers,
    messages:state.messageReducers,
    activeMessage:state.activeMessageReducers,
    activeUser:state.activeUserReducers,
    loginmodal:state.loginModalReducers,
    registermodal:state.registerModalReducers,
  }
}
const mapDispatchToProps = {
  getProduct, addProduct, deleteProduct, editProduct, getActiveProduct,getCategory, deleteCategory, getActiveCategory, editCategory, addCategory,
  getSubCategory, deleteSubCategory, getActiveCategory, editSubCategory, addSubCategory,getUsers,
  getMatch,deleteMatch,getActiveMatch,editMatch,addMatch,getMessage,deleteMessage,getActiveMessage,editMessage,addMessage,getActiveUser,getLoginModal,getRegisterModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
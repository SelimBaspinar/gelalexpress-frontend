import React, { useEffect, useRef } from 'react';
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
import { getUsers } from '../redux/actions/userActions'
import { getActiveUser } from '../redux/actions/userActions'
import { deleteUser } from '../redux/actions/userActions'
import { editUser } from '../redux/actions/userActions'
import { addUser } from '../redux/actions/userActions'
import "../Css/dashboard.css"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import useState from 'react-usestateref'

import {
    Container,
    Row,
    Col,
} from 'reactstrap';
import logo from '../img/logo-icon.png'
import $ from "jquery"
import AddProduct from './AddProduct';
import AddCategory from './AddCategory';
import AddSubCategory from './AddSubCategory';
import Register from './Register';

function Dashboard({ getProduct, deleteProduct, getActiveProduct, editProduct, addProduct, products, activeProduct,
    getCategory, deleteCategory, getActiveCategory, editCategory, addCategory, categories, activeCategories,
    getSubCategory, deleteSubCategory, getActiveSubCategory, editSubCategory, addSubCategory, subcategories, activeSubCategories, activeUser,
    getUsers, getActiveUser, deleteUser, editUser, addUser, users, ...props }) {
    const [modal, setModal,modalref] = useState(false);
    const [createModal, setCreateModal,createmodalref] = useState(false);
    const isProduct = useRef(true);
    const isCategory = useRef(false);
    const isSubCategory = useRef(false);
    const isDashboard = useRef(true);
    const [page, setPage,pageref] = useState(1);

    let history = useNavigate();

    useEffect(() => {
        getUsers();
        getCategory();
        getSubCategory();
        getProduct();

    }, [page,pageref,isDashboard,isSubCategory,isCategory,isProduct])



    const toggle = () => {
        setModal(!modal);
    };
    const createtoggle = () => {
        setCreateModal(!createModal);
    };
    const removeuser = async (userid) => {
        if (userid == activeUser.id) {
            alert("This Account Is Your Account")
        } else {
            await deleteUser(userid);
            toggle();
            getUsers();
        }
    }
    const removeproduct = async (pdid) => {
        await deleteProduct(pdid);
        toggle();
        getProduct();
    }
    const removecategory = async (cid) => {
        await deleteCategory(cid);
        toggle();
        getCategory();
    }
    const removesubcategory = async (scid) => {
        await deleteSubCategory(scid);
        toggle();
        getSubCategory();
    }
    const goproduct = async (product) => {
        await getActiveProduct(product);
        localStorage.setItem("activeproduct", JSON.stringify(product))
        history("/product");
    }
const renderproduct=()=>{
    isProduct.current = true; isCategory.current = false; isSubCategory.current = false
    $("#categoryheader").removeClass("active")
    $("#subcheader").removeClass("active")
    $("#productheader").addClass("active")
    setPage(1)
}
const rendercategory=()=>{
    setPage(1)
    isProduct.current = false; isCategory.current = true; isSubCategory.current = false;
   $("#categoryheader").addClass("active")
   $("#productheader").removeClass("active")
   $("#subcheader").removeClass("active")
}
const rendersubcategory=()=>{
    setPage(1)

    isProduct.current = false; isCategory.current = false; isSubCategory.current = true
    $("#categoryheader").removeClass("active")
    $("#subcheader").addClass("active")
    $("#productheader").removeClass("active")
}
const renderuser=()=>{
    setPage(1)

}
    function renderProduct() {

        return products.map((product,i) => (
            i<(pageref.current)*9 &&i>=(pageref.current*9)-9 ?
            <tr>
                <td>
                    <a class="text-heading font-semibold" href="#">
                        {product.id}

                    </a>
                    <a class="navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0" href="#">
                        <img width="100px" style={{ height: "auto" }} alt="..." src={product.img} />

                    </a>

                </td>
                <td>
                    <a class="text-heading font-semibold" href="#">
                        {product.Name.substring(0,20)}
                    </a>
                </td>
                <td>
                    <a class="text-heading font-semibold" href="#">
                        {product.Description.substring(0, 20)}
                    </a>
                </td>
                <td>
                    <a class="text-heading font-semibold" href="#">
                        {product.Date}
                    </a>
                </td>
                <td>
                    <a class="text-heading font-semibold" href="#">
                        {product.Phone}
                    </a>
                </td>
                <td>
                    <a class="text-heading font-semibold" href="#">
                        {product.User}
                    </a>
                </td>
                <td>
                    <a class="text-heading font-semibold" href="#">
                        {product.Category}
                    </a>
                </td>
                <td class="text-end">
                    <a onClick={() => goproduct(product)} class="btn btn-sm btn-neutral">View</a>
                    <button type="button" class="btn btn-sm btn-square btn-neutral text-danger-hover">
                        <i class="bi bi-trash" onClick={() => removeproduct(product.id)}></i>
                    </button>
                </td>
            </tr>
:null
        )
        )

    }
    const goPage=(i)=>{
        setPage(i);
      }

        function RenderPagination() {
           return isDashboard.current==true?
            isProduct.current==true?
             products.map((product, i=2,prod) =>
            i>1&&
            i<=Math.ceil(prod.length/9) &&
             <li class="page-item pagenumber"><a class="page-link" href='#' onClick={()=>goPage(i)}>{i}</a></li>)
            :isCategory.current==true?
             categories.map((category, i=2,cat) =>
            i>1&&
            i<=Math.ceil(cat.length/9) &&
             <li class="page-item pagenumber"><a class="page-link" href='#' onClick={()=>goPage(i)}>{i}</a></li>)
            :isSubCategory.current==true&&
             subcategories.map((subcategory, i=2,subcat) =>
            i>1&&
            i<=Math.ceil(subcat.length/9) &&
             <li class="page-item pagenumber"><a class="page-link" href='#' onClick={()=>goPage(i)}>{i}</a></li>)                 
             : users.map((user, i=2,use) =>
             i>1&&
             i<=Math.ceil(use.length/9) &&
              <li class="page-item pagenumber"><a class="page-link" href='#' onClick={()=>goPage(i)}>{i}</a></li>)

          
          
        }
    function renderCategory() {

   
        return categories.map((ct,i) => (
            i<(pageref.current)*9 &&i>=(pageref.current*9)-9 ?
            <tr>
                <td>
                    <a class="text-heading font-semibold" href="#">
                        {ct.id}

                    </a>

                </td>
                <td>
                    <a class="text-heading font-semibold" href="#">
                        {ct.Name}
                    </a>
                </td>
                <td class="text-end">
                    <button type="button" class="btn btn-sm btn-square btn-neutral text-danger-hover">
                        <i class="bi bi-trash" onClick={() => removecategory(ct.id)}></i>
                    </button>
                </td>
            </tr>
:null

        )
        )
    }
    function renderSubCategory() {
   
        return subcategories.map((sct,i) => (
            i<(pageref.current)*9 &&i>=(pageref.current*9)-9 ?
            <tr>
                <td>
                    <a class="text-heading font-semibold" href="#">
                        {sct.id}

                    </a>

                </td>
                <td>
                    <a class="text-heading font-semibold" href="#">
                        {sct.Name}
                    </a>
                </td>
                <td>
                    <a class="text-heading font-semibold" href="#">
                        {sct.Category}
                    </a>
                </td>
                <td class="text-end">
                    <button type="button" class="btn btn-sm btn-square btn-neutral text-danger-hover">
                        <i class="bi bi-trash" onClick={() => removesubcategory(sct.id)}></i>
                    </button>
                </td>
            </tr>
:null

        )
        )
    }
    function renderUser() {

        return users.map((user,i) => (
            i<(pageref.current)*9 &&i>=(pageref.current*9)-9 ?
            <tr>
                <td>
                    <a class="text-heading font-semibold" href="#">
                        {user.id}

                    </a>

                </td>
                <td>
                    <a class="text-heading font-semibold" href="#">
                        {user.Username}
                    </a>
                </td>
                <td>
                    <a class="text-heading font-semibold" href="#">
                        {user.Name}
                    </a>
                </td>
                <td>
                    <a class="text-heading font-semibold" href="#">
                        {user.Surname}
                    </a>
                </td>
                <td>
                    <a class="text-heading font-semibold" href="#">
                        {user.Gender}
                    </a>
                </td> <td>
                    <a class="text-heading font-semibold" href="#">
                        {user.Birthday}
                    </a>
                </td> <td>
                    <a class="text-heading font-semibold" href="#">
                        {user.Phone}
                    </a>
                </td> <td>
                    <a class="text-heading font-semibold" href="#">
                        {user.Email}
                    </a>
                </td> <td>
                    <a class="text-heading font-semibold" href="#">
                        {user.Password}
                    </a>
                </td>
                <td>
                    <a class="text-heading font-semibold" href="#">
                        {user.Role}
                    </a>
                </td>
                <td class="text-end">
                    <button type="button" class="btn btn-sm btn-square btn-neutral text-danger-hover">
                        <i class="bi bi-trash" onClick={() => removeuser(user.id)}></i>
                    </button>
                </td>
            </tr>
:null
        )
        )
    }
    function RenderTbodyPCS() {
        if (isDashboard.current == true) {
            if (isProduct.current == true) {
                return renderProduct()
            } else if (isCategory.current == true) {
                return renderCategory()

            } else if (isSubCategory.current == true) {
                return renderSubCategory()
            }

        } else {
            return renderUser()
        }
    }
    function RenderTHeadPCS() {
        if (isDashboard.current == true) {
            if (isProduct.current == true) {
                return <tr>
                    <th scope="col">P_Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Date</th>
                    <th scope="col">Phone</th>
                    <th scope="col">User</th>
                    <th scope="col">Category</th>
                    <th></th>
                </tr>
            } else if (isCategory.current == true) {
                return <tr>
                    <th scope="col">C_Id</th>
                    <th scope="col">Category Name</th>
                    <th></th></tr>

            } else if (isSubCategory.current == true) {
                return <tr>
                    <th scope="col">SubC_Id</th>
                    <th scope="col">SubCategory Name</th>
                    <th scope="col">Category</th>
                    <th></th></tr>
            }
        } else {
            return <tr>
                <th scope="col">Id</th>
                <th scope="col">Username</th>
                <th scope="col">Name</th>
                <th scope="col">Surname</th>
                <th scope="col">Gender</th>
                <th scope="col">Birthday</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
                <th scope="col">Role</th>
                <th></th>
            </tr>
        }
    }
    function RenderTotalCount() {
        if (isDashboard.current == true) {
            if (isProduct.current == true) {
                return <><span class="h6 font-semibold text-muted text-sm d-block mb-2">Total Product</span>
                    <span class="h3 font-bold mb-0">{products.length}</span></>
            } else if (isCategory.current == true) {
                return <> <span class="h6 font-semibold text-muted text-sm d-block mb-2">Total Category</span>
                    <span class="h3 font-bold mb-0">{categories.length}</span></>

            } else if (isSubCategory.current == true) {
                return <> <span class="h6 font-semibold text-muted text-sm d-block mb-2">Total SubCategory</span>
                    <span class="h3 font-bold mb-0">{subcategories.length}</span></>
            }
        } else {
            return <> <span class="h6 font-semibold text-muted text-sm d-block mb-2">Total User</span>
                <span class="h3 font-bold mb-0">{users.length}</span></>
        }
    }



    const dashboardstat = () => {
        isDashboard.current = true;
        isProduct.current = true; isCategory.current = false; isSubCategory.current = false
        setPage(1)
    }
    const userstat = () => {
        isDashboard.current = false;
        isProduct.current = false; isCategory.current = false; isSubCategory.current = false
        $("#userheader").removeClass("active")
        setPage(1)

    }
    function RenderShowingCount(){
       return isDashboard.current == true? 
                    isProduct.current == true?
                    <span class="text-muted text-sm">Showing {$(".table").children('tbody').children('tr').length} items out of {products.length} results found</span>
                    :
            isCategory.current == true?
            <span class="text-muted text-sm">Showing {$(".table").children('tbody').children('tr').length} items out of {categories.length} results found</span>
            :
isSubCategory.current == true?
<span class="text-muted text-sm">Showing {$(".table").children('tbody').children('tr').length} items out of {subcategories.length} results found</span>
:null
        :
        <span class="text-muted text-sm">Showing {$(".table").children('tbody').children('tr').length} items out of {users.length} results found</span>
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
            <div class="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
                <nav class="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg" id="navbarVertical">
                    <div class="container-fluid">

                        <div class="collapse navbar-collapse" id="sidebarCollapse">
                            <ul class="navbar-nav">
                                <li class="nav-item" onClick={() => dashboardstat()}>
                                    <a class="nav-link active" href="#">
                                        <i class="bi bi-house "></i> Dashboard
                                    </a>
                                </li>


                                <li class="nav-item" onClick={() => userstat()}>
                                    <a class="nav-link active" href="#">
                                        <i class="bi bi-people"  ></i> Users
                                    </a>
                                </li>
                            </ul>

                        </div>
                    </div>
                </nav>
                <div class="h-screen flex-grow-1 overflow-y-lg-auto">
                    <header class="bg-surface-primary border-bottom pt-6">
                        <div class="container-fluid">
                            <div class="mb-npx">
                                <div class="row align-items-center">
                                    <div class="col-sm-6 col-12 mb-4 mb-sm-0">
                                        {isDashboard.current ?
                                            <h1 class="h2 mb-0 ls-tight">Dashboard</h1> :
                                            <h1 class="h2 mb-0 ls-tight">User</h1>}
                                    </div>
                                    <div class="col-sm-6 col-12 text-sm-end">
                                        <div class="mx-n1">
                                            <a href="#" class="btn d-inline-flex btn-sm btn-primary mx-1" onClick={() => createtoggle()}>
                                                <span class=" pe-2">
                                                    <i class="bi bi-plus"></i>
                                                </span>
                                                <span>Create</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <ul class="nav nav-tabs mt-4 overflow-x border-0">
                                    {isDashboard.current ? <>
                                        <li class="nav-item ">
                                            <a href="#" id="productheader" class="nav-link active font-regular" onClick={() => renderproduct()}>Product</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="#"  id="categoryheader" class="nav-link font-regular" onClick={() => rendercategory()}>Category</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="#"  id="subcheader" class="nav-link font-regular" onClick={() => rendersubcategory()}>SubCategory</a>
                                        </li></> : <>
                                        <li class="nav-item ">
                                            <a href="#"  id="userheader" class="nav-link active font-regular" onClick={() => renderuser()}>User</a>
                                        </li>

                                    </>
                                    }
                                </ul>
                            </div>
                        </div>
                    </header>
                    <main class="py-6 bg-surface-secondary">
                        <div class="container-fluid">
                            <div class="row g-6 mb-6">
                                <div class="col-xl-3 col-sm-6 col-12">
                                    <div class="card shadow border-0">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col">
                                                    <RenderTotalCount></RenderTotalCount>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                                                        <i class="bi bi-credit-card"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-sm-6 col-12">

                                </div>
                                <div class="col-xl-3 col-sm-6 col-12">

                                </div>
                                <div class="col-xl-3 col-sm-6 col-12">

                                </div>
                            </div>
                            <div class="card shadow border-0 mb-7">
                                <div class="card-header">
                                    <h5 class="mb-0">Product</h5>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-hover table-nowrap">
                                        <thead class="thead-light">
                                            <RenderTHeadPCS></RenderTHeadPCS>
                                        </thead>
                                        <tbody>

                                            <RenderTbodyPCS></RenderTbodyPCS>
                                       
                                        </tbody>

                                    </table>
                                </div>
                                <ul class="pagination justify-content-center">
    
    <li class="page-item"><a class="page-link" href="#" onClick={()=>previouspage()}>Previous</a></li>
      <li class="page-item"><a class="page-link pagenumber " href="#"onClick={()=>goPage(1)}>1</a></li>
      <RenderPagination></RenderPagination>
      <li class="page-item"><a class="page-link" href="#"onClick={()=>nextpage()}>Next</a></li>
  
    </ul>
                                <div class="card-footer border-0 py-5">
                                <RenderShowingCount/>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                
            </div> {modal ? (
                <Modal isOpen={true} toggle={toggle} centered scrollable>
                    <ModalHeader className="modal-header text-center" toggle={toggle} tag="h2">  Information</ModalHeader>
                    <ModalBody>
                        <h4>Has Been Deleted</h4>
                    </ModalBody>
                </Modal>
            ) : null}
            {createModal ? (
                <Modal isOpen={createModal} fullscreen toggle={createtoggle} scrollable>
                    <ModalHeader className="modal-header text-center" toggle={createtoggle} tag="h2">  Create</ModalHeader>
                    <ModalBody>
                  { isDashboard.current == true? 
                    isProduct.current == true?
                <AddProduct  />:
            isCategory.current == true?
             <AddCategory />:
isSubCategory.current == true?
  <AddSubCategory />:null
        :
         <Register />
        }
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
        categories: state.categoryReducers,
        activeCategories: state.activeCategoryReducers,
        subcategories: state.subCategoryReducers,
        activeSubCategories: state.activeSubCategoryReducers,
        activeUser: state.activeUserReducers,
        users: state.userReducers,

    }
}
const mapDispatchToProps = {
    getProduct, addProduct, deleteProduct, editProduct, getActiveProduct, getCategory, deleteCategory, getActiveCategory, editCategory, addCategory,
    getSubCategory, deleteSubCategory, getActiveCategory, editSubCategory, addSubCategory, getUsers, getActiveUser, deleteUser, editUser, addUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard) 
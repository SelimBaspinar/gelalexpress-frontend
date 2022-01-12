import React, { useState, useEffect,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActiveSubCategory } from '../redux/actions/subCategoryActions'
import { getSubCategory } from '../redux/actions/subCategoryActions'
import { getProduct } from '../redux/actions/productActions'
import { getActiveProduct } from '../redux/actions/productActions'

import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap';
import '../Css/searchbox.css';
import $ from "jquery"

function Searchbox({ getActiveSubCategory,activeSubCategories,getSubCategory,subcategory,getProduct,product,activeproduct,getActiveProduct, ...props }) {
  const [isOpen, setIsOpen] = useState(false);

  const mounted = useRef();
  let history = useNavigate();

  useEffect(() => {
    if (!mounted.current) {
        getProduct();
        mounted.current = true;
    }
  },[])
  


 const  searchfunc =async () => {
      let innerText = document.getElementById("searchbox").value;
      if(innerText==""){
        $("#myUL li").empty();

      }else{
      let re = new RegExp(innerText.toLowerCase());
      $("#myUL").empty();

         let filtername = product.filter((item)=>re.test(item.Name.toString().toLowerCase()));
         if(filtername.length==0){
          let filtercategory = subcategory.filter((item)=>re.test(item.Name.toString().toLowerCase()));
          if(filtercategory.length==0){
            var li1 = $("<li></li>");
            var a = $("<a></a>").text("Sonuç Bulunamadı");
            li1.append(a);
            $("#myUL").append(li1);        
           }else{
             filtercategory.map((subcategoryitem)=>{
              product.map((item)=>{
                console.log(subcategoryitem)
                if(subcategoryitem.id==item.Category){
                  var li1 = $("<li></li>")
                 var a1 =$("<a></a>").text(item.Name);
                 var img1 =$("<img></img>").attr("src",item.img);
                 a1.append(img1);
                 li1.append(a1);
                 li1.mousedown(function() {


                  getActiveProduct(item);
                  localStorage.setItem("activeproduct", JSON.stringify(item))
                  history("/product")
                 }
               )
                 $("#myUL").append(li1)
                }
         
               })
             
             })
            
           }
         }else{

          filtername.map((item)=>{
                  var li1 = $("<li></li>")
                 var a1 =$("<a></a>").text(item.Name);
                 var img1 =$("<img></img>").attr("src",item.img);
                 a1.append(img1);
                 li1.append(a1);
                 li1.mousedown(function() {


                  getActiveProduct(item);
                  localStorage.setItem("activeproduct", JSON.stringify(item))
                  history("/product")
                 }
               )
                 $("#myUL").append(li1)

           })
         }}
  }
  $( document ).on( "blur", "#searchbox", function() {
     $("#myUL li").empty();
  })
   

  return (
    <div className="container" >
    <div className="row height d-flex justify-content-center align-items-center">
        <div className="col-md-8">
            <div className="search"  > 
            <i className="fa fa-search"></i> 
            <input type="text" id='searchbox' className="form-control"   onClick={()=>searchfunc()} onChange={()=>searchfunc()} /> 
            <ul id="myUL" className='searchlist' >


</ul>
            </div>
          
        </div>
    </div>

</div>

  );
}

function mapStateToProps(state, ownProps) {
  return {
    subcategory: state.subCategoryReducers,
    product:state.productReducers,
    activeproduct:state.activeProductReducers,
  }
}
const mapDispatchToProps = {
  getSubCategory,getActiveSubCategory,getProduct,getActiveProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbox)
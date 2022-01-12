import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
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
import {
  Container,
  Row,
  Col,
  Nav,
} from 'reactstrap';
import $ from "jquery"
import '../Css/category.css';

function Category({ getCategory, deleteCategory, getActiveCategory, editCategory, addCategory, categories,activeCategory,
  getSubCategory,deleteSubCategory,getActiveSubCategory,editSubCategory,addSubCategory,activeSubCategory,subcategories, ...props }) {
  const [modal, setModal] = useState(false);

  const mounted = useRef();
  let history = useNavigate();

  useEffect(() => {
    if (!mounted.current) {
      getCategory();
      getSubCategory();
      mounted.current = true;
    }
  }, [getCategory, getActiveCategory])

  const setActiveCategory=(subc)=>{
    getActiveSubCategory(subc);
  }


  function rendercategory() {
    return categories.map((category) => (
      <li>
        <a>{category.Name}</a><ul>
        {rendersubcategory(category.id)}      </ul>

      </li>
    ))
  }

  function rendersubcategory(cid) {
    return subcategories.map((subcategory) => (
              cid == subcategory.Category ? (
        <li>
          <a onClick={()=>setActiveCategory(subcategory)}>{subcategory.Name}</a>
        </li>
    ):null
    ))
  }

  return (
    <nav className="category">
      <ul>
        {rendercategory()}
      </ul>
    </nav>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    categories: state.categoryReducers,
    activeCategory: state.activeCategoryReducers,
    subcategories: state.subCategoryReducers,
    activeSubCategory: state.activeSubCategoryReducers,
  }
}
const mapDispatchToProps = {
  getCategory, addCategory, deleteCategory, editCategory, getActiveCategory,getSubCategory,deleteSubCategory,getActiveSubCategory,editSubCategory,addSubCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
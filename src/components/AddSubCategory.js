import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getSubCategory } from '../redux/actions/subCategoryActions'
import { deleteSubCategory } from '../redux/actions/subCategoryActions'
import { getActiveSubCategory } from '../redux/actions/subCategoryActions'
import { editSubCategory } from '../redux/actions/subCategoryActions'
import { addSubCategory } from '../redux/actions/subCategoryActions'
import { getCategory } from '../redux/actions/categoryActions'
import "../Css/addproduct.css"
import { Label, Input, Button, Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';
import logo from '../img/logo-icon.png'
import $ from "jquery"

function AddSubCategory({ getSubCategory, deleteSubCategory, getActiveSubCategory, editSubCategory, addSubCategory, subcategories, activeSubCategories,getCategory,categories
    ,...props }) {
    const [modal, setModal] = useState(false);
    const [selectedFile, setselectedFile] = useState([]);
    const mounted = useRef();
    let history = useNavigate();

    useEffect(() => {
        if (!mounted.current) {
            getSubCategory();
            getCategory();
            mounted.current = true;
        }
    }, [getCategory,getSubCategory])

    const toggle = () => {
        setModal(!modal);
      };
    const createSubCategory = async () => {
        let name = document.getElementById("cname").value;
        let categoryname = document.getElementById("categoryselect").value;
let categoryid=0;
        await categories.map((category) => {
                if (categoryname == category.Name) {
                    categoryid = category.id;
                }
        });
        let alreadyaddstat=false;
        let category ={Name:name,
        Category:categoryid
        }
        await subcategories.map((subcategory) => {
                if (subcategory.Name == name) {
                    alert("Already added please try entering another name");
                    alreadyaddstat=true;
                }
        });
      if(alreadyaddstat==false){
        await addSubCategory(category);
        setModal(!modal);
      }
      
        
    }
    function renderCategory() {
        return categories.map((category) => (
            <option >
                {category.Name}
            </option>
        ));
    }
 
    return (
        <div>
            <Container>
                <Row>
                </Row>
                <br/>
                <Row>
                    <Col></Col>
                    <Col>
                        <h2 className="text-center">
                            SubCategory Information
                        </h2>
                    </Col>
                    <Col></Col>
                </Row>
                <br/>
                <Form noValidate>
                    <Row>
                        <Col>
                        <FormGroup>
                                <Label for="cname">SubCategory Name</Label>
                                <Input type="cname" name="cname" id="cname" />
                        
                    </FormGroup>
                        </Col>
                        <FormGroup>
                                <Label for="categoryselect">Category</Label>
                                <Input id="categoryselect" name="select" type="select" >
                                    {renderCategory()}
                                </Input>
                            </FormGroup>
                        <Col>
                            <br/>
                            <Button color="primary" onClick={() => createSubCategory()}>Create SubCategory</Button>
                        </Col>
                        <Col></Col>
                    </Row>
                </Form>
            </Container>
            {modal ? (
            <Modal isOpen={true} toggle={toggle}  scrollable>
             <ModalHeader className="modal-header text-center" toggle={toggle} tag="h2">  Information</ModalHeader>
              <ModalBody>
                <h4>Has Been Added</h4>
              </ModalBody>
           </Modal>
      ) : null}
        </div>
    );
}

function mapStateToProps(state, ownProps) {
    return {
        subcategories: state.subCategoryReducers,
        activeSubCategories: state.activeSubCategoryReducers,
        categories:state.categoryReducers,
    }
}
const mapDispatchToProps = {
    getSubCategory, deleteSubCategory, getActiveSubCategory, editSubCategory, addSubCategory,getCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSubCategory)
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getCategory } from '../redux/actions/categoryActions'
import { deleteCategory } from '../redux/actions/categoryActions'
import { getActiveCategory } from '../redux/actions/categoryActions'
import { editCategory } from '../redux/actions/categoryActions'
import { addCategory } from '../redux/actions/categoryActions'
import "../Css/addproduct.css"
import { Label, Input, Button, Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';
import logo from '../img/logo-icon.png'
import $ from "jquery"

function AddCategory({ getCategory, deleteCategory, getActiveCategory, editCategory, addCategory, categories, activeCategories,
    ...props }) {
    const [modal, setModal] = useState(false);
    const [selectedFile, setselectedFile] = useState([]);
    const mounted = useRef();
    let history = useNavigate();

    useEffect(() => {
        if (!mounted.current) {
            getCategory();
            mounted.current = true;
        }
    }, [getCategory, getActiveCategory])

    const toggle = () => {
        setModal(!modal);
      };
    const createCategory = async () => {
        let name = document.getElementById("cname").value;
        let alreadyaddstat=false;
        let category ={Name:name}
        await categories.map((category) => {
                if (category.Name == name) {
                    alert("Already added please try entering another name");
                    alreadyaddstat=true;
                }
        });
      if(alreadyaddstat==false){
        await addCategory(category);
        setModal(!modal);
      }
      
        
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
                            Category Information
                        </h2>
                    </Col>
                    <Col></Col>
                </Row>
                <br/>
                <Form noValidate>
                    <Row>
                        <Col></Col>
                        <Col>
                        <FormGroup>
                                <Label for="cname">Category Name</Label>
                                <Input type="cname" name="cname" id="cname" />
                            </FormGroup>
                        </Col>
                       
                        <Col>
                            <br/>
                            <Button color="primary" style={{marginTop:"6px"}} onClick={() => createCategory()}>Create Category</Button>
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
        categories: state.categoryReducers,
        activeCategories: state.activeCategoryReducers,
    }
}
const mapDispatchToProps = {
    getCategory, deleteCategory, getActiveCategory, editCategory, addCategory,

}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory)
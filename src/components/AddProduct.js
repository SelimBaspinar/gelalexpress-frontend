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
import { getActiveUser } from '../redux/actions/userActions'
import "../Css/addproduct.css"
import { Label, Input, Button, Form, FormGroup } from 'reactstrap';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';
import logo from '../img/logo-icon.png'
import $ from "jquery"
import useState from 'react-usestateref'

function AddProduct({ getProduct, deleteProduct, getActiveProduct, editProduct, addProduct, products, activeProduct,
    getCategory, deleteCategory, getActiveCategory, editCategory, addCategory, categories, activeCategories,
    getSubCategory, deleteSubCategory, getActiveSubCategory, editSubCategory, addSubCategory, subcategories, activeSubCategories, getActiveUser, activeuser, ...props }) {
    const [selectedFile, setselectedFile] = useState([]);
    const mounted = useRef();
    const [selectedcategory,setSelectedCategory,selectedcategoryref] = useState(4);

    let history = useNavigate();

    useEffect(() => {
            getCategory();
            getSubCategory();
            getProduct();
    }, [getSubCategory,selectedcategory,getCategory,getProduct])
    useEffect(() => {
getSubCategory()
    }, [selectedcategory,selectedcategoryref])
    function RenderCategory() {
        return categories.map((category) => (
            <option className={category.id}>
                {category.Name}
            </option>
        ));
    }
    

    const renderSubCategory=()=> {
        var categoryindex = $("#categoryselect").prop('selectedIndex');
        var category = $("#categoryselect option").eq(categoryindex).attr('class');
        setSelectedCategory(category);
    }
    function RenderSubCategory(){
        console.log(selectedcategoryref.current)
       return  subcategories.map((subcategory) =>  (subcategory.Category == selectedcategoryref.current?
       <>
        <option>{subcategory.Name}</option></>:null
     
        ) )
    }

    const advertiseProduct = async () => {
        let name = document.getElementById("pname").value;
        let description = document.getElementById("pdescription").value;
        let subcategoryselect = document.getElementById("subcategoryselect").value;
        let phone = document.getElementById("Phone").value;
        let img = document.getElementById("imgfile").value;
        const d = new Date(Date.now());
        let pid = Math.floor(Math.random() * 100000);
        let subcat;
        await categories.map((category) => {
            subcategories.map((subcategory) => {
                if (subcategoryselect == subcategory.Name) {
                    if(subcategory.Category == category.id) {
                        subcat = subcategory.id;
                    }
                }
            });
        });
      
        let product_data = new FormData();
        product_data.append('P_Id', pid.toString());
        product_data.append('Name', name.toString());
        product_data.append('Description', description.toString());
        product_data.append('Date', d.toString());
        product_data.append('img', selectedFile);
        product_data.append('Phone', parseInt(phone));
        product_data.append('User', activeuser.id.toString());
        product_data.append('Category', subcat.toString());
        await addProduct(product_data);
        history("/myproduct");
    }

    const onFileChange = (e) => {
        setselectedFile(e.target.files[0]);
    };

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
                            Product Information
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
                                <Label for="pname">Product Name</Label>
                                <Input type="pname" name="pname" id="pname" />
                            </FormGroup>
                        </Col>
                        <Col>
                        <FormGroup>
                            <Label for="phone" className="form-label">Phone Number</Label>
                            <Input type="phone" name="phone" id="Phone" pattern="[0-9]{10}" placeholder="Max Length is 11" />
                        </FormGroup>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col className='col-6'>
                            <FormGroup>
                                <Label for="pdescription">Product Description</Label>
                                <textarea name="pdescription" id="pdescription" />
                            </FormGroup>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col>
                            <FormGroup>
                                <Label for="categoryselect">Category</Label>
                                <Input id="categoryselect" name="select" type="select" onChange={()=>renderSubCategory()}>
                                    {RenderCategory()}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleFile">File</Label>
                                <Input id="imgfile" name="file" type="file" accept="image/png, image/jpeg" onChange={onFileChange} />
                            </FormGroup>
                            <br/>
                            <Button color="primary" onClick={() => advertiseProduct()}>İlan Ver</Button>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="subcategoryselect">Sub Category</Label>
                                <Input id="subcategoryselect" name="select" type="select">
                                {RenderSubCategory()}
                                    
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col></Col>
                    </Row>
                </Form>
            </Container>
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
        activeuser: state.activeUserReducers,
    }
}
const mapDispatchToProps = {
    getProduct, addProduct, deleteProduct, editProduct, getActiveProduct, getCategory, deleteCategory, getActiveCategory, editCategory, addCategory,
    getSubCategory, deleteSubCategory, getActiveCategory, editSubCategory, addSubCategory, getActiveUser
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)
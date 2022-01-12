import React, { useState, useEffect, useLayoutEffect } from "react";
import { Button, Form, FormGroup, Label, Input, ModalBody,Modal,ModalFooter,ModalHeader } from 'reactstrap';
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { getUsers } from '../redux/actions/userActions'
import { getActiveUser } from '../redux/actions/userActions'
import { deleteUser } from '../redux/actions/userActions'
import { editUser } from '../redux/actions/userActions'
import { addUser } from '../redux/actions/userActions'
import { loginStat } from '../redux/actions/loginActions'
import $ from "jquery"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs"
import { getLoginModal } from '../redux/actions/loginModalActions'
import { getRegisterModal } from '../redux/actions/registerModalActions'


function Register({ loginstat, loginStat, activeuser, users, getUsers, getActiveUser, deleteUser, editUser, addUser,getLoginModal,loginmodal,getRegisterModal,registermodal, ...props }) {
  const [gender, setGender] = useState("Male")
  const [department, setDepartment] = useState(1)
  const [validate, setValidate] = useState(false)
  const [abilityrating, setAbilityrating] = useState(1)
  const [actuser, setactuser] = useState({})

  $(document).on('click', '#ratings', function () {
    $("#abilitylevel").text($(this).text())
  });





  let history = useNavigate();
  /* eslint eqeqeq: 0 */

  useEffect(() => {
    getUsers();
  }, [ getUsers])










  const userinf = (e) => {
    let { id, value } = e.target
    if (id === "customRadio1") {
      setGender("Male")
    }else if (id === "customRadio2") {
      setGender("Female")
    } 
  }


  const formvalid = (e) => {
    let Name = document.getElementById("Name").value
    let Surname = document.getElementById("Surname").value
    let Username = document.getElementById("Username").value
    let Birthday = document.getElementById("Birthday").value
    let Password = document.getElementById("Password").value
    let Phone = document.getElementById("Phone").value
    let Email = document.getElementById("Email").value
    const checkemail = users.filter((user) => user.Email === Email)
    const checkusername = users.filter((user) => user.Username === Username)
    const checkphone = users.filter((user) => user.Phone == Phone)
    var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



    if (Name !== "") {
      document.getElementById("Name").className = "form-control is-valid";
      setValidate(true)

    }
    if (Surname !== "") {
      document.getElementById("Surname").className = "form-control is-valid";
      setValidate(true)

    }
    if (Password !== "") {
      document.getElementById("Password").className = "form-control is-valid";
      setValidate(true)

    }
   
    if (Birthday !== "") {
      document.getElementById("Birthday").className = "form-control is-valid";
      setValidate(true)

    }
  
    if (Phone !== "") {
      document.getElementById("Phone").className = "form-control is-valid";
      setValidate(true)

    }
    if (Email !== "") {
      document.getElementById("Email").className = "form-control is-valid";
      setValidate(true)

    }
    if (Username !== "") {
      document.getElementById("Username").className = "form-control is-valid";
      setValidate(true)

    }
    if (!validRegex.test(Email.toLowerCase())) {
      document.getElementById("emailinvalid").innerHTML = "Please write in the correct format."
      document.getElementById("Email").className = "form-control is-invalid";
      setValidate(false)
    }
    if (Email === "") {
      document.getElementById("emailinvalid").innerHTML = "Please fill out this field."
      document.getElementById("Email").className = "form-control is-invalid";
      setValidate(false)
    }
    if (Name === "") {
      document.getElementById("nameinvalid").innerHTML = "Please fill out this field."
      document.getElementById("Name").className = "form-control is-invalid";
      setValidate(false)

    }
    if (Surname === "") {
      document.getElementById("surnameinvalid").innerHTML = "Please fill out this field."
      document.getElementById("Surname").className = "form-control is-invalid";
      setValidate(false)

    }
    if (Username === "") {
      document.getElementById("usernameinvalid").innerHTML = "Please fill out this field."
      document.getElementById("Username").className = "form-control is-invalid";
      setValidate(false)

    }
    if (Password === "") {
      document.getElementById("passwordinvalid").innerHTML = "Please fill out this field."
      document.getElementById("Password").className = "form-control is-invalid";
      setValidate(false)

    }
    
    if (Birthday === "") {
      document.getElementById("birthdayinvalid").innerHTML = "Please fill out this field."
      document.getElementById("Birthday").className = "form-control is-invalid";
      setValidate(false)

    }
    if (Phone === "") {
      document.getElementById("phoneinvalid").innerHTML = "Please fill out this field."
      document.getElementById("Phone").className = "form-control is-invalid";
      setValidate(false)

    }
    if (Phone.length < 10) {
      document.getElementById("phoneinvalid").innerHTML = "Please write in the correct format."
      document.getElementById("Phone").className = "form-control is-invalid";
      setValidate(false)
    }
    if (checkemail == "" && checkusername == "" && checkphone == "") {

    } else {
      if (checkemail != "") {
        document.getElementById("emailinvalid").innerHTML = "This Email has been used before. Please enter a different Email."
        document.getElementById("Email").className = "form-control is-invalid";
        setValidate(false)
      } else if (checkphone != "") {
        document.getElementById("phoneinvalid").innerHTML = "This Phone has been used before. Please enter a different Phone."
        document.getElementById("Phone").className = "form-control is-invalid";
        setValidate(false)

      } else {
        document.getElementById("usernameinvalid").innerHTML = "This Username has been used before. Please enter a different Username."
        document.getElementById("Username").className = "form-control is-invalid";
        setValidate(false)

      }

    }
  }


  const createUser =async () => {
    if (validate === true) {
      let Name = document.getElementById("Name").value
      let Surname = document.getElementById("Surname").value
      let Username = document.getElementById("Username").value
      let Birthday = document.getElementById("Birthday").value
      let Password = document.getElementById("Password").value
      let Phone = parseInt(document.getElementById("Phone").value)
      let Email = document.getElementById("Email").value
      let id=0;
      await users.forEach((user,i,users) => {
        if (i +1 === users.length) {
            id =user.id;
        }
        });   
      const activeuser1 = {
        id:id+1,
        Name: Name,
        Surname: Surname,
        Username: Username,
        Gender: gender,
        Birthday: Birthday,
        Phone: Phone,
        Password: Password,
        Email: Email,
        Role:2,
      }

      const {data}=await axios.post("/api/users/", qs.stringify(activeuser1)).catch((err)=>console.log(err))  
console.log(data)
getActiveUser(data)
let activeuserid=data.id;

      loginStat("true")
      localStorage.setItem("activeuser", JSON.stringify(activeuser1))
      localStorage.setItem("loginstat", "true")
      getRegisterModal(!registermodal)

      history("/Profile")

    }


  }

  const checkformvalid = (e) => {
    checkvalidate(e);
    formvalid();
  }
  const checkvalidate = (e) => {
    let { id, value } = e.target
    value = value.replace(/[^\d]/, '')
    if (value.length > 10) {
      value = value.slice(0, -1);
    }
    document.getElementById(id).value = value
  }

 
  const handleLogin = () => {
    toggle1();
  };
  const toggle1 = () => {
    getRegisterModal(!registermodal); 
    getLoginModal(!loginmodal);
  };
  const { toggle} = props;

  return (
    <div>
      <Container >
          <Row>
              <div  className="loginmodal" zIndex="9999"  >
          <Modal isOpen={true} fullscreen toggle={toggle} centered scrollable size="lg">
        <ModalHeader className="modal-header text-center" toggle={toggle} tag="h1">  Register</ModalHeader>
        <Col className="col-12" >
          <Form noValidate>
           <ModalBody>   
          <Row>
            <Col></Col>
            <Col className="col-5">
              <FormGroup>
                <Label for="name" >Name</Label>
                <Input onKeyUp={formvalid} className="form-control" type="name" name="name" id="Name"  required />
                <div className="valid-feedback">Valid.</div>
                <div id="nameinvalid" className="invalid-feedback">Please fill out this field.</div>
              </FormGroup>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input onKeyUp={formvalid} type="username" name="username" id="Username" required />
                <div className="valid-feedback">Valid.</div>
                <div id="usernameinvalid" className="invalid-feedback">Please fill out this field.</div>
              </FormGroup>
              <FormGroup>
                <Label className="custom-control-inline" for="radio">Gender : </Label>
                <FormGroup className="custom-control custom-radio custom-control-inline">
                  <Input onChange={userinf} type="radio" className="custom-control-input" id="customRadio1" name="example" checked />
                  <Label className="custom-control-label " for="customRadio1">Male</Label>
                </FormGroup>
                <FormGroup className="custom-control custom-radio custom-control-inline is-valid">
                  <Input onChange={userinf} type="radio" className="custom-control-input" id="customRadio2" name="example" />
                  <Label className="custom-control-label" for="customRadio2">Female</Label>
                </FormGroup>
              </FormGroup>
            </Col>
            <Col className="col-5">
              <FormGroup>
                <Label for="surname">Surname</Label>
                <Input onKeyUp={formvalid} type="surname" name="surname" id="Surname"  required />
                <div className="valid-feedback">Valid.</div>
                <div id="surnameinvalid" className="invalid-feedback">Please fill out this field.</div>
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input onKeyUp={formvalid} type="password" name="password" id="Password"  required />

                <div className="valid-feedback">Valid.</div>
                <div id="passwordinvalid" className="invalid-feedback">Please fill out this field.</div>
              </FormGroup>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col className="col-5">
              <FormGroup>
                <Label for="email">Email</Label>
                <Input onKeyUp={formvalid} type="email" name="email" id="Email" required />
                <div className="valid-feedback">Valid.</div>
                <div id="emailinvalid" className="invalid-feedback">Please fill out this field.</div>
              </FormGroup>
              <FormGroup>
                <Label for="phone" className="form-label">Phone Number</Label>
                <Input onKeyUp={checkformvalid} type="phone" name="phone" id="Phone" pattern="[0-9]{10}" placeholder="Max Length is 11"  required />
                <div className="valid-feedback">Valid.</div>
                <div id="phoneinvalid" className="invalid-feedback">Please fill out this field.</div>
              </FormGroup>
              <Button onClick={() => createUser()} color="primary" >Register</Button>
            </Col>
            <Col className="col-5">
              <FormGroup>
                <Label for="birthday">Birthday</Label>
                <Input onChange={formvalid} type="date" id="Birthday" name="birthday"  required />
                <div className="valid-feedback">Valid.</div>
                <div id="birthdayinvalid" className="invalid-feedback">Please fill out this field.</div>
              </FormGroup>
              
            </Col>
            <Col></Col>
          </Row>
          </ModalBody>   
        </Form>
            </Col>
        <ModalFooter>
        <p className="m-auto">If you have an account? <a href="#\" onClick={handleLogin}>Sign In</a>.</p>
  
        </ModalFooter>
      </Modal>  
      </div>
        
          </Row>
        </Container>

    </div>
  );
}
function mapStateToProps(state, ownProps) {
  return {
    users: state.userReducers,
    activeuser: state.activeUserReducers,
    loginstat: state.loginReducers,
    loginmodal: state.loginModalReducers,
    registermodal: state.registerModalReducers

  }
}
const mapDispatchToProps = {
  getUsers, getActiveUser, deleteUser, editUser, addUser,  loginStat,getLoginModal,getRegisterModal
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
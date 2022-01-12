import React, { useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { getUsers } from '../redux/actions/userActions'
import { getActiveUser } from '../redux/actions/userActions'
import { deleteUser } from '../redux/actions/userActions'
import { editUser } from '../redux/actions/userActions'
import { addUser } from '../redux/actions/userActions'
import { loginStat } from '../redux/actions/loginActions'
import { useNavigate } from "react-router-dom";
import "../Css/Login.css";
import { getRegisterModal } from '../redux/actions/registerModalActions'
import { getLoginModal } from "../redux/actions/loginModalActions";


function Login({ loginStat, activeuser, users, getUsers, getActiveUser, deleteUser, editUser, addUser, getRegisterModal, registermodal, getLoginModal, loginmodal, ...props }) {
  let history = useNavigate();
  const { toggle } = props;

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const login = () => {
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value


    users.forEach((user) => {
      if (user.Email == email && user.Password == password) {
        localStorage.setItem("loginstat", "true")
        localStorage.setItem("activeuser", JSON.stringify(user))
        getActiveUser(user)
        loginStat("true")
        history("/Profile");
        getLoginModal(!loginmodal)
      } else {
        console.log("asda")

        if (user.Password !== password) {
          if (password === "") {
            document.getElementById("passwordinvalid").innerHTML = "Please fill out this field."
          } else {
            document.getElementById("passwordinvalid").innerHTML = "Password is incorrect."
          }
          document.getElementById("password").className = "form-control is-invalid";
        }
        if (user.Email !== email) {
          if (email === "") {
            document.getElementById("emailinvalid").innerHTML = "Please fill out this field."
          } else {
            document.getElementById("emailinvalid").innerHTML = "Email is incorrect."
          }

          document.getElementById("email").className = "form-control is-invalid";
        }
      }
    }
    )
  }
  const handleRegister = () => {
    toggle1();
  };
  const toggle1 = () => {
    getLoginModal(!loginmodal)
    getRegisterModal(!registermodal);
  };

  return (
    <div>

      <Container >
        <Row>
          <div className="loginmodal"  >
            <Modal isOpen={true} toggle={toggle} centered scrollable>
              <ModalHeader className="modal-header text-center" toggle={toggle} tag="h1">  Login</ModalHeader>
              <Col className="col-12" >

                <Form noValidate>
                  <ModalBody>
                    <FormGroup>
                      <Label for="email">Email :</Label>
                      <Input className="form-control" type="email" name="email" id="email" required />
                      <div className="valid-feedback">Valid.</div>
                      <div id="emailinvalid" className="invalid-feedback">Please fill out this field.</div>
                    </FormGroup>
                    <FormGroup>
                      <Label for="password">Password :</Label>
                      <Input className="form-control" type="password" name="password" id="password" required />
                      <div className="valid-feedback">Valid.</div>
                      <div id="passwordinvalid" className="invalid-feedback">Password is incorrect.</div>
                    </FormGroup>
                    <br></br>
                    <Button className="justify-content-center" color="primary" onClick={() => login()} >Log in</Button>
                  </ModalBody>
                </Form>
              </Col>
              <ModalFooter>
                <p className="m-auto">If you don't have an account? <a href="#\" onClick={handleRegister}>Register</a>.</p>

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
    registermodal: state.registerModalReducers,
    loginmodal: state.loginModalReducers
  }
}
const mapDispatchToProps = {
  getUsers, getActiveUser, deleteUser, editUser, addUser, loginStat, getRegisterModal, getLoginModal
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

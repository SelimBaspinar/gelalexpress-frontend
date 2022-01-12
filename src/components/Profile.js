import React, { useEffect, useState, useRef } from "react";
import { Label, Input, Button, Form, FormGroup } from 'reactstrap';
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { getUsers } from '../redux/actions/userActions'
import { getActiveUser } from '../redux/actions/userActions'
import { deleteUser } from '../redux/actions/userActions'
import { editUser } from '../redux/actions/userActions'
import { addUser } from '../redux/actions/userActions'
import Image from 'react-bootstrap/Image'
import 'bootstrap'
import $ from 'jquery'
import axios from "axios";
import qs from "qs";

function Profile({ activeuser, getActiveUser, deleteUser, editUser, addUser, ...props }) {
    const gender = useRef(activeuser.Gender)

    useEffect(() => {
        if (activeuser.Gender === "Male") {
            $("#customRadio1").prop("checked", true);
            gender.current="Male"
        }
        else {
            $("#customRadio2").prop("checked", true);
            gender.current="Female"
        }
    }, [activeuser])
const ishidepassword=()=>{
    var password = document.getElementById("Password");
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}

const userinf = (e) => {
    let { id, value } = e.target
    if (id === "customRadio1") {
      gender.current ="Male"
    }else if (id === "customRadio2") {
        gender.current ="Female"
    } 
    console.log( gender.current)
  }

const updateUser =async()=>{
    let Name = document.getElementById("Name").value
    let Surname = document.getElementById("Surname").value
    let Username = document.getElementById("Username").value
    let Birthday = document.getElementById("Birthday").value
    let Password = document.getElementById("Password").value
    let Phone = parseInt(document.getElementById("Phone").value)
    let Email = document.getElementById("Email").value
    let id=0;
    const activeuser1 = {
      Name: Name,
      Surname: Surname,
      Username: Username,
      Gender:  gender.current,
      Birthday: Birthday,
      Phone: Phone,
      Email: Email,
      Password: Password,
      Role:activeuser.Role,
    }
    console.log(activeuser1)
    const {data}= await axios.put(`/api/users/${activeuser.id}/`, qs.stringify(activeuser1)).catch((err)=>console.log(err))  
console.log(data)
getActiveUser(data)
    localStorage.setItem("activeuser", JSON.stringify(data))
}

    return (
        <div>
            <Container>
                <br/>
                <Row>
                    <Col></Col>
                    <Col>
                        <h2 className="text-center">Profil Bilgileri</h2>
                    </Col>
                    <Col></Col>
                </Row>
                <br/>
                <Form noValidate>
                    <Row>
                    <Col></Col>
                        <Col>
                            <FormGroup>
                                <Label for="name" >Name</Label>
                                <Input className="form-control" type="name" name="name" id="Name"  defaultValue={activeuser.Name} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input type="username" name="username" id="Username"  defaultValue={activeuser.Username} />
                            </FormGroup>
                            <FormGroup>
                                <Label className="custom-control-inline" for="radio">Gender : </Label>
                                <div className="custom-control custom-radio custom-control-inline disabled">
                                    <Input onChange={userinf} type="radio" className="control-input" id="customRadio1" name="example1" />
                                    <Label className ="control-label" for="customCheck">Male</Label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline disabled">
                                    <Input onChange={userinf} type="radio" className="control-input" id="customRadio2" name="example1" />
                                    <Label className ="control-label" for="customCheck">Female</Label>
                                </div>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="surname">Surname</Label>
                                <Input type="surname" name="surname" id="Surname"  defaultValue={activeuser.Surname} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="Password"   defaultValue={activeuser.Password}  />
                                <Label for="ishidepassword"  style={{marginLeft:"4px"}}>Show Password</Label>
                                <Input type="checkbox" name="ishidepassword" id="ishidePassword" onClick={()=>ishidepassword()} style={{float:"left"}} required />

                            </FormGroup>
                            <FormGroup>
                                <Label for="phone" className="form-label">Phone Number</Label>
                                <Input type="phone" name="phone" id="Phone" pattern="[0-9]{10}" placeholder="Max Length is 11"  defaultValue={activeuser.Phone} />
                            </FormGroup>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="Email"  defaultValue={activeuser.Email} />
                            </FormGroup>
                            <br/>
                            <Button color="primary" onClick={()=>updateUser()}>Change</Button>
                        </Col>
                        <Col><FormGroup>
                            <Label for="birthday">Birthday</Label>
                            <Input type="date" id="Birthday" name="birthday"  defaultValue={activeuser.Birthday} />
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
        activeuser: state.activeUserReducers,
    }
}
const mapDispatchToProps = {
    getUsers, getActiveUser, deleteUser, editUser, addUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
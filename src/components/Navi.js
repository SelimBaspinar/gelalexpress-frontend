import React, { useState, useEffect,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActiveUser } from '../redux/actions/userActions'
import { loginStat } from '../redux/actions/loginActions'
import Register from './Register';
import logo from '../img/logo-icon.png'
import Login from './Login'
import { getLoginModal } from '../redux/actions/loginModalActions'
import { getRegisterModal } from '../redux/actions/registerModalActions'
import { getActiveSubCategory } from '../redux/actions/subCategoryActions'
import { getRoles } from '../redux/actions/roleAction'
import SearchBox from './searchbox'
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
import '../Css/navi.css';

function Navi({ loginstat, loginStat,activeuser, getActiveUser,getLoginModal,loginmodal,getRegisterModal,registermodal,getActiveSubCategory,
  activeSubCategories,getRoles,roles, ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  const isDashboard = useRef(false);
  const mounted = useRef();
  let history = useNavigate();

  useEffect(() => {
    if (!mounted.current) {
      getActiveUser(JSON.parse(localStorage.getItem("activeuser")));
      loginStat(localStorage.getItem("loginstat"))
      getRoles();
      mounted.current = true;
    }
  },[getActiveUser,loginStat])
  
  const handleLogin = () => {
    toggle();
  };
  
  const toggle = () => {
    getLoginModal(!loginmodal);
  };

  const togglelogin = () => {
    getLoginModal(!loginmodal)
  };

  const toggleregister = () => {
    getRegisterModal(!registermodal)
  };

  const loginstatus = () => {
    if (loginstat !== localStorage.getItem("loginstat")) { loginStat(localStorage.getItem("loginstat")) }
    if (activeuser !== JSON.parse(localStorage.getItem("activeuser"))) { getActiveUser(JSON.parse(localStorage.getItem("activeuser"))) }
  }

  const loginclick = () => {
    if (loginstat == false||loginstat ==null) {
      history("/Login")
    }
  }

  const dropdownclick = () => {
    if (loginstat == false||loginstat ==null) {
      history("/Login")
    }
  }

  const singout = () => {
    localStorage.removeItem("activeuser")
    localStorage.removeItem("loginstat")
    loginStat("false");
    history("/");
    loginstatus();
    if(loginmodal==true){
      getLoginModal(!loginmodal);
    }
    getActiveUser("");
  }

  const navlogin = () => {
    if (loginstat == false || loginstat ==null) {
      return (
        <div className="nav_login">
          <i className="fas fa-sign-in-alt" onClick={handleLogin}></i>
        </div>
      )
    } else {
      roles.map((role)=>{
        if(role.id==activeuser.Role){
          isDashboard.current=role.Dashboard;
            
        }

      })

      return ( 
        <div className="nav_login">
          <UncontrolledDropdown>
            <DropdownToggle nav>
              <i className="fas fa-user"></i>
            </DropdownToggle>
            <DropdownMenu>
              <h6 className="dropdown-header">{activeuser.Name}</h6>
              <DropdownItem divider />
              <DropdownItem onClick={()=>history("/Profile")}>Profil</DropdownItem>
              <DropdownItem onClick={()=>history("/myproduct")}>My Products</DropdownItem>
              <DropdownItem onClick={()=>history("/Message")}>Messages</DropdownItem>
              {isDashboard.current?
              <DropdownItem onClick={()=>history("/Dashboard")}>Dashboard</DropdownItem>
              :null
              }
              <DropdownItem divider />
              <DropdownItem onClick={singout}>Sign out</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  }
const gohomepage =()=>{
  let sbcategory = []
  getActiveSubCategory(sbcategory);
  history("/");
}
  return (
    <>
      <div className="nav_container">
        <div className='logo-container'>
          <img className="nav_logo" src={logo} onClick={()=>gohomepage()}  alt=""/>
        </div>
       <SearchBox></SearchBox>
        <div className="nav_left">
          {navlogin()}
          <button onClick={() => history("/addproduct")}>İlan Ver</button>
        </div>
      </div>
      {loginmodal ? (
        <Login toggle={togglelogin}/>
      ) : null}
      {registermodal ? (
        <Register toggle={toggleregister}/>
      ) : null}
    </>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    activeuser: state.activeUserReducers,
    loginstat: state.loginReducers,
    loginmodal:state.loginModalReducers,
    registermodal:state.registerModalReducers,
    activeSubCategories:state.activeSubCategoryReducers,
    roles:state.roleReducers,
  }
}
const mapDispatchToProps = {
  getActiveUser,loginStat,getLoginModal,getRegisterModal,getActiveSubCategory,getRoles
}

export default connect(mapStateToProps, mapDispatchToProps)(Navi)
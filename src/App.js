import Navi from './components/Navi';
import Home from './components/Home';
import Profile from './components/Profile';
import Message from './components/Message';
import AddProduct from './components/AddProduct';
import Product from './components/Product';
import Category from './components/Category';
import { Route, Routes,Link} from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import { Container, Row, Col } from "reactstrap";
import React from 'react';
import axios from 'axios';
import './Css/App.css';
import './Css/index.scss';
import MyProduct from './components/MyProduct';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <Navi/>
      
      <Routes >
        <Route path="/" element={<Home/>} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/Message" element={<Message/>} />
        <Route path="/addproduct" element={<AddProduct/>} />
        <Route path="/product" element={<Product/>} />
        <Route path="/myproduct" element={<MyProduct/>} />
        <Route path="/dashboard" element={<Dashboard/>} />

      </Routes>
    </div>
  );
}

export default App;
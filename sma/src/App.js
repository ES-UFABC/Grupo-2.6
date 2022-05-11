import React, { Component } from "react";
import "./App.css";
import "devextreme/dist/css/dx.greenmist.css";

import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";

import Home from "./components/home";
import Navbar from "./components/navbar";
import Cadastro from "./components/cadastro";
import Produtor from "./components/produtor";
import Consumidor from "./components/consumidor";
import Menu from "./components/menu";
import Dashboard from "./components/dashboard";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class App extends Component {
  render() {
    return (
      <div>
      <ToastContainer />
      <BrowserRouter basename="/">
        {/* <Menu/> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/cadastro" element={<Cadastro />} />
          <Route exact path="/produtor" element={<Produtor />} />
          <Route exact path="/consumidor" element={<Consumidor />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          {/* <Route exact path='/compras' element={<Compras/>} /> */}
        </Routes>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;

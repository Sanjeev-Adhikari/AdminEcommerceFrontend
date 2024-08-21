import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";


import AdminLayout from "layouts/admin";
import Login from "views/admin/login/Login";
import { Provider } from "react-redux";
import store from "store/store";
import ProtectedRoute from "ProtectedRoute";
import AuthError from "components/401Error/AuthError";

import SingleOrders from "views/admin/orders/SingleOrders";
import SingleProduct from "views/admin/products/SingleProduct";
import AddProduct from "views/admin/products/AddProduct";
import {io} from 'socket.io-client'

export const socket = io('https://ecommercebackend-w9e8.onrender.com/', {
  auth : {
    token : localStorage.getItem('token')
  }
})


const App = () => {
  return (
    <Provider store = {store} >
      <Routes>
      
      <Route path="admin/*" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>} />
     
      <Route path="/" element={<Login />} />
      <Route path="/admin/products/:id" element={<SingleProduct />} />
      <Route path="/admin/products/add" element={<AddProduct />} />
      <Route path="/admin/orders/:id" element={<SingleOrders />} />
      <Route path="/error" element={<AuthError />} />
    </Routes>
    </Provider>
  );
};

export default App;

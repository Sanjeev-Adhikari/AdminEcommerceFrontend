import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";


import AdminLayout from "layouts/admin";
import Login from "views/admin/login/Login";
import { Provider } from "react-redux";
import store from "store/store";
import ProtectedRoute from "ProtectedRoute";
import AuthError from "components/401Error/AuthError";

const App = () => {
  return (
    <Provider store = {store} >
      <Routes>
      
      <Route path="admin/*" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>} />
     
      <Route path="/" element={<Login />} />
      <Route path="/error" element={<AuthError />} />
    </Routes>
    </Provider>
  );
};

export default App;

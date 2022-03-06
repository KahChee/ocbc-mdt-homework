import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from '../common/helpers';

const PrivateRoute = ({ children }) => {
  return (getCookie('token') ? children : <Navigate to="/" />)
}

export default PrivateRoute
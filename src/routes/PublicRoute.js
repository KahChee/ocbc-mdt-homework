import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from '../common/helpers';

const PublicRoute = ({ children }) => {
  const location = useLocation()
  const authUrlList = ['/', '/login', '/register']
  return ((getCookie('token') && (authUrlList.indexOf(location.pathname) > -1)) ? <Navigate to="/dashboard" /> : children)
}

export default PublicRoute
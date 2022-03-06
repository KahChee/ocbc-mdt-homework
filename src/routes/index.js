import React from 'react';
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Login from '../features/login';
import Register from '../features/register';
import Dashboard from '../features/dashboard';
import Transfer from '../features/transfer';
import NoMatch from '../features/noMatch';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/transfer"
          element={
            <PrivateRoute>
              <Transfer />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={<NoMatch />}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
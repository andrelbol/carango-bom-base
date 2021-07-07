import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../../services/TokenService';

function PrivateRoute({ children, ...rest }) {
  const tokenService = new TokenService();

  return (
    <Route { ...rest } render={() => {
      return tokenService.getSessionToken()
        ? children
        : <Redirect to="/login?invalidSession=true" />
    }} />
  )
}

export default PrivateRoute;
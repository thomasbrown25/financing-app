import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import {
  selectIsLoadingAuth,
  selectIsAuthenticated
} from 'store/user/user.selector';

const PrivateRoutes = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoadingAuth);

  return !isLoading && isAuthenticated ? <Outlet /> : <Navigate to="sign-in" />;
};

export default PrivateRoutes;

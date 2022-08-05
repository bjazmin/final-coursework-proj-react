import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getUser, getToken } from './Common';

function PrivateRoute({ allowedRoles, children }) {
  const location = useLocation();
  return getToken() && allowedRoles?.includes(getUser().accessType) ? (
    children
  ) : getToken() ? (
    <Navigate to="/unauthorized" />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default PrivateRoute;

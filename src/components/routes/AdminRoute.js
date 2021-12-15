import { Redirect, Route } from 'react-router';

import React from 'react';
import { Routes } from '../../constants/routes';

const AdminRoute = ({ component, ...rest }) => {
  const localStorageItem = JSON.parse(localStorage.getItem('user'));
  if (localStorageItem && localStorageItem.role === 'ROLE_ADMIN') {
    return <Route {...rest} component={component} />;
  } else {
    localStorage.removeItem('user');
    return <Redirect exact to={Routes.Login} />;
  }
};

export default AdminRoute;

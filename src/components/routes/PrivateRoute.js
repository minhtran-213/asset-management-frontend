import { Redirect, Route } from 'react-router';

import React from 'react';

const PrivateRoute = ({ component, ...rest }) => {
  const localStorageItem = localStorage.getItem('user');
  if (localStorageItem) {
    return <Route {...rest} component={component} />;
  }
  return <Redirect exact to='/login' />;
};

export default PrivateRoute;

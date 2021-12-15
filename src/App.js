import './App.css';

import { HashRouter, Switch } from 'react-router-dom';

import AdminHome from './pages/AdminHome';
import AdminRoute from './components/routes/AdminRoute';
import CreateAsset from './pages/CreateAsset';
import CreateUser from './pages/CreateUser';
import EditAsset from './pages/EditAsset';
import EditUser from './pages/EditUser';
import Login from './pages/Login';
import ManageAsset from './pages/ManageAsset.js';
import ManageUser from './pages/ManageUser';
import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoute';
import { Redirect } from 'react-router';
import { Routes } from './constants/routes';
import StaffHome from './pages/StaffHome';
import { useEffect } from 'react';

const publicRoute = [
  {
    path: Routes.Login,
    name: 'Login',
    component: Login,
  },
];

const privateRoute = [
  {
    path: Routes.StaffHome,
    name: 'Staff',
    component: StaffHome,
  },
];

const adminRoute = [
  {
    path: Routes.AdminHome,
    name: 'Admin',
    component: AdminHome,
  },
  {
    path: Routes.CreateUser,
    name: 'CreateUser',
    component: CreateUser,
  },
  {
    path: Routes.ManageUser,
    name: 'ManageUser',
    component: ManageUser,
  },
  {
    path: Routes.EditUser,
    name: 'EditUser',
    component: EditUser,
  },
  {
    path: Routes.CreateAsset,
    name: 'CreateAsset',
    component: CreateAsset,
  },
  {
    path: Routes.ManageAsset,
    name: 'ManageAsset',
    component: ManageAsset,
  },
  {
    path: Routes.EditAsset,
    name: 'EditAsset',
    component: EditAsset,
  },
];

const item = JSON.parse(localStorage.getItem('user'));
function App() {
  useEffect(() => {
    document.title = 'OAM';
  }, []);
  return (
    <HashRouter>
      <Switch>
        {item && item.role === 'ROLE_ADMIN' ? (
          <Redirect exact from='/' to={Routes.AdminHome} />
        ) : (
          <Redirect exact from='/' to={Routes.StaffHome} />
        )}

        {publicRoute.map((route) => (
          <PublicRoute
            key={route.name}
            exact
            path={route.path}
            component={route.component}
          />
        ))}
        {privateRoute.map((route) => (
          <PrivateRoute
            key={route.name}
            exact
            path={route.path}
            component={route.component}
          />
        ))}
        {adminRoute.map((route) => (
          <AdminRoute
            key={route.name}
            exact
            path={route.path}
            component={route.component}
          />
        ))}
      </Switch>
    </HashRouter>
  );
}

export default App;

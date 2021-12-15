import React, { useEffect } from 'react';

import Header from '../components/Header';
import LoginForm from '../components/LoginForm';

const Login = () => {
  useEffect(() => {
    document.title = 'OAM Login';
  }, []);
  return (
    <div>
      <Header title='Online Asset Management' />
      <LoginForm />
    </div>
  );
};

export default Login;

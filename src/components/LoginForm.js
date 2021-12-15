import React, { useState } from 'react';

import { Routes } from '../constants/routes';
import axios from 'axios';
import { convertErrorCode } from '../utils/errorCodeConverter';
import { detect } from 'detect-browser';
import { useHistory } from 'react-router';
import usePasswordToggle from '../utils/hooks/usePasswordToggle';

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [PasswordInputType, PasswordIconToggle] = usePasswordToggle();
  const history = useHistory();
  const browser = detect();
  const [loginRequest, setLoginRequest] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const signInAction = () => {
    axios
      .post('/signin', loginRequest)
      .then((response) => {
        const { data } = response.data;
        localStorage.setItem('user', JSON.stringify(data));
        if (data.role === 'ROLE_USER') {
          history.push(Routes.StaffHome);
        } else if (data.role === 'ROLE_ADMIN') {
          history.push(Routes.AdminHome);
        } else {
          history.push(Routes.Notfound);
        }
      })
      .catch((error) => {
        if (error.response) {
          const { errorCode } = error.response.data;
          const message = convertErrorCode(errorCode);
          setError(message);
        }
      });
  };
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        signInAction();
      }}>
      <div style={{ width: '460px' }} className='container m-auto pt-28'>
        <div
          style={{ backgroundColor: '#EFF1F5' }}
          className='px-2 py-4 border border-black rounded-lg text-center font-bold text-primary'>
          <h1>Welcome to Online Asset Management</h1>
        </div>
        <div className='border border-black container px-5 pt-10 rounded-b-lg'>
          <div className='flex items-center justify-center'>
            <label htmlFor='username' className='pr-8'>
              Username <span className='text-red-600'>*</span>
            </label>
            <input
              onFocus={() => setPasswordVisible(false)}
              style={{ padding: '5px', paddingLeft: '1rem' }}
              className='border-2 border-black rounded-md'
              onChange={(event) => {
                setLoginRequest({
                  ...loginRequest,
                  ...{ username: event.target.value },
                });
              }}
              type='text'
              required
            />
          </div>
          <div className='flex items-center justify-center pt-3'>
            <label htmlFor='username' className='pr-9'>
              Password <span className='text-red-600'>*</span>
            </label>
            <div>
              <div className='flex items-center'>
                <input
                  maxLength={20}
                  onFocus={() => setPasswordVisible(true)}
                  style={{ padding: '5px', paddingLeft: '1rem' }}
                  className='border-2 border-black rounded-md'
                  onChange={(event) => {
                    setLoginRequest({
                      ...loginRequest,
                      ...{ password: event.target.value },
                    });
                  }}
                  type={PasswordInputType}
                  required
                />
                {browser.name !== 'edge-chromium' &&
                  passwordVisible &&
                  loginRequest.password !== '' &&
                  PasswordIconToggle}
              </div>
            </div>
          </div>
          <div className='pl-12 pt-5 text-red-500 font-medium'>
            {error ? <p>{error}</p> : ''}
          </div>
          <div>
            <div className='flex justify-end pr-16 pt-7 pb-7'>
              <button
                disabled={
                  loginRequest.username === '' || loginRequest.password === ''
                    ? true
                    : false
                }
                className={`btn ${
                  loginRequest.username === '' || loginRequest.password === ''
                    ? 'btn-disabled'
                    : 'btn-primary'
                }`}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;

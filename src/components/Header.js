import React from 'react';
import { Routes } from '../constants/routes';
import { authHeader } from '../utils/authHeader';
import axios from 'axios';
import logo from '../images/Logo_lk.png';
import { useHistory } from 'react-router';

const Header = ({ title, changePassword }) => {
  const history = useHistory();
  let username = '';
  let role = '';
  if (localStorage.getItem('user')) {
    const obj = JSON.parse(localStorage.getItem('user'));
    username = obj.username;
    role = obj.role;
  }
  const logoutAction = () => {
    axios
      .get('/user/logout', { headers: authHeader() })
      .then(() => {
        history.push(Routes.Login);
      })
      .catch((error) => {
        if (error.response) {
          console.log('error: ' + error.response.data);
        }
      });
    localStorage.removeItem('user');
  };
  return (
    <>
      <nav className='flex justify-between items-center h-16 bg-primary text-white font-primary font-bold'>
        <div
          style={{ fontSize: '20px' }}
          className='pl-16 py-5 text-primary-20 inline-flex items-center'>
          <img
            src={logo}
            alt='logo'
            style={{ width: '3rem', height: '3rem' }}
          />
          <p className='pl-6'>{title}</p>
        </div>
        {username ? (
          <div className='dropdown inline-block relative pr-10'>
            <p className='text-white text-xl font-semibold py-2 px-4 rounded inline-flex items-center'>
              <span className='mr-1'>{username}</span>
              <svg
                className='fill-current h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'>
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />{' '}
              </svg>
            </p>
            <ul className='dropdown-menu absolute hidden text-gray-700 pt-1'>
              <li className=''>
                <p
                  className='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
                  href='#'>
                  {role}
                </p>
              </li>
              <li className=''>
                <p
                  onClick={() => changePassword(true)}
                  style={{ whiteSpace: 'nowrap' }}
                  className='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block cursor-pointer'
                  href='#'>
                  Change password
                </p>
              </li>
              <li className=''>
                <p
                  onClick={() => {
                    logoutAction();
                  }}
                  className='rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer'>
                  Logout
                </p>
              </li>
            </ul>
          </div>
        ) : (
          ''
        )}
      </nav>
    </>
  );
};

export default Header;

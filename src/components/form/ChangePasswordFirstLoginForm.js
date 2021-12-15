import React, { useState } from 'react';

import { authHeader } from '../../utils/authHeader';
import axios from 'axios';
import { convertErrorCode } from '../../utils/errorCodeConverter';
import { detect } from 'detect-browser';
import { useHistory } from 'react-router';
import usePasswordToggle from '../../utils/hooks/usePasswordToggle';

const ChangePasswordFirstLoginForm = () => {
  const browser = detect();
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [NewPasswordInputType, NewPasswordIconToggle] = usePasswordToggle();
  const [ConfirmPasswordInputType, ConfirmPasswordIconToggle] =
    usePasswordToggle();
  const history = useHistory();
  const [error, setError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [changePasswordRequest, setChangePasswordRequest] = useState({
    newPassword: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');

  const changePasswordAction = () => {
    if (confirmPassword !== changePasswordRequest.newPassword) {
      setConfirmError('Not match');
    } else {
      axios
        .put('/user/password', changePasswordRequest, {
          headers: authHeader(),
        })
        .then(() => {
          const item = JSON.parse(localStorage.getItem('user'));
          localStorage.setItem(
            'user',
            JSON.stringify({ ...item, ...{ firstLogin: false } })
          );
          history.push('/');
        })
        .catch((error) => {
          if (error.response) {
            const { errorCode } = error.response.data;
            const message = convertErrorCode(errorCode);
            setError(message);
          }
        });
    }
  };

  const disabledButton =
    changePasswordRequest.newPassword === '' || confirmPassword === '';

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        changePasswordAction();
      }}
      className='fixed justify-center overflow-auto z-50 bg-black bg-opacity-10 left-0 right-0 top-0 bottom-0 '>
      <div style={{ width: '460px' }} className='container m-auto pt-28'>
        <div
          style={{ backgroundColor: '#EFF1F5' }}
          className='px-8 py-4 border border-black rounded-lg text-left font-bold text-primary'>
          <h1>Change password</h1>
        </div>
        <div
          style={{ backgroundColor: '#FAFCFC' }}
          className='border border-black container px-5 pt-5 rounded-b-lg'>
          <div className='flex items-center justify-center pb-5 pr-12'>
            <p>
              This is the first time you logged in. <br />
              You have to change your password to continue
            </p>
          </div>
          {error ? (
            <>
              <p
                style={{ whiteSpace: 'nowrap' }}
                className='text-red-500 font-semibold text-left pl-4 pb-4'>
                * {error}
              </p>
            </>
          ) : (
            ''
          )}
          <div className='flex items-center justify-center'>
            <label htmlFor='username' className='pr-16'>
              New password <span className='text-red-600'>*</span>
            </label>
            <div>
              <input
                maxLength={20}
                onFocus={() => {
                  setNewPasswordVisible(true);
                  setConfirmPasswordVisible(false);
                }}
                onChange={(event) => {
                  setChangePasswordRequest({
                    ...changePasswordRequest,
                    ...{ newPassword: event.target.value },
                  });
                }}
                style={{ padding: '5px', paddingLeft: '1rem', width: '200px' }}
                className='border-2 border-black rounded-md'
                type={NewPasswordInputType}
                required
              />
              {browser.name !== 'edge-chromium' &&
                newPasswordVisible &&
                changePasswordRequest.newPassword !== '' &&
                NewPasswordIconToggle}
            </div>
          </div>
          <div className='flex items-center justify-center pt-3'>
            <label htmlFor='username' className='pr-9'>
              Confirm password <span className='text-red-600'>*</span>
            </label>
            <div>
              <input
                maxLength={20}
                onFocus={() => {
                  setConfirmPasswordVisible(true);
                  setNewPasswordVisible(false);
                }}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
                style={{ padding: '5px', paddingLeft: '1rem', width: '200px' }}
                className='border-2 border-black rounded-md'
                type={ConfirmPasswordInputType}
                required
              />
              {browser.name !== 'edge-chromium' &&
                confirmPasswordVisible &&
                confirmPassword !== '' &&
                ConfirmPasswordIconToggle}
            </div>
          </div>
          {confirmError ? (
            <>
              <p
                style={{ whiteSpace: 'nowrap' }}
                className='text-red-500 font-semibold text-right pr-36 pt-2'>
                {confirmError}
              </p>
            </>
          ) : (
            ''
          )}
          <div>
            <div className='flex justify-end pr-5 pt-7 pb-7'>
              <button
                disabled={disabledButton ? true : false}
                className={`btn ${
                  disabledButton ? 'btn-disabled' : 'btn-primary'
                }`}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChangePasswordFirstLoginForm;

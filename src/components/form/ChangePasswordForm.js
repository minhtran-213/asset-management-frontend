import React, { useState } from 'react';

import { authHeader } from '../../utils/authHeader';
import axios from 'axios';
import { convertErrorCode } from '../../utils/errorCodeConverter';
import { convertSuccessCode } from '../../utils/successCodeConverter';
import { detect } from 'detect-browser';
import usePasswordToggle from '../../utils/hooks/usePasswordToggle';

const ChangePasswordForm = ({ changePassword }) => {
  const browser = detect();
  const [oldPassword, setOldPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [confirmedPassword, setConfirmedPassword] = useState(false);
  const [OldPasswordInputType, OldPasswordToggleIcon] = usePasswordToggle();
  const [NewPasswordInputType, NewPasswordToggleIcon] = usePasswordToggle();
  const [ConfirmPasswordInputType, ConfirmPasswordToggleIcon] =
    usePasswordToggle();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [changePasswordRequest, setChangePasswordRequest] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');

  const changePasswordAction = () => {
    if (confirmPassword !== changePasswordRequest.newPassword) {
      setConfirmError('Not match');
    } else {
      axios
        .put('/user/passwordChange', changePasswordRequest, {
          headers: authHeader(),
        })
        .then((response) => {
          const { successCode } = response.data;
          const message = convertSuccessCode(successCode);
          setSuccess(message);
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

  const handleOldPasswordToggle = () => {
    setOldPassword(true);
    setNewPassword(false);
    setConfirmedPassword(false);
  };

  const handleNewPasswordToggle = () => {
    setOldPassword(false);
    setNewPassword(true);
    setConfirmedPassword(false);
  };

  const handleConfirmedPasswordToggle = () => {
    setOldPassword(false);
    setNewPassword(false);
    setConfirmedPassword(true);
  };

  const disabledButton =
    changePasswordRequest.newPassword === '' ||
    confirmPassword === '' ||
    changePasswordRequest.oldPassword === '';
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
          {success ? (
            <p className='text-center'>{success}</p>
          ) : (
            <>
              {error ? (
                <p
                  style={{ whiteSpace: 'nowrap' }}
                  className='text-red-500 font-semibold text-left pl-4 pb-4'>
                  * {error}
                </p>
              ) : (
                ''
              )}
              <div className='flex items-center justify-center'>
                <label
                  htmlFor='username'
                  className=''
                  style={{ paddingRight: '4.5rem' }}>
                  Old password <span className='text-red-600'>*</span>
                </label>
                <div className='items-center'>
                  <input
                    maxLength={20}
                    onFocus={handleOldPasswordToggle}
                    onChange={(event) => {
                      setChangePasswordRequest({
                        ...changePasswordRequest,
                        ...{ oldPassword: event.target.value },
                      });
                    }}
                    value={changePasswordRequest.oldPassword}
                    style={{
                      padding: '5px',
                      paddingLeft: '1rem',
                      width: '200px',
                    }}
                    className='border-2 border-black rounded-md'
                    type={OldPasswordInputType}
                    required
                  />
                  {browser.name !== 'edge-chromium' &&
                  oldPassword &&
                  changePasswordRequest.oldPassword !== ''
                    ? OldPasswordToggleIcon
                    : ''}
                </div>
              </div>
              <div className='flex items-center justify-center pt-3'>
                <label htmlFor='username' className='pr-16'>
                  New password <span className='text-red-600'>*</span>
                </label>
                <div>
                  <input
                    maxLength={20}
                    onFocus={handleNewPasswordToggle}
                    onChange={(event) => {
                      setChangePasswordRequest({
                        ...changePasswordRequest,
                        ...{ newPassword: event.target.value },
                      });
                    }}
                    style={{
                      padding: '5px',
                      paddingLeft: '1rem',
                      width: '200px',
                    }}
                    className='border-2 border-black rounded-md'
                    type={NewPasswordInputType}
                    required
                  />
                  {browser.name !== 'edge-chromium' &&
                    newPassword &&
                    changePasswordRequest.newPassword !== '' &&
                    NewPasswordToggleIcon}
                </div>
              </div>
              <div className='flex items-center justify-center pt-3'>
                <label htmlFor='username' className='pr-9'>
                  Confirm password <span className='text-red-600'>*</span>
                </label>
                <div>
                  <input
                    maxLength={20}
                    onFocus={handleConfirmedPasswordToggle}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                    }}
                    style={{
                      padding: '5px',
                      paddingLeft: '1rem',
                      width: '200px',
                    }}
                    className='border-2 border-black rounded-md'
                    type={ConfirmPasswordInputType}
                    required
                  />
                  {browser.name !== 'edge-chromium' &&
                    confirmedPassword &&
                    confirmPassword !== '' &&
                    ConfirmPasswordToggleIcon}
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
            </>
          )}

          <div
            style={{ paddingLeft: '14rem' }}
            className='inline-flex justify-start items-center pt-7 pb-7'>
            {success ? (
              <div className='pl-16'>
                <button
                  onClick={() => {
                    changePassword(false);
                  }}
                  type='button'
                  className='bg-white border-black border btn'>
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className='pr-5'>
                  <button
                    disabled={disabledButton ? true : false}
                    className={`btn ${
                      disabledButton ? 'btn-disabled' : 'btn-primary'
                    }`}>
                    Save
                  </button>
                </div>
                <div className=''>
                  <button
                    onClick={() => {
                      changePassword(false);
                    }}
                    type='button'
                    className='bg-white border-black border btn'>
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChangePasswordForm;

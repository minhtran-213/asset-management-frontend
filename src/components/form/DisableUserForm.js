import React, { useState } from 'react';

import { authHeader } from '../../utils/authHeader';
import axios from 'axios';
import { convertErrorCode } from '../../utils/errorCodeConverter';
import { convertSuccessCode } from '../../utils/successCodeConverter';

const DisableUserForm = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const disableUserAction = () => {
    axios
      .put(`/user/disable/${staffCode}`, { headers: authHeader() })
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
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        disableUserAction();
      }}
      className="fixed justify-center overflow-auto z-50 bg-black bg-opacity-10 left-0 right-0 top-0 bottom-0 "
    >
      <div style={{ width: '460px' }} className="container m-auto pt-28">
        <div
          style={{ backgroundColor: '#EFF1F5' }}
          className="px-8 py-4 border border-black rounded-lg text-left font-bold text-primary"
        >
          <h1>Are you sure?</h1>
        </div>
        <div
          style={{ backgroundColor: '#FAFCFC' }}
          className="border border-black container px-5 pt-5 rounded-b-lg"
        >
          <p>Do you want to disable this user?</p>
        </div>
        <div
          style={{ backgroundColor: '#FAFCFC' }}
          className="border border-black container px-5 pt-5 rounded-b-lg"
        >
          {success ? (
            <p className="text-center">{success}</p>
          ) : (
            <>
              {error ? (
                <p
                  style={{ whiteSpace: 'nowrap' }}
                  className="text-red-500 font-semibold text-left pl-4 pb-4"
                >
                  * {error}
                </p>
              ) : (
                ''
              )}
              <div></div>
            </>
          )}
          <div
            style={{ paddingLeft: '14rem' }}
            className="inline-flex justify-start items-center pt-7 pb-7"
          >
            {success ? (
              <div className="pl-16">
                <button
                  type="button"
                  className="bg-white border-black border btn"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="pr-5">
                  <button className={'btn btn-primary'}>Disable</button>
                </div>
                <div className="">
                  <button
                    onClick={() => {
                      changePassword(false);
                    }}
                    type="button"
                    className="bg-white border-black border btn"
                  >
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

export default DisableUserForm;

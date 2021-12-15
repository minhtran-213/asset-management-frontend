import React, { useState } from 'react';

import { authHeader } from '../utils/authHeader';
import axios from 'axios';
import { convertErrorCode } from '../utils/errorCodeConverter';

const DeleteAsset = ({ handleCloseDelete, assetCode }) => {
  const [error, setError] = useState('');
  const deleteAsset = () => {
    axios
      .put(`/assets/delete/${assetCode}`, {}, { headers: authHeader() })
      .then((response) => {
        handleCloseDelete();
      })
      .catch((error) => {
        const message = convertErrorCode(error.response.data.errorCode);
        setError(message);
      });
  };
  return (
    <div className="fixed justify-center overflow-auto z-50 bg-black bg-opacity-10 left-0 right-0 top-0 bottom-0 ">
      <div style={{ width: '460px' }} className="container m-auto pt-28">
        <div
          style={{ backgroundColor: '#EFF1F5' }}
          className="px-8 py-4 border border-black rounded-lg text-left font-bold text-primary"
        >
          <div className="flex justify-between items-center">
            <h1>{error ? 'Cannot delete asset' : 'Are you sure?'}</h1>
          </div>
        </div>
        <div
          style={{ backgroundColor: '#FAFCFC' }}
          className="border border-black container px-2 pt-5 rounded-b-lg"
        >
          <div className="pl-10 pb-4 text-left">
            <div className="flex justify-between">
              <p htmlFor="username" className="whitespace-nowrap">
                {error ? error : 'Do you want to delete this asset?'}
              </p>
            </div>
            {!error && (
              <div className="pt-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={deleteAsset}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn border border-black ml-4"
                  onClick={handleCloseDelete}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAsset;

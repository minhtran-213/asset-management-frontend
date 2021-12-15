import React, { useState } from 'react';

import { Routes } from '../../constants/routes';
import { authHeader } from '../../utils/authHeader';
import axios from 'axios';
import { convertErrorCode } from '../../utils/errorCodeConverter';
import { convertLocationFromId } from '../../utils/locationConverter';
import locations from '../../utils/location.json';
import moment from 'moment';
import { useHistory } from 'react-router';

const CreateNewUserForm = () => {
  const item = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();
  const { idLocation } = item;
  const adminLocation = convertLocationFromId(idLocation);
  const [createUserRequest, setCreateUserRequest] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'Female',
    joinedDate: '',
    role: 'ROLE_USER',
    location: idLocation,
  });

  const isDisabled =
    createUserRequest.firstName === '' ||
    createUserRequest.lastName === '' ||
    createUserRequest.gender === '' ||
    createUserRequest.joinedDate === '' ||
    createUserRequest.role === '' ||
    createUserRequest.dateOfBirth === '';
  const [error, setError] = useState('');
  const role = [
    {
      actualValue: 'ROLE_USER',
      showValue: 'Staff',
    },
    {
      actualValue: 'ROLE_ADMIN',
      showValue: 'Admin',
    },
  ];
  const handleRequest = () => {
    axios
      .post('/user/save', createUserRequest, {
        headers: authHeader(),
      })
      .then((response) => {
        history.push(Routes.ManageUser);
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
    <div className='pt-28'>
      <div>
        <p className='font-bold text-primary pl-4'>Create New User</p>
      </div>
      <div>
        {error && (
          <p className='font-semibold text-red-500 pl-4 pt-4 text-left whitespace-nowrap'>
            * {error}
          </p>
        )}
      </div>
      <div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleRequest();
          }}>
          <div className='pt-4'>
            <div className='flex pr-9 items-center'>
              <label className='pr-11' htmlFor='firstName'>
                First name
              </label>
              <input
                maxLength={30}
                style={{ width: '60%' }}
                type='text'
                className='border border-black rounded-md h-8 pl-2'
                onChange={(event) => {
                  setCreateUserRequest({
                    ...createUserRequest,
                    ...{ firstName: event.target.value },
                  });
                }}
              />
            </div>
            <div className='flex pr-9 items-center pt-3'>
              <label className='pr-9' htmlFor='firstName'>
                Last name
              </label>
              <input
                maxLength={30}
                style={{ width: '60%' }}
                type='text'
                className='border border-black rounded-md h-8 ml-2 pl-2'
                onChange={(event) => {
                  setCreateUserRequest({
                    ...createUserRequest,
                    ...{ lastName: event.target.value },
                  });
                }}
              />
            </div>
            <div className='flex pr-9 items-center pt-3'>
              <label className='pr-5' htmlFor='firstName'>
                Date of Birth
              </label>
              <input
                style={{ width: '60%' }}
                type='date'
                className='border border-black rounded-md h-8 ml-2 pl-2'
                onChange={(event) => {
                  const date = moment(event.target.value).format(
                    'yyyy-MM-DD HH:mm'
                  );
                  setCreateUserRequest({
                    ...createUserRequest,
                    ...{ dateOfBirth: date },
                  });
                }}
              />
            </div>
            <div className='flex pr-9 items-center pt-3'>
              <label className='pr-5' htmlFor='firstName'>
                Gender
              </label>
              <label className='inline-flex items-center pl-11'>
                <input
                  type='radio'
                  value='Female'
                  className='border border-black rounded-md h-8'
                  checked={createUserRequest.gender === 'Female'}
                  onChange={(event) =>
                    setCreateUserRequest({
                      ...createUserRequest,
                      ...{ gender: event.target.value },
                    })
                  }
                />
                <span className='ml-2'>Female</span>
              </label>
              <label className='inline-flex items-center'>
                <input
                  type='radio'
                  value='Male'
                  className='border border-black rounded-md h-8 ml-6 pl-2'
                  checked={createUserRequest.gender === 'Male'}
                  onChange={(event) =>
                    setCreateUserRequest({
                      ...createUserRequest,
                      ...{ gender: event.target.value },
                    })
                  }
                />
                <span className='ml-2'>Male</span>
              </label>
            </div>
            <div className='flex pr-9 items-center pt-3'>
              <label className='pr-5' htmlFor='firstName'>
                Joined Date
              </label>
              <input
                style={{ width: '60%' }}
                type='date'
                min={new Date()}
                className='border border-black rounded-md h-8 ml-4'
                onChange={(event) => {
                  const date = moment(event.target.value).format(
                    'yyyy-MM-DD HH:mm'
                  );
                  setCreateUserRequest({
                    ...createUserRequest,
                    ...{ joinedDate: date },
                  });
                }}
              />
            </div>
            <div className='flex pr-9 items-center pt-3'>
              <label className='pr-5' htmlFor='firstName'>
                Type
              </label>
              <select
                defaultValue='ROLE_USER'
                onChange={(event) =>
                  setCreateUserRequest({
                    ...createUserRequest,
                    ...{ role: event.target.value },
                  })
                }
                style={{ width: '60%' }}
                className='border border-black rounded-md h-8 ml-16'>
                {role.map((r) => (
                  <option key={r.actualValue} value={r.actualValue}>
                    {r.showValue}
                  </option>
                ))}
              </select>
            </div>
            {createUserRequest.role === 'ROLE_ADMIN' ? (
              <div className='flex pr-9 items-center pt-3'>
                <label className='' htmlFor='firstName'>
                  Location
                </label>
                <select
                  onChange={(event) =>
                    setCreateUserRequest({
                      ...createUserRequest,
                      ...{ location: event.target.value },
                    })
                  }
                  style={{ width: '60%' }}
                  className='border border-black rounded-md h-8 ml-14'>
                  {locations.map((l) => (
                    <option key={l.locationid} value={l.locationid}>
                      {l.address}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className='flex pr-9 items-center pt-3'>
                <label className='pr-12' htmlFor='firstName'>
                  Location
                </label>
                <input
                  style={{ width: '60%' }}
                  readOnly
                  type='text'
                  className='border border-black rounded-md h-8 ml-2 pl-2'
                  value={adminLocation}
                />
              </div>
            )}
            <div className='flex justify-end pt-4 pr-12'>
              <button
                disabled={isDisabled}
                type='submit'
                className={`btn ${
                  isDisabled ? 'btn-disabled' : 'btn-primary'
                }`}>
                Save
              </button>
              <button
                onClick={() => history.push(Routes.ManageUser)}
                type='button'
                className='btn border border-black rounded-md ml-4'>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewUserForm;

import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import { Routes } from '../../constants/routes';
import { authHeader } from '../../utils/authHeader';
import axios from 'axios';
import { convertErrorCode } from '../../utils/errorCodeConverter';
import locations from '../../utils/location.json';
import moment from 'moment';

const EditUserForm = () => {
  const { staffCode } = useParams();

  const item = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();
  const { idLocation } = item;

  const [initData, setInitData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'Female',
    joinedDate: '',
    role: 'ROLE_USER',
    location: idLocation,
  });

  const [editUserRequest, setEditUserRequest] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'Female',
    joinedDate: '',
    role: 'ROLE_USER',
    location: idLocation,
  });

  const isDisabled =
    editUserRequest.firstName === '' ||
    editUserRequest.lastName === '' ||
    editUserRequest.gender === '' ||
    editUserRequest.joinedDate === '' ||
    editUserRequest.role === '' ||
    editUserRequest.dateOfBirth === '';

  const isTheSame =
    editUserRequest.firstName === initData.firstName &&
    editUserRequest.lastName === initData.lastName &&
    editUserRequest.gender === initData.gender &&
    editUserRequest.joinedDate === initData.joinedDate &&
    editUserRequest.role === initData.role &&
    editUserRequest.dateOfBirth === initData.dateOfBirth;

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

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get(`/user/${staffCode}`, {
        headers: authHeader(),
      });
      const { data } = response.data;
      setInitData({
        ...initData,
        ...{
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth.slice(0, 10),
          gender: data.gender,
          joinedDate: data.joinedDate.slice(0, 10),
          role: data.role,
        },
      });
      setEditUserRequest({
        ...editUserRequest,
        ...{
          firstName: response.data.data.firstName,
          lastName: response.data.data.lastName,
          dateOfBirth: response.data.data.dateOfBirth.slice(0, 10),
          gender: response.data.data.gender,
          joinedDate: response.data.data.joinedDate.slice(0, 10),
          role: response.data.data.role,
        },
      });
    };
    fetchUserData();
  }, [staffCode, editUserRequest, initData]);

  const handleRequest = () => {
    const data = {
      dateOfBirth: moment(editUserRequest.dateOfBirth).format(
        'yyyy-MM-DD HH:mm'
      ),
      gender: editUserRequest.gender,
      joinedDate: moment(editUserRequest.joinedDate).format('yyyy-MM-DD HH:mm'),
      role: editUserRequest.role,
      location: editUserRequest.location,
    };
    axios
      .put(`/user/edit/${staffCode}`, data, { headers: authHeader() })
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
        <p className='font-bold text-primary pl-4'>Edit User</p>
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
                style={{ width: '60%' }}
                type='text'
                className='border border-black rounded-md h-8 pl-2'
                value={editUserRequest.firstName}
                onChange={(event) => {
                  setEditUserRequest({
                    ...editUserRequest,
                    ...{ firstName: event.target.value },
                  });
                }}
                disabled
              />
            </div>
            <div className='flex pr-9 items-center pt-3'>
              <label className='pr-9' htmlFor='firstName'>
                Last name
              </label>
              <input
                style={{ width: '60%' }}
                type='text'
                className='border border-black rounded-md h-8 ml-2 pl-2'
                value={editUserRequest.lastName}
                onChange={(event) => {
                  setEditUserRequest({
                    ...editUserRequest,
                    ...{ lastName: event.target.value },
                  });
                }}
                disabled
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
                value={editUserRequest.dateOfBirth}
                onChange={(event) => {
                  const date = moment(event.target.value).format('yyyy-MM-DD');
                  setEditUserRequest({
                    ...editUserRequest,
                    ...{ dateOfBirth: date },
                  });
                }}
              />
            </div>
            <div className='flex pr-9 items-center pt-3'>
              <label className='pr-5' htmlFor='firstName'>
                Gender
              </label>
              <label className='inline-flex items-center pl-9'>
                <input
                  type='radio'
                  value='Female'
                  className='border border-black rounded-md h-8 ml-2'
                  checked={editUserRequest.gender === 'Female'}
                  onChange={(event) =>
                    setEditUserRequest({
                      ...editUserRequest,
                      ...{ gender: event.target.value },
                    })
                  }
                />
                Female
              </label>
              <label className='inline-flex items-center'>
                <input
                  type='radio'
                  value='Male'
                  className='border border-black rounded-md h-8 ml-6 pl-2'
                  checked={editUserRequest.gender === 'Male'}
                  onChange={(event) =>
                    setEditUserRequest({
                      ...editUserRequest,
                      ...{ gender: event.target.value },
                    })
                  }
                />
                Male
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
                value={editUserRequest.joinedDate}
                onChange={(event) => {
                  const date = moment(event.target.value).format('yyyy-MM-DD');
                  setEditUserRequest({
                    ...editUserRequest,
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
                value={editUserRequest.role}
                defaultValue='ROLE_USER'
                onChange={(event) =>
                  setEditUserRequest({
                    ...editUserRequest,
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
            {editUserRequest.role === 'ROLE_ADMIN' && (
              <div className='flex pr-9 items-center pt-3'>
                <label className='' htmlFor='firstName'>
                  Location
                </label>
                <select
                  onChange={(event) =>
                    setEditUserRequest({
                      ...editUserRequest,
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
            )}
            <div className='flex justify-end pt-4 pr-12'>
              <button
                disabled={isDisabled || isTheSame}
                type='submit'
                className={`btn ${
                  isDisabled || isTheSame ? 'btn-disabled' : 'btn-primary'
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

export default EditUserForm;

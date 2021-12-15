import { AiOutlineCloseSquare } from 'react-icons/ai';
import React from 'react';

const UserInformationModal = ({ user, handleCloseInfo }) => {
  const {
    staffCode,
    fullName,
    username,
    joinedDate,
    dateOfBirth,
    location,
    gender,
    type,
  } = user;
  return (
    <div className='fixed justify-center overflow-auto z-50 bg-black bg-opacity-10 left-0 right-0 top-0 bottom-0 '>
      <div style={{ width: '460px' }} className='container m-auto pt-28'>
        <div
          style={{ backgroundColor: '#EFF1F5' }}
          className='px-8 py-4 border border-black rounded-lg text-left font-bold text-primary'>
          <div className='flex justify-between items-center'>
            <h1>Detailed User Information</h1>
            <AiOutlineCloseSquare
              className='cursor-pointer'
              onClick={handleCloseInfo}
            />
          </div>
        </div>
        <div
          style={{ backgroundColor: '#FAFCFC' }}
          className='border border-black container px-3 pt-5 rounded-b-lg'>
          <div className='pr-40 pl-16 pb-4 text-left'>
            <div className='flex justify-between'>
              <label htmlFor='username' className='w-5 whitespace-nowrap'>
                Staff Code
              </label>
              <div>
                <p className='w-11'>{staffCode}</p>
              </div>
            </div>
            <div className='flex justify-between'>
              <label htmlFor='username' className='w-5 whitespace-nowrap'>
                Full Name
              </label>
              <div>
                <p className='w-11 whitespace-nowrap'>{fullName}</p>
              </div>
            </div>
            <div className='flex justify-between'>
              <label htmlFor='username' className='w-5 whitespace-nowrap'>
                Username
              </label>
              <div>
                <p className='w-11 whitespace-nowrap'>{username}</p>
              </div>
            </div>
            <div className='flex justify-between'>
              <label htmlFor='username' className='w-5 whitespace-nowrap'>
                Date of Birth
              </label>
              <div>
                <p className='w-11 whitespace-nowrap'>{dateOfBirth}</p>
              </div>
            </div>
            <div className='flex justify-between'>
              <label htmlFor='username' className='w-5 whitespace-nowrap'>
                Gender
              </label>
              <div>
                <p className='w-11 whitespace-nowrap'>{gender}</p>
              </div>
            </div>
            <div className='flex justify-between'>
              <label htmlFor='username' className='w-5 whitespace-nowrap'>
                Joined Date
              </label>
              <div>
                <p className='w-11 whitespace-nowrap'>{joinedDate}</p>
              </div>
            </div>
            <div className='flex justify-between'>
              <label htmlFor='username' className='w-5 whitespace-nowrap'>
                Type
              </label>
              <div>
                <p className='w-11 whitespace-nowrap'>{type}</p>
              </div>
            </div>
            <div className='flex justify-between'>
              <label htmlFor='username' className='w-5 whitespace-nowrap'>
                Location
              </label>
              <div>
                <p className='w-11 whitespace-nowrap'>{location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInformationModal;

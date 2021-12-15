import React, { useState } from 'react';
import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Routes } from '../constants/routes';
import { useHistory } from 'react-router';

const ManageUserHeader = ({ handleSearchString, handleFilter }) => {
  const [searchRequest, setSearchRequest] = useState('');
  const [filter, setFilter] = useState('Type');
  const type = [
    { id: 'all', name: 'All' },
    { id: '1001', name: 'Staff' },
    { id: '1002', name: 'Admin' },
  ];
  const history = useHistory();
  return (
    <div className='inline-flex pt-4 pl-4'>
      <div className='dropdown inline-block relative'>
        <div className='flex items-center'>
          <input
            disabled
            readOnly
            type='text'
            value={filter}
            className='border border-gray-400 rounded-md w-32 pl-2 h-8 text-left'
          />
          <FontAwesomeIcon
            style={{
              width: '30px',
              height: '2rem',
              marginLeft: '-30px',
            }}
            icon={faFilter}
            className='border-l border-gray-400 py-2 cursor-pointer'
          />
        </div>
        <ul className='dropdown-menu absolute hidden text-gray-700'>
          {type.map((t) => (
            <li key={t.id} className='w-32'>
              <p
                onClick={() => {
                  handleFilter(t);
                  setFilter(t.name);
                }}
                className='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer'
                href='#'>
                {t.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex items-center'>
        <input
          onChange={(event) =>
            setSearchRequest('staffCode:' + event.target.value)
          }
          type='text'
          className='border border-gray-400 rounded-md h-8 ml-28 pl-2'
        />
        <FontAwesomeIcon
          style={{
            width: '30px',
            height: '2rem',
            marginLeft: '-30px',
          }}
          icon={faSearch}
          onClick={() => handleSearchString(searchRequest)}
          className='border-l border-gray-400 py-2 cursor-pointer'
        />
      </div>
      <div>
        <button
          onClick={() => history.push(Routes.CreateUser)}
          className='btn btn-primary whitespace-nowrap ml-4'>
          Create new user
        </button>
      </div>
    </div>
  );
};

export default ManageUserHeader;

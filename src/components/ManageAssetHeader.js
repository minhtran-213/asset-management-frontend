import React, { useState } from 'react';
import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Routes } from '../constants/routes';
import { authHeader } from '../utils/authHeader';
import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

const ManageAssetHeader = ({
  handleSearchString,
  handleFilterState,
  handleFilterCategory,
}) => {
  const [searchRequest, setSearchRequest] = useState('');
  const [status, setStatus] = useState('State');
  const [category, setCategory] = useState('Category');
  const statusList = [
    { id: 'all', name: 'All' },
    { id: '1', name: 'Available' },
    { id: '2', name: 'Not Available' },
  ];
  const [categoryList, setCategoryList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = () => {
      axios
        .get('/categories', { headers: authHeader() })
        .then((response) => {
          setCategoryList(response.data.data);
        })
        .catch((error) => {
          return;
        });
    };
    return fetchData();
  }, []);
  return (
    <div className='inline-flex pt-4 pl-4'>
      <div className='dropdown inline-block relative'>
        <div className='flex items-center'>
          <input
            disabled
            readOnly
            type='text'
            value={status}
            className='border border-gray-400 rounded-md w-36 pl-2 h-8 text-left'
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
          {statusList.map((t) => (
            <li key={t.id} className='w-36'>
              <p
                onClick={() => {
                  handleFilterState(t.id);
                  setStatus(t.name);
                }}
                className='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer'
                href='#'>
                {t.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className='dropdown inline-block relative pl-7'>
        <div className='flex items-center'>
          <input
            disabled
            readOnly
            type='text'
            value={category}
            className='border border-gray-400 rounded-md w-36 pl-2 h-8 text-left'
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
          <li className='w-36'>
            <p
              onClick={() => {
                handleFilterCategory('All');
                setCategory('All');
              }}
              className='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer'
              href='#'>
              All
            </p>
          </li>
          {categoryList.map((t) => (
            <li key={t.categoryCode} className='w-36'>
              <p
                onClick={() => {
                  handleFilterCategory(t.categoryCode);
                  setCategory(t.categoryName);
                }}
                className='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer'
                href='#'>
                {t.categoryName}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex items-center'>
        <input
          onChange={(event) =>
            setSearchRequest('assetCode:' + event.target.value)
          }
          type='text'
          className='border border-gray-400 rounded-md h-8 ml-20 pl-2'
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
          onClick={() => history.push(Routes.CreateAsset)}
          className='btn btn-primary whitespace-nowrap ml-4'>
          Create New Asset
        </button>
      </div>
    </div>
  );
};

export default ManageAssetHeader;

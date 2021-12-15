import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import React, { useEffect, useState } from 'react';

import { HiOutlineSelector } from 'react-icons/hi';
import { Popover } from '@headlessui/react';
import { Routes } from '../../constants/routes';
import { authHeader } from '../../utils/authHeader';
import axios from 'axios';
import { convertErrorCode } from '../../utils/errorCodeConverter';
import moment from 'moment';
import { useHistory } from 'react-router';

const CreateAssetForm = () => {
  const history = useHistory();
  const [categoryList, setCategoryList] = useState([]);
  const [newCategoryStatus, setNewCategoryStatus] = useState(false);
  const [assetRequest, setAssetRequest] = useState({
    assetName: '',
    state: '',
    installDate: '',
    specification: '',
    categoryCode: '',
  });
  const [categoryRequest, setCategoryRequest] = useState({
    categoryCode: '',
    categoryName: '',
  });
  const [error, setError] = useState('');
  const [selected, setSelected] = useState('Category');
  const getFirstCharacter = (str) => {
    let array = [];
    let result = '';
    const words = str.split(' ').length;
    if (words > 1) {
      array = str.match(/(?:\s|^)(\S)/g);
      array.map((a) => (result += a));
      result = result.replace(/\s/g, '').toUpperCase();
    } else {
      result = str.substring(0, 2).toUpperCase();
    }
    return result;
  };
  const disabled =
    assetRequest.categoryCode === '' ||
    assetRequest.installDate === '' ||
    assetRequest.assetName === '' ||
    assetRequest.specification === '' ||
    assetRequest.state === '';
  useEffect(() => {
    axios
      .get('/categories', { headers: authHeader() })
      .then((response) => {
        setCategoryList(response.data.data);
      })
      .catch((error) => {
        if (error.response) {
          return;
        }
      });
  }, []);

  const handleSubmitCategory = () => {
    axios
      .post('/categories', categoryRequest, { headers: authHeader() })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        const { errorCode } = error.response.data;
        const message = convertErrorCode(errorCode);
        setError(message);
      });
  };
  const handleSubmitAsset = () => {
    axios
      .post('/assets', assetRequest, { headers: authHeader() })
      .then(() => {
        history.push(Routes.ManageAsset);
      })
      .catch((error) => {
        const { errorCode } = error.response.data;
        const message = convertErrorCode(errorCode);
        setError(message);
      });
  };
  return (
    <div className='pt-28'>
      <div>
        <p className='font-bold text-primary pl-4'>Create New Asset</p>
        {error && <p className='text-red-500 pl-4 pt-2'>* {error}</p>}
      </div>
      <div className='w-auto pt-4 pl-4'>
        <div className='grid overflow-hidden grid-cols-3 grid-rows-none gap-5 pr-14 md:pr-16'>
          <div className='flex items-center'>
            <label htmlFor='name'>Name</label>
          </div>
          <div className='col-span-2'>
            <div>
              <input
                onChange={(event) =>
                  setAssetRequest({
                    ...assetRequest,
                    ...{ assetName: event.target.value },
                  })
                }
                type='text'
                className='border border-black rounded-md h-10 w-60 pl-2'
              />
            </div>
          </div>
          <div className='flex items-center'>
            <label htmlFor='category'>Category</label>
          </div>
          <div className='box col-span-2'>
            <Popover>
              <Popover.Button className='border border-black w-60 h-10 text-left pl-2 rounded-md'>
                {selected}
              </Popover.Button>

              <Popover.Panel className='bg-gray-200 w-60 border border-black '>
                {({ close }) => {
                  return [
                    categoryList.map((cate) => (
                      <p
                        key={cate.categoryCode}
                        onClick={() => {
                          setAssetRequest({
                            ...assetRequest,
                            ...{ categoryCode: cate.categoryCode },
                          });
                          setSelected(cate.categoryName);
                          close();
                        }}
                        className='py-2 pl-2 cursor-pointer'>
                        {cate.categoryName}
                      </p>
                    )),
                    <div
                      key={categoryList[0].categoryCode + 'ABC'}
                      className='py-2 pl-2 border-t border-black'>
                      {!newCategoryStatus ? (
                        <p
                          style={{ fontSize: '1rem' }}
                          onClick={() => setNewCategoryStatus(true)}
                          className='text-primary cursor-pointer italic underline'>
                          Add new category
                        </p>
                      ) : (
                        <div
                          key={categoryList[0].categoryCode + 'DBC'}
                          className='inline-flex items-center'>
                          <input
                            onBlur={() => {
                              const categoryCode = getFirstCharacter(
                                categoryRequest.categoryName
                              );
                              setCategoryRequest({
                                ...categoryRequest,
                                ...{ categoryCode: categoryCode },
                              });
                            }}
                            style={{ fontSize: '0.8rem' }}
                            onChange={(event) => {
                              setCategoryRequest({
                                ...categoryRequest,
                                ...{ categoryName: event.target.value },
                              });
                            }}
                            type='text'
                            className='border border-black w-32 pl-2 py-1'
                          />
                          <input
                            value={categoryRequest.categoryCode}
                            style={{ fontSize: '0.8rem' }}
                            type='text'
                            onChange={(event) =>
                              setCategoryRequest({
                                ...categoryRequest,
                                ...{ categoryCode: event.target.value },
                              })
                            }
                            className='border border-black w-10 pl-2 py-1'
                          />
                          <AiOutlineCheck
                            onClick={handleSubmitCategory}
                            className='ml-2 text-primary cursor-pointer'
                          />
                          <AiOutlineClose
                            className='ml-2 cursor-pointer'
                            onClick={() => setNewCategoryStatus(false)}
                          />
                        </div>
                      )}
                    </div>,
                  ];
                }}
              </Popover.Panel>
            </Popover>
          </div>
          <div className='box'>
            <label htmlFor='specification'>Specification</label>
          </div>
          <div className='box col-span-2'>
            <textarea
              onChange={(event) =>
                setAssetRequest({
                  ...assetRequest,
                  ...{ specification: event.target.value },
                })
              }
              name='specification'
              className='border border-black rounded-md resize-none w-60 h-28 pl-2 pt-1'></textarea>
          </div>
          <div className='flex items-center whitespace-nowrap'>
            Installed Date
          </div>
          <div className='box col-span-2'>
            <input
              onChange={(event) => {
                const date = moment(event.target.value).format(
                  'yyyy-MM-DD HH:mm'
                );
                setAssetRequest({ ...assetRequest, ...{ installDate: date } });
              }}
              type='date'
              className='border border-black rounded-md h-10 w-60 pl-2'
            />
          </div>
          <div className=''>State</div>
          <div className='box col-span-2'>
            <div>
              <input
                type='radio'
                value='1'
                onChange={(event) =>
                  setAssetRequest({
                    ...assetRequest,
                    ...{ state: event.target.value },
                  })
                }
              />
              <label className='pl-2'>Available</label>
            </div>
            <div>
              <input
                type='radio'
                value='2'
                onChange={(event) =>
                  setAssetRequest({
                    ...assetRequest,
                    ...{ state: event.target.value },
                  })
                }
              />
              <label className='pl-2'>Not available</label>
            </div>
          </div>
          <div className=' col-span-3 inline-flex justify-end'>
            <button
              disabled={disabled}
              onClick={handleSubmitAsset}
              className={`btn ${disabled ? 'btn-disabled' : 'btn-primary'}`}>
              Save
            </button>
            <button
              onClick={() => history.push(Routes.ManageAsset)}
              className='btn border border-black rounded-md ml-4 '>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAssetForm;

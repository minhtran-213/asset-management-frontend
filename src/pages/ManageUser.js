import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

import ChangePasswordForm from '../components/form/ChangePasswordForm';
import DisabledUser from '../components/DisabledUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../components/Header';
import ManageUserHeader from '../components/ManageUserHeader';
import PageTitle from '../components/PageTitle';
import Pagination from '../components/Pagination';
import { Routes } from '../constants/routes';
import Sidebar from '../components/Sidebar';
import Table from '../components/Table Component/Table';
import { TiDeleteOutline } from 'react-icons/ti';
import UserInformationModal from '../components/UserInformationModal';
import { authHeader } from '../utils/authHeader';
import axios from 'axios';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const ManageUser = () => {
  const item = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();
  const history = useHistory();
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [elements, setElements] = useState([]);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState('staffCode');
  const [search, setSearch] = useState(`location:${item.idLocation}`);
  const [totalPages, setTotalPages] = useState(0);
  const [openInfo, setOpenInfo] = useState(false);
  const [user, setUser] = useState();
  const [openDisabled, setOpenDisabled] = useState(false);
  const [staffCode, setStaffCode] = useState('');

  useEffect(() => {
    document.title = 'Manage User';
    const getData = () => {
      axios
        .get(`/user?page=${page}&size=3&sort=${sort}&search=${search}`, {
          headers: authHeader(),
        })
        .then((response) => {
          const { data } = response.data;
          setElements(data.data);
          setTotalPages(data.totalPages);
        })
        .catch((error) => {
          return;
        });
    };
    return getData();
  }, [page, search, sort, item.idLocation]);
  const headers = [
    { id: 'staffCode', name: 'Staff Code' },
    { id: 'firstName', name: 'Full Name' },
    { id: 'username', name: 'Username' },
    { id: 'joinedDate', name: 'Joined Date' },
    { id: 'role', name: 'Type' },
  ];
  const handlePaging = (page) => {
    setPage(page);
  };

  const handleSort = (sortString) => {
    setSort(sortString);
  };

  const handleSearchBox = (searchString) => {
    const searchText = `location:${item.idLocation}` + ',' + searchString;
    setSearch(searchText);
  };
  const handleFilter = (filterString) => {
    if (filterString.id === 'all') {
      setSearch(`location:${item.idLocation}`);
    } else {
      const searchText =
        `location:${item.idLocation}` + ',' + `role:${filterString.id}`;
      setSearch(searchText);
    }
  };

  const handleEdit = (staffCode) => {
    history.push(Routes.ManageUser + `/edit/${staffCode}`);
  };

  const handleDisable = (staffCode) => {
    setStaffCode(staffCode);
    setOpenDisabled(true);
  };

  const icons = [
    {
      id: 1,
      component: (
        <FontAwesomeIcon
          key={0}
          icon={faPencilAlt}
          className='cursor-pointer'
        />
      ),
      action: handleEdit,
    },
    {
      id: 1,
      component: (
        <TiDeleteOutline
          key={1}
          size='1.5rem'
          className='cursor-pointer'
          color='red'
        />
      ),
      action: handleDisable,
    },
  ];
  const handleOpenInfo = (staffCode) => {
    axios
      .get(`/user/detail/${staffCode}`, { headers: authHeader() })
      .then((response) => {
        const { data } = response.data;
        setUser(data);
        setOpenInfo(true);
      })
      .catch((error) => console.log(error.response));
  };
  return (
    <div>
      <Header
        title='Manage User'
        changePassword={(isOpen) => setOpenChangePassword(isOpen)}
      />
      {openChangePassword ? (
        <ChangePasswordForm
          changePassword={(isOpen) => setOpenChangePassword(isOpen)}
        />
      ) : (
        ''
      )}
      <div className='grid xl:grid-cols-4 sm:grid-cols-2'>
        <div>
          <Sidebar location={location.pathname} />
        </div>
        <div className='col-span-2 sm:col-span-1 pl-24'>
          <PageTitle title='User list' />
          <ManageUserHeader
            handleSearchString={handleSearchBox}
            handleFilter={handleFilter}
          />
          <Table
            headers={headers}
            elements={elements}
            icons={icons}
            handleOnClick={handleSort}
            handleOpenInfo={handleOpenInfo}
          />
          <div
            className='flex justify-end w-screen'
            style={{ paddingRight: '55rem' }}>
            <Pagination
              totalPage={totalPages}
              currentPage={page}
              handlePage={handlePaging}
            />
          </div>
          {openInfo && (
            <UserInformationModal
              user={user}
              handleCloseInfo={() => setOpenInfo(false)}
            />
          )}
          {openDisabled && (
            <DisabledUser
              staffCode={staffCode}
              handleCloseDisable={() => setOpenDisabled(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUser;

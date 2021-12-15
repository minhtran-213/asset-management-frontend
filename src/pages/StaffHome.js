import React, { useEffect } from 'react';

import ChangePasswordFirstLoginForm from '../components/form/ChangePasswordFirstLoginForm';
import ChangePasswordForm from '../components/form/ChangePasswordForm';
import Header from '../components/Header';
import PageTitle from '../components/PageTitle';
import Sidebar from '../components/Sidebar';
import Table from '../components/Table Component/Table';
import { useLocation } from 'react-router';
import { useState } from 'react';

const StaffHome = () => {
  const location = useLocation();
  const item = JSON.parse(localStorage.getItem('user'));
  const { firstLogin } = item;
  const [openChangePassword, setOpenChangePassword] = useState(false);

  useEffect(() => {
    document.title = 'Home';
  }, []);
  const headers = [
    'Asset Code',
    'Asset Name',
    'Category',
    'Assigned Date',
    'State',
  ];
  return (
    <div>
      <Header
        title='Home'
        changePassword={(isOpen) => setOpenChangePassword(isOpen)}
      />
      {firstLogin ? <ChangePasswordFirstLoginForm /> : ''}
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
          <PageTitle title='Asset Management' />
          <Table headers={headers} />
        </div>
      </div>
    </div>
  );
};

export default StaffHome;

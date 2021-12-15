import React, { useState } from 'react';

import ChangePasswordForm from '../components/form/ChangePasswordForm';
import CreateNewUserForm from '../components/form/CreateNewUserForm';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useLocation } from 'react-router';

const CreateUser = () => {
  const location = useLocation();
  const [openChangePassword, setOpenChangePassword] = useState(false);

  return (
    <div>
      <Header
        title='Manage User > Create New User'
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
          <CreateNewUserForm />
        </div>
      </div>
    </div>
  );
};

export default CreateUser;

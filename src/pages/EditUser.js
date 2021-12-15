import React, { useState } from 'react';

import ChangePasswordForm from '../components/form/ChangePasswordForm';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useLocation } from 'react-router';
import EditUserForm from '../components/form/EditUserForm';

const EditUser = () => {
  const location = useLocation();
  const [openChangePassword, setOpenChangePassword] = useState(false);
  return (
    <div>
      <Header
        title="Home"
        changePassword={(isOpen) => setOpenChangePassword(isOpen)}
      />
      {openChangePassword ? (
        <ChangePasswordForm
          changePassword={(isOpen) => setOpenChangePassword(isOpen)}
        />
      ) : (
        ''
      )}
      <div className="grid xl:grid-cols-4 sm:grid-cols-2">
        <div>
          <Sidebar location={location.pathname} />
        </div>
        <div className="col-span-2 sm:col-span-1 pl-24">
          <EditUserForm />
        </div>
      </div>
    </div>
  );
};

export default EditUser;

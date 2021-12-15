import React, { useEffect, useState } from 'react';

import ChangePasswordForm from '../components/form/ChangePasswordForm';
import CreateAssetForm from '../components/form/CreateAssetForm';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useLocation } from 'react-router';

const CreateAsset = () => {
  const location = useLocation();
  const [openChangePassword, setOpenChangePassword] = useState(false);
  useEffect(() => {
    document.title = 'Home';
  }, []);

  return (
    <div>
      <Header
        title='Home'
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
          <CreateAssetForm />
        </div>
      </div>
    </div>
  );
};

export default CreateAsset;

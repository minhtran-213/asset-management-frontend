import React, { useState } from 'react';

import { Routes } from '../constants/routes';
import logo from '../images/Logo_lk.png';
import { useHistory } from 'react-router';

const Sidebar = ({ location }) => {
  const history = useHistory();
  const item = JSON.parse(localStorage.getItem('user'));
  const { role } = item;
  const [defaultTab, setDefaultTab] = useState(location);
  const tab =
    role === 'ROLE_ADMIN'
      ? [
          {
            id: 1,
            name: 'Home',
            path: Routes.AdminHome,
          },
          {
            id: 2,
            name: 'Manage User',
            path: Routes.ManageUser,
          },
          {
            id: 3,
            name: 'Manage Asset',
            path: Routes.ManageAsset,
          },
          {
            id: 4,
            name: 'Manage Assignment',
            path: Routes.ManageAssignment,
          },
          {
            id: 5,
            name: 'Request for Returning',
            path: Routes.ManageRequest,
          },
          {
            id: 6,
            name: 'Report',
            path: Routes.ManageReport,
          },
        ]
      : [
          {
            id: 1,
            name: 'Home',
            path: Routes.StaffHome,
          },
        ];
  return (
    <div className='pl-40 pt-16'>
      <div className='pb-8'>
        <img src={logo} alt='logo' />
        <span
          className='text-left text-primary font-bold'
          style={{ fontSize: '20px' }}>
          Online Asset Management
        </span>
      </div>
      <div className='bg-white w-64'>
        {tab.map((t, index) => (
          <button
            key={t.id}
            type='button'
            style={{ marginBottom: '0.1rem' }}
            onClick={() => {
              setDefaultTab(index);
              history.push(t.path);
            }}
            className={`px-4 relative bg-gray-200 hover:bg-gray-100 hover:text-primary  font-bold text-lg border-gray-200 focus:z-10  w-full inline-flex items-center h-16 ${
              defaultTab.includes(t.path)
                ? 'text-white bg-primary'
                : 'text-black'
            }`}>
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

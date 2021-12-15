import React, { useEffect, useState } from 'react';

import AssetInformationModal from '../components/AssetInformationModal';
import ChangePasswordForm from '../components/form/ChangePasswordForm';
import DeleteAsset from '../components/DeleteAsset';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../components/Header';
import ManageAssetHeader from '../components/ManageAssetHeader';
import PageTitle from '../components/PageTitle';
import Pagination from '../components/Pagination';
import { Routes } from '../constants/routes';
import Sidebar from '../components/Sidebar';
import Table from '../components/Table Component/Table';
import { TiDeleteOutline } from 'react-icons/ti';
import { authHeader } from '../utils/authHeader';
import axios from 'axios';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router';

const ManageAsset = () => {
  const item = JSON.parse(localStorage.getItem('user'));
  const initSearch = `location:${item.idLocation},isDeleted:false`;
  const location = useLocation();
  const history = useHistory();
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [elements, setElements] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState(initSearch);
  const [sort, setSort] = useState('assetCode');
  const [totalPages, setTotalPages] = useState(0);
  const [asset, setAsset] = useState();
  const [openInfo, setOpenInfo] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [assetCode, setAssetCode] = useState('');

  const headers = [
    { id: 'assetCode', name: 'Asset Code' },
    { id: 'assetName', name: 'Asset Name' },
    { id: 'category', name: 'Category' },
    { id: 'State', name: 'State' },
  ];

  const handleDelete = (assetCode) => {
    setAssetCode(assetCode);
    setOpenDelete(true);
  };

  const handleEdit = (assetCode) => {
    history.push(Routes.ManageAsset + `/edit/${assetCode}`);
  };

  const icons = [
    {
      id: 1,
      component: (
        <FontAwesomeIcon icon={faPencilAlt} className='cursor-pointer' />
      ),
      action: handleEdit,
    },
    {
      id: 2,
      component: (
        <TiDeleteOutline size='1.5rem' className='cursor-pointer' color='red' />
      ),
      action: handleDelete,
    },
  ];

  useEffect(() => {
    document.title = 'Manage User';
    const getData = () => {
      axios
        .get(`/assets?page=${page}&size=3&sort=${sort}&search=${search}`, {
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

  const handlePaging = (page) => {
    setPage(page);
  };

  const handleSort = (sortString) => {
    setSort(sortString);
  };

  const handleOpenInfo = (assetCode) => {
    axios
      .get(`/assets/detail/${assetCode}`, { headers: authHeader() })
      .then((response) => {
        const { data } = response.data;
        setAsset(data);
        setOpenInfo(true);
      })
      .catch((error) => console.log(error.response));
  };

  const handlingSearch = (searchText) => {
    setSearch(initSearch + ',' + searchText);
  };

  const handlingStateFilter = (state) => {
    if (state === 'all') {
      setSearch(initSearch);
    } else {
      setSearch(initSearch + ',' + 'state:' + state);
    }
  };

  const handlingCategoryFilter = (categoryCode) => {
    if (categoryCode === 'All') {
      setSearch(initSearch);
    } else {
      setSearch(initSearch + ',' + 'category:' + categoryCode);
    }
  };

  return (
    <>
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
      <div className='grid overflow-hidden grid-cols-3 grid-rows-none gap-5'>
        <div className='box'>
          <Sidebar location={location.pathname} />
        </div>
        <div style={{ marginRight: '30rem' }} className='box col-span-2'>
          <PageTitle title='Asset Management' />
          <ManageAssetHeader
            handleSearchString={handlingSearch}
            handleFilterState={handlingStateFilter}
            handleFilterCategory={handlingCategoryFilter}
          />
          <Table
            headers={headers}
            elements={elements}
            icons={icons}
            handleOnClick={handleSort}
            handleOpenInfo={handleOpenInfo}
          />

          <Pagination
            totalPage={totalPages}
            currentPage={page}
            handlePage={handlePaging}
          />

          {openInfo && (
            <AssetInformationModal
              asset={asset}
              handleCloseInfo={() => setOpenInfo(false)}
            />
          )}
          {openDelete && (
            <DeleteAsset
              assetCode={assetCode}
              handleCloseDelete={() => setOpenDelete(false)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ManageAsset;

import React, { useState } from "react";
import { useLocation } from "react-router";
import ChangePasswordForm from "../components/form/ChangePasswordForm";
import EditAssetForm from "../components/form/EditAssetForm";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const EditAsset = () => {
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
        ""
      )}
      <div className="grid xl:grid-cols-4 sm:grid-cols-2">
        <div>
          <Sidebar location={location.pathname} />
        </div>
        <div className="col-span-2 sm:col-span-1 pl-24">
          <EditAssetForm />
        </div>
      </div>
    </div>
  );
};

export default EditAsset;

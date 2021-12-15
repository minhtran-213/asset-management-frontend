import { AiOutlineCloseSquare } from "react-icons/ai";
import React from "react";

const AssetInformationModal = ({ asset, handleCloseInfo }) => {
  const {
    assetCode,
    assetName,
    category,
    installedDate,
    state,
    location,
    specification,
  } = asset;

  return (
    <div className="fixed justify-center overflow-auto z-50 bg-black bg-opacity-10 left-0 right-0 top-0 bottom-0 ">
      <div style={{ width: "515px" }} className="container m-auto pt-28">
        <div
          style={{ backgroundColor: "#EFF1F5" }}
          className="px-8 py-4 border border-black rounded-lg text-left font-bold text-primary"
        >
          <div className="flex justify-between items-center">
            <h1>Detailed User Information</h1>
            <AiOutlineCloseSquare
              className="cursor-pointer"
              onClick={handleCloseInfo}
            />
          </div>
        </div>
        <div
          style={{ backgroundColor: "#FAFCFC" }}
          className="border border-black container px-3 pt-5 rounded-b-lg"
        >
          <div className="pr-10 pl-10 pb-4 text-left">
            <div className="flex">
              <div className="w-2/6">
                <label>Asset Code</label>
              </div>
              <div className="w-3/6">
                <p>{assetCode}</p>
              </div>
            </div>
            <div className="flex">
              <div className="w-2/6">
                <label>Asset Name</label>
              </div>
              <div className="w-3/6">
                <p>{assetName}</p>
              </div>
            </div>
            <div className="flex">
              <div className="w-2/6">
                <label>Category</label>
              </div>
              <div className="w-3/6">
                <p>{category}</p>
              </div>
            </div>
            <div className="flex">
              <div className="w-2/6">
                <label>Installed Date</label>
              </div>
              <div className="w-3/6">
                <p>{installedDate}</p>
              </div>
            </div>
            <div className="flex">
              <div className="w-2/6">
                <label>State</label>
              </div>
              <div className="w-3/6">
                <p>{state}</p>
              </div>
            </div>
            <div className="flex">
              <div className="w-2/6">
                <label>Location</label>
              </div>
              <div className="w-3/6">
                <p>{location}</p>
              </div>
            </div>
            <div className="flex">
              <div className="w-2/6">
                <label>Specification</label>
              </div>
              <div className="w-3/6">
                <p>{specification}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetInformationModal;

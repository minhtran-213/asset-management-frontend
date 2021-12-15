import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { authHeader } from "../../utils/authHeader";
import moment from "moment";
import { Routes } from "../../constants/routes";
import { convertErrorCode } from "../../utils/errorCodeConverter";

const EditAssetForm = () => {
  const { assetCode } = useParams();
  const history = useHistory();

  const [categories, setCategories] = useState([]);

  const [initData, setInitData] = useState({
    assetName: "",
    categoryCode: "",
    specification: "",
    installedDate: "",
    state: "",
  });

  const [editAssetRequest, setEditAssetRequest] = useState({
    assetName: "",
    specification: "",
    installedDate: "",
    state: "",
  });

  const [error, setError] = useState("");

  const stateArr = [
    { value: 1, label: "Available" },
    { value: 2, label: "Not available" },
    { value: 4, label: "Waiting for recycling" },
    { value: 5, label: "Recycled" },
  ];

  const isDisabled =
    editAssetRequest.assetName === "" ||
    editAssetRequest.specification === "" ||
    editAssetRequest.installedDate === "" ||
    editAssetRequest.state === "";

  const isTheSame =
    editAssetRequest.assetName === initData.assetName &&
    editAssetRequest.specification === initData.specification &&
    editAssetRequest.installedDate === initData.installedDate &&
    editAssetRequest.state === initData.state;

  useEffect(() => {
    axios
      .get(`/categories`, { headers: authHeader() })
      .then((response) => {
        const { data } = response.data;
        setCategories(data);
      })
      .catch((error) => {
        if (error.response) return;
      });

    const fetchAssetData = async () => {
      const response = await axios.get(`/assets/${assetCode}`, {
        headers: authHeader(),
      });
      const { data } = response.data;
      setInitData({
        ...initData,
        ...{
          assetName: data.assetName,
          categoryCode: data.categoryCode,
          specification: data.specification,
          installedDate: data.installedDate.slice(0, 10),
          state: data.state,
        },
      });
      setEditAssetRequest({
        ...editAssetRequest,
        ...{
          assetName: data.assetName,
          specification: data.specification,
          installedDate: data.installedDate.slice(0, 10),
          state: data.state,
        },
      });
    };
    fetchAssetData();
  }, [assetCode]);

  const handleRequest = () => {
    const data = {
      assetName: editAssetRequest.assetName,
      specification: editAssetRequest.specification,
      installedDate: moment(editAssetRequest.installedDate).format(
        "yyyy-MM-DD HH:mm"
      ),
      state: editAssetRequest.state,
    };
    axios
      .put(`assets/edit/${assetCode}`, data, { headers: authHeader() })
      .then((response) => history.push(Routes.ManageAsset))
      .catch((error) => {
        if (error.response) {
          const { errorCode } = error.response.data;
          const message = convertErrorCode(errorCode);
          setError(message);
        }
      });
  };

  return (
    <div className="pt-28">
      <div>
        <p className="font-bold text-primary pl-4">Edit Asset</p>
        {error && <p className="text-red-500 pl-4 pt-2">* {error}</p>}
      </div>
      <div className="w-auto pt-4 pl-4">
        <div className="grid overflow-hidden grid-cols-3 grid-rows-none gap-5 pr-14 md:pr-16">
          <div className="flex items-center">
            <label htmlFor="name">Name</label>
          </div>
          <div className="col-span-2">
            <div>
              <input
                value={editAssetRequest.assetName}
                onChange={(event) =>
                  setEditAssetRequest({
                    ...editAssetRequest,
                    ...{ assetName: event.target.value },
                  })
                }
                type="text"
                className="border border-black rounded-md h-10 w-60 pl-2"
              />
            </div>
          </div>
          <div className="flex items-center">
            <label htmlFor="category">Category</label>
          </div>
          <div className="box col-span-2">
            <select
              value={initData.categoryCode}
              className="border border-black rounded-md h-10 w-60 pl-2"
              disabled
            >
              {categories.map((category) => (
                <option
                  key={category.categoryCode}
                  value={category.categoryCode}
                >
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="box">
            <label htmlFor="specification">Specification</label>
          </div>
          <div className="box col-span-2">
            <textarea
              value={editAssetRequest.specification}
              onChange={(event) =>
                setEditAssetRequest({
                  ...editAssetRequest,
                  ...{ specification: event.target.value },
                })
              }
              name="specification"
              className="border border-black rounded-md resize-none w-60 h-28 pl-2 pt-1"
            ></textarea>
          </div>
          <div className="flex items-center whitespace-nowrap">
            Installed Date
          </div>
          <div className="box col-span-2">
            <input
              value={editAssetRequest.installedDate}
              onChange={(event) => {
                const date = moment(event.target.value).format("yyyy-MM-DD");
                setEditAssetRequest({
                  ...editAssetRequest,
                  ...{ installedDate: date },
                });
              }}
              type="date"
              className="border border-black rounded-md h-10 w-60 pl-2"
            />
          </div>
          <div className="">State</div>
          <div className="box col-span-2">
            {stateArr.map((state) => (
              <div key={state.value}>
                <input
                  type="radio"
                  value={state.value}
                  checked={
                    editAssetRequest.state.toString() === state.value.toString()
                  }
                  onChange={(event) => {
                    setEditAssetRequest({
                      ...editAssetRequest,
                      ...{ state: event.target.value },
                    });
                  }}
                />
                <label className="pl-2">{state.label}</label>
              </div>
            ))}
          </div>
          <div className="col-span-3 inline-flex justify-end">
            <button
              disabled={isDisabled || isTheSame}
              type="submit"
              onClick={handleRequest}
              className={`btn ${
                isDisabled || isTheSame ? "btn-disabled" : "btn-primary"
              }`}
            >
              Save
            </button>
            <button
              onClick={() => history.push(Routes.ManageAsset)}
              className="btn border border-black rounded-md ml-4 "
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAssetForm;

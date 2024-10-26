import React, { useEffect, useState } from "react";
import UserImage from "../../assets/user-image.png";
import { settings } from "@server";
import { useNavigate } from "react-router-dom";
import { SettingModal } from "@modals";

const index = () => {
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState({});
  const navigate = useNavigate();
  const getData = async () => {
    try {
      const id = sessionStorage.getItem("signInId");
      const res = await settings.get(id);
      if (res.status === 200) {
        setData(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const handleCreate = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("signInId");
    navigate("/sign-up");
  };
  const handleUpdate = () => {
    setOpen(true);
    setUpdate(data);
  };
  const patchData = async (data, id) => {
    try {
      const res = await settings.patch(data, id);
      if (res.status === 200) {
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async () => {
    console.log("Error: Forbidden");
  };
  return (
    <div>
      <SettingModal open={open} setOpen={setOpen} update={update} patchData={patchData} />
      <div className="flex gap-[200px] items-start">
        <img src={UserImage} alt="" />
        <div className="grid grid-cols-2 gap-y-5 w-full">
          <div className="w-1/2">
            <p>First name</p>
            <h3 className="text-[20px] font-semibold">{data?.first_name}</h3>
          </div>
          <div className="w-1/2">
            <p>Email</p>
            <h3 className="text-[20px] font-semibold">{data?.email}</h3>
          </div>
          <div className="w-1/2">
            <p>Last name</p>
            <h3 className="text-[20px] font-semibold">{data?.last_name}</h3>
          </div>
          <div className="w-1/2">
            <p>Phon number</p>
            <h3 className="text-[20px] font-semibold">{data?.phone_number}</h3>
          </div>
          <div className="col-start-1 col-end-3 flex gap-4">
            <button onClick={handleCreate} className="bg-green-500 text-white px-5 py-2 text-base rounded-lg">
              Create account
            </button>
            <button onClick={handleUpdate} className="bg-yellow-400 text-white px-5 py-2 text-base rounded-lg">
              Update account
            </button>
            <button onClick={handleDelete} className="bg-red-500 text-white px-5 py-2 text-base rounded-lg">
              Delete account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;

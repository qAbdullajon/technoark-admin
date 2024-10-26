import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import { products } from "@server";
import { DetailProduct } from "@modals";

const index = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState({});
  const params = useParams();
  const getData = async () => {
    try {
      const res = await products.getId(params.id);
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, [params.id]);
  // ====================== Delete ==========================
  const handleDelete = async () => {
    try {
      const res = await products.deleteDetail(data.product_detail.id);
      if (res.status === 200) {
        setData((prev) => ({ ...prev, product_detail: null }));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const createDetail = () => {
    setOpen(true);
  };
  // ====================== POST ============================
  const postData = async (data) => {
    try {
      const res = await products.postDetail(data);
      if (res.status === 201) {
        setData((prev) => ({ ...prev, product_detail: res.data.data }));
      }
    } catch (err) {
      console.log(err);
    }
  };
  // ====================== PATCH =======================
  const patchData = async (data, id) => {
    try {
      const res = await products.patchDetail(data, id);
      if (res.status === 200) {
        // getData();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdite = () => {
    setOpen(true);
    setUpdate(data.product_detail);
  };
  return (
    <div>
      <DetailProduct open={open} setOpen={setOpen} update={update} setUpdate={setUpdate} postData={postData} id={params.id} patchData={patchData} />
      {data.product_detail === null ? (
        <div>
          <div className="text-xl flex flex-col gap-3">
            <div className="flex gap-3">
              <p>Product name:</p>
              <span className="font-semibold text-[#D55200]">{data?.product?.name}</span>
            </div>
            <div className="flex gap-2">
              <p>Product price:</p>
              <span className="font-semibold text-[#D55200]">{data?.product?.price} $</span>
            </div>
            <div className="flex gap-2">
              <p>Product detail:</p>
              <Button onClick={createDetail} type="primary">
                Add detail
              </Button>
            </div>
          </div>
          <div></div>
        </div>
      ) : (
        <div className="flex gap-[10%]">
          <div className="w-[45%]"></div>
          <div className="w-[45%]">
            <div className="flex flex-col gap-4">
              <h1 className="text-center font-semibold text-2xl pb-6">{data?.product?.name}</h1>
              <div className="flex justify-between mb-[-10px]">
                <h3 className="font-semibold text-xl">Description:</h3>
                <p className="text-base">{data?.product_detail?.description}</p>
              </div>
              <hr />
              <div className="flex justify-between mb-[-10px]">
                <h3 className="font-semibold text-xl">Product colors:</h3>
                <p className="text-base">{data?.product_detail?.colors}</p>
              </div>
              <hr />
              <div className="flex justify-between mb-[-10px]">
                <h3 className="font-semibold text-xl">Product quantity:</h3>
                <p className="text-base">{data?.product_detail?.quantity}</p>
              </div>
              <hr />
              <div className="flex justify-between mb-[-10px]">
                <h3 className="font-semibold text-xl">Product discount:</h3>
                <p className="text-base">{data?.product_detail?.discount}%</p>
              </div>
              <hr />
              <div className="flex justify-between mb-[-10px]">
                <h3 className="font-semibold text-xl self-end">Product price:</h3>
                <div>
                  <p className="text-base line-through opacity-50">{data?.product?.price} $</p>
                  <p className="text-base">{(data?.product?.price * (1 - data?.product_detail?.discount / 100)).toFixed()} $</p>
                </div>
              </div>
              <hr />
            </div>
            <div className="mt-8 flex gap-8">
              <Button onClick={handleEdite} type="primary">
                Update detail
              </Button>
              <Button type="primary" onClick={handleDelete}>
                Delete detail
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default index;

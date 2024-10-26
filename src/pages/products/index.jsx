import { Button, Input, Space, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EditOutlined, EnterOutlined, SignalFilled, SignatureOutlined } from "@ant-design/icons";
import { GlobalTabel, Popconfirm } from "@components";
import { products } from "@server";
import { AddProductsModal, UpdateProducts } from "@modals";

const index = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [update, setUpdate] = useState({});
  const [categorySelect, setCategorySelect] = useState([]);
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 5,
  });
  const { search } = useLocation();
  const navigate = useNavigate();
  // ===================== GET ==================
  const getData = async () => {
    setLoading(true);
    try {
      const res = await products.get(params);
      const res2 = await products.getCategory();
      if (res.status === 200) {
        setTotal(res.data.data.count);
        const new_data = res.data.data.products.map((item, i) => ({ ...item, key: i + 1 }));
        setData(new_data);
      }
      if (res2.status === 200) {
        setCategorySelect(res2.data.data.categories);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (e) => {
    setParams((prev) => ({ ...prev, search: e.target.value }));
  };
  useEffect(() => {
    getData();
  }, [params]);
  useEffect(() => {
    const params = new URLSearchParams(search);
    let page = Number(params.get("page")) || 1;
    let limit = Number(params.get("limit")) || 5;
    setParams((prev) => ({ ...prev, page, limit }));
  }, [search]);
  const handleTotalChanege = (pagination) => {
    const { pageSize, current } = pagination;
    setParams((prev) => ({ ...prev, page: current, limit: pageSize }));
    const current_page = new URLSearchParams(search);
    current_page.set("page", current);
    current_page.set("limit", pageSize);
    navigate(`?${current_page}`);
  };
  const createBtn = () => {
    setOpen(true);
  };
  // ================ POST ====================
  const postData = async (data) => {
    setLoading(true);
    try {
      const res = await products.post(data);
      if (res.status === 201) {
        getData();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  // =============== DELETE ===================
  const deleteItem = async (id) => {
    setLoading(true);
    try {
      const res = await products.delete(id);
      if (res.status === 200) {
        getData();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleEdite = (item) => {
    setUpdate(item);
    setModalOpen(true);
  };
  // ======================= PATCH ==========================
  const patchData = async (data, id) => {
    setLoading(true);
    try {
      const res = await products.patch(data, id);
      if (res.status === 200) {
        getData();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const singlePage = (id) => {
    navigate(`/products/${id}`);
  };
  const columns = [
    {
      title: "№",
      dataIndex: "key",
      key: "index",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edite">
            <Button onClick={() => handleEdite(record)} type="default" icon={<EditOutlined />} />
          </Tooltip>
          <Popconfirm id={record.id} deleteItem={deleteItem} />
          <Tooltip title="Single">
            <Button onClick={() => singlePage(record.id)} type="default" icon={<EnterOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <UpdateProducts open={modalOpen} setOpen={setModalOpen} categorySelect={categorySelect} patchData={patchData} update={update} setUpdate={setUpdate} />
      <AddProductsModal open={open} setOpen={setOpen} categorySelect={categorySelect} postData={postData} />
      <div className="flex justify-between items-center mb-3">
        <Input onChange={handleSearch} className="w-[300px] active" placeholder="Products search..." />
        <Button onClick={createBtn} className="btn" type="primary">
          Add new Products
        </Button>
      </div>
      <GlobalTabel
        columns={columns}
        data={data}
        handleChange={handleTotalChanege}
        loading={loading}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15", "20"],
        }}
      />
    </div>
  );
};

export default index;

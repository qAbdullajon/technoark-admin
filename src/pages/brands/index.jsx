import React, { useEffect, useState } from "react";
import { Input, Button, Space, Tooltip } from "antd";
import { GlobalTabel } from "@components";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { brands } from "@server";
import { useLocation, useNavigate } from "react-router-dom";
import { BrandsModal } from "@modals";
import { Popconfirm } from "@components";

const index = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState({});
  const [categoryOptions, setCategoryOptions] = useState(null);
  const [params, setParams] = useState({
    search: "",
    limit: 5,
    page: 1,
  });
  const { search } = useLocation();
  const navigate = useNavigate();
  // ======================= GET =============================
  const getData = async () => {
    setLoading(true);
    try {
      const res = await brands.get(params);
      const res_category = await brands.get_category();
      if (res.status === 200) {
        const new_data = res.data.data.brands.map((item, i) => ({ ...item, key: i, index: i + 1 }));
        setData(new_data);
        setTotal(res.data.data.count);
      }
      if (res_category.status === 200) {
        setCategoryOptions(res_category.data.data.categories);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
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
  const handleTableChange = (pagination) => {
    const { current, pageSize } = pagination;
    setParams((prev) => ({
      ...prev,
      page: current,
      limit: pageSize,
    }));
    const current_page = new URLSearchParams(search);
    current_page.set("page", `${current}`);
    current_page.set("limit", `${pageSize}`);
    navigate(`?${current_page}`);
  };
  const handleEdit = (item) => {
    setUpdate(item);
    setOpen(true);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  // =============== POST ==============
  const postData = async (Data, id) => {
    setLoading(true);
    try {
      const res = await brands.post(Data, id);
      if (res.status === 201) {
        setOpen(false);
        getData();
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const patchData = async (Data, id) => {
    setLoading(true);
    try {
      const res = await brands.patch(Data, id);
      if (res.status === 200) {
        getData();
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const deleteItem = async (id) => {
    setLoading(true);
    try {
      const res = await brands.delete(id);
      if (res.status === 200) {
        getData();
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
  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Brand name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button type="default" onClick={() => handleEdit(record)} icon={<EditOutlined />} />
          </Tooltip>
          <Popconfirm id={record.id} deleteItem={deleteItem} />
        </Space>
      ),
    },
  ];
  return (
    <div>
      <BrandsModal open={open} setOpen={setOpen} categoryOptions={categoryOptions} postData={postData} update={update} setUpdate={setUpdate} patchData={patchData} />
      <div className="flex justify-between items-center mb-3">
        <Input onChange={handleSearch} className="w-[300px] active" placeholder="Brands search..." />
        <Button className="btn" onClick={handleOpen} type="primary">
          Add new Brand
        </Button>
      </div>
      <div>
        <GlobalTabel
          columns={columns}
          data={data}
          loading={loading}
          pagination={{
            current: params.page,
            pageSize: params.limit,
            total,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "15", "20"],
          }}
          handleChange={handleTableChange}
        />
      </div>
    </div>
  );
};

export default index;

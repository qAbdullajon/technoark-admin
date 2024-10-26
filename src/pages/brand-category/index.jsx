import React, { useEffect, useState } from "react";
import { Button, Input, Space, Tooltip } from "antd";
import { GlobalTabel, Popconfirm } from "@components";
import { brandCategory } from "@server";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { BrandCategory } from "@modals";

const index = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(null);
  const [open, setOpen] = useState(false);
  const [brandOptions, setBrandOptions] = useState([]);
  const [update, setUpdate] = useState({});
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 5,
  });
  const navigate = useNavigate();
  const { search } = useLocation();
  // ============ GET ===========
  const getData = async () => {
    setLoading(true);
    try {
      const res = await brandCategory.get(params);
      const res2 = await brandCategory.get2();
      if (res.status === 200) {
        setTotal(res.data.data.count);
        const new_data = res.data.data.brandCategories.map((item, i) => ({ ...item, index: i + 1, key: i }));
        setData(new_data);
      }
      if (res2.status === 200) {
        setBrandOptions(res2.data.data.brands);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const params = new URLSearchParams(search);
    const page = Number(params.get("page")) || 1;
    const limit = Number(params.get("limit")) || 5;
    setParams((prev) => ({ ...prev, page, limit }));
  }, [search]);
  const handleTableChange = (pagination) => {
    const { pageSize, current } = pagination;
    setParams((prev) => ({ ...prev, page: current, limit: pageSize }));
    const current_page = new URLSearchParams(search);
    current_page.set("page", `${current}`);
    current_page.set("limit", `${pageSize}`);
    navigate(`?${current_page}`);
  };
  useEffect(() => {
    getData();
  }, [params]);
  const handleSearch = (e) => {
    setParams((prev) => ({ ...prev, search: e.target.value }));
  };
  const createBrand = () => {
    setOpen(true);
  };
  // =========== POST =============
  const postData = async (data) => {
    setLoading(true);
    try {
      const res = await brandCategory.post(data);
      if (res.status === 201) {
        getData();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  // ===================== PATCH ================
  const patchData = async (data, id) => {
    setLoading(true);
    try {
      const res = await brandCategory.patch(data, id);
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
    setOpen(true);
    setUpdate(item);
  };
  const deleteItem = async (id) => {
    setLoading(true);
    try {
      const res = await brandCategory.delete(id);
      if (res.status === 200) {
        getData();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Brand category name",
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
          {/* <Tooltip title="Delete">
            <Button type="default" icon={<DeleteOutlined />} />
          </Tooltip> */}
          <Popconfirm id={record.id} deleteItem={deleteItem} />
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div className="flex justify-between mb-3">
        <Input onChange={handleSearch} placeholder="Brand category search..." className="active" />
        <Button onClick={createBrand} className="btn">
          Add new brand
        </Button>
      </div>
      <BrandCategory open={open} setOpen={setOpen} brandOptions={brandOptions} postData={postData} update={update} setUpdate={setUpdate} patchData={patchData} />
      <GlobalTabel
        columns={columns}
        data={data}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15", "20"],
        }}
        handleChange={handleTableChange}
        loading={loading}
      />
    </div>
  );
};

export default index;

import React, { useEffect, useState } from "react";
import { Button, Input, Space, Tag, Tooltip } from "antd";
import { GlobalTabel, Popconfirm } from "@components";
import { categories } from "@server";
import { EditOutlined, EnterOutlined } from "@ant-design/icons";
import { CategoriesModal } from "@components/modals";
import { useLocation, useNavigate } from "react-router-dom";

const index = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState({});
  const [params, setParams] = useState({
    search: "",
    limit: 5,
    page: 1,
  });
  const { search } = useLocation();
  const navigate = useNavigate();
  // ======== Get request ==============
  const getData = async () => {
    setLoading(true);
    try {
      const res = await categories.get(params);
      if (res.status === 200) {
        setTotal(res?.data?.data?.count);
        const new_data = res.data.data.categories.map((item, i) => ({ ...item, key: i, index: i + 1 }));
        setData(new_data);
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
  const handleEdit = (item) => {
    setOpen(true);
    setUpdate(item);
  };
  // ========= Edit =========
  const patchData = async (data, id) => {
    try {
      const res = await categories.patch(data, id);
      if (res.status === 200) {
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  };
  // ====== Delete ==========
  const deleteItem = async (id) => {
    setLoading(true);
    try {
      const res = await categories.delete(id);
      if (res.status === 200) {
        getData();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const params = new URLSearchParams(search);
    let page = Number(params.get("page")) || 1;
    let limit = Number(params.get("limit")) || 5;
    setParams((prev) => ({
      ...prev,
      page: page,
      limit: limit,
    }));
  }, [search]);
  const handleTableChange = (pagination) => {
    const { current, pageSize } = pagination;
    setParams((prev) => ({
      ...prev,
      limit: pageSize,
      page: current,
    }));
    const current_page = new URLSearchParams(search);
    current_page.set("page", `${current}`);
    current_page.set("limit", `${pageSize}`);
    navigate(`?${current_page}`);
  };
  const createCategory = () => {
    setOpen(true);
  };
  // ========== Post request ===========
  const postCategory = async (data) => {
    setLoading(true);
    try {
      const res = await categories.post(data);
      if (res.status === 201) {
        getData();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (e) => {
    setParams((prev) => ({
      ...prev,
      search: e.target.value,
    }));
  };
  const handleSubCategory = (id) => {
    navigate(`/categories/${id}`);
  };
  const columns = [
    {
      title: "№",
      dataIndex: "index",
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
          <Tooltip title="Edit">
            <Button type="default" onClick={() => handleEdit(record)} icon={<EditOutlined />} />
          </Tooltip>
          <Popconfirm id={record.id} deleteItem={deleteItem} />
          <Tooltip title="Sub category">
            <Button onClick={() => handleSubCategory(record.id)} type="default" icon={<EnterOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div className="flex justify-between items-center pb-3">
        <Input onChange={handleSearch} className="max-w-[300px] py-2" placeholder="Search category..." />
        <Button onClick={createCategory} className="btn w-min py-5 text-[16px]" type="default">
          Add New Category
        </Button>
      </div>
      <CategoriesModal open={open} setOpen={setOpen} postCategory={postCategory} patchData={patchData} update={update} setUpdate={setUpdate} />
      <GlobalTabel
        columns={columns}
        data={data}
        loading={loading}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15", "20"],
        }}
        handleChange={handleTableChange}
      />
    </div>
  );
};
export default index;

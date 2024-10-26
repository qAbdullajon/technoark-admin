import React, { useEffect, useState } from "react";
import { Button, Input, Space, Tag, Tooltip } from "antd";
import { EditOutlined, EnterOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { GlobalTabel, Popconfirm } from "@components";
import { subCategory } from "@server";
import { SubCategoryModal } from "@modals";
const index = () => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState();
  const [params, setParams] = useState({
    page: 1,
    limit: 5,
    search: "",
  });
  const { id } = useParams();
  // ====== Get ============
  const getData = async () => {
    try {
      const res = await subCategory.get(params, id);
      if (res.status === 200) {
        const new_data = res.data.data.subcategories.map((item, i) => ({ ...item, key: i, index: i + 1 }));
        setData(new_data);
        setTotal(res.data.data.count);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, [params]);
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
  const handleEdit = (item) => {
    setUpdate(item);
    setOpen(true);
  };
  // =========== Delete ===========
  const deleteItem = async (id) => {
    setLoading(true);
    try {
      const res = await subCategory.delete(id);
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
  const createCategory = () => {
    setOpen(true);
  };
  // ========= POST =========
  const postSubCategory = async (data) => {
    setLoading(true);
    try {
      const res = await subCategory.post(data);
      if (res.status === 201) {
        getData();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const patchData = async (data, id) => {
    setLoading(true);
    try {
      const res = await subCategory.patch(data, id);
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
      title: "Sub category name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      dataIndex: "action",
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
      <SubCategoryModal open={open} setOpen={setOpen} update={update} setUpdate={setUpdate} id={id} postSubCategory={postSubCategory} patchData={patchData} />
      <div className="flex justify-between items-center pb-3">
        <Input onChange={handleSearch} className="max-w-[300px] py-2" placeholder="Search sub category..." />
        <Button onClick={createCategory} className="btn w-min py-5 text-[16px]" type="default">
          Add New Sub Category
        </Button>
      </div>
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

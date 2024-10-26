import { Button, Space, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { GlobalTabel, Popconfirm } from "@components";
import { EditOutlined } from "@ant-design/icons";
import { stock } from "@server";
import { StockModal } from "@modals";
import { useLocation, useNavigate } from "react-router-dom";

const index = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState({});
  const [total, setTotal] = useState(null);
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 5,
  });
  const navigate = useNavigate();
  const { search } = useLocation();
  const getData = async () => {
    setLoading(true);
    try {
      const res = await stock.get(params);
      if (res.status === 200) {
        setTotal(res.data.data.count);
        const new_data = res.data.data.stocks.map((item, i) => ({ ...item, key: i + 1, name: item.product_id.name }));
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
  const deleteItem = async (id) => {
    try {
      const res = await stock.delete(id);
      if (res.status === 200) {
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const EditeItem = (item) => {
    setOpen(true);
    setUpdate(item);
  };
  const createStock = () => {
    setOpen(true);
  };
  // =================== POST =====================
  const postData = async (data) => {
    try {
      const res = await stock.post(data);
      if (res.status === 201) {
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  };
  // ================== PATCH ==================
  const patchData = async (data, id) => {
    try {
      const res = await stock.patch(data, id);
      if (res.status === 200) {
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  };
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
  const columns = [
    {
      title: "№",
      dataIndex: "key",
      key: "index",
    },
    {
      title: "Category name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edite">
            <Button onClick={() => EditeItem(record)} type="default" icon={<EditOutlined />} />
          </Tooltip>
          <Popconfirm id={record.id} deleteItem={deleteItem} />
        </Space>
      ),
    },
  ];
  return (
    <div>
      <StockModal open={open} setOpen={setOpen} update={update} setUpdate={setUpdate} postData={postData} patchData={patchData} />
      <div className="flex justify-between">
        <div></div>
        <Button onClick={createStock} type="primary">
          Add new Stock
        </Button>
      </div>
      <GlobalTabel
        data={data}
        columns={columns}
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

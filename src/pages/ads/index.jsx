import React, { useEffect, useState } from "react";
import { Button, Image, Space } from "antd";
import { GlobalTabel, Popconfirm } from "@components";
import { ads } from "@server";
import { AdsModal } from "@modals";

const index = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const getData = async () => {
    setLoading(true);
    try {
      const res = await ads.get();
      if (res.status === 200) {
        const new_data = await res.data.data.map((item, i) => ({ ...item, key: i + 1 }));
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
  }, []);
  // ===================== DELETE ====================
  const deleteItem = async (id) => {
    setLoading(true);
    try {
      const res = await ads.delete(id);
      if (res.status === 200) {
        getData();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const postData = async (data) => {
    try {
      const res = await ads.post(data);
      if (res.status === 201) {
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const createBanner = () => {
    setOpen(true);
  };
  const columns = [
    {
      title: "№",
      dataIndex: "key",
      key: "index",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => <Image src={record.image} />,
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm id={record.id} deleteItem={deleteItem} />
        </Space>
      ),
    },
  ];
  return (
    <div>
      <AdsModal open={open} setOpen={setOpen} postData={postData} />
      <div className="flex justify-between">
        <div></div>
        <Button onClick={createBanner} type="primary">
          Add new Banner
        </Button>
      </div>
      <GlobalTabel data={data} columns={columns} loading={loading} />
    </div>
  );
};

export default index;

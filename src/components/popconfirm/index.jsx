import React from "react";
import { Button, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const Index = ({ id, deleteItem }) => {
  const onConfirm = () => {
    deleteItem(id);
  };
  return (
    <>
      <Tooltip title="Delete">
        <Popconfirm title="Delete the task" description="Are you sure to delete this task?" onConfirm={onConfirm} okText="Yes" cancelText="No">
          <Button danger icon={<DeleteOutlined />} />
        </Popconfirm>
      </Tooltip>
    </>
  );
};

export default Index;

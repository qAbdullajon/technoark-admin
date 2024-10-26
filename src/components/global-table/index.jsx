import React from "react";
import { Space, Table, Tag } from "antd";

const Index = ({ columns, data, pagination, handleChange, loading }) => <Table bordered columns={columns} dataSource={data} pagination={pagination} loading={loading} onChange={(pagination) => handleChange(pagination)} />;
export default Index;

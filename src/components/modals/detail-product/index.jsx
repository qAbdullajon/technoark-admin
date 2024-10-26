import { PlusOutlined } from "@ant-design/icons";
import { Modal, Button, Checkbox, Form, Input, Select, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";

const index = ({ open, setOpen, update, setUpdate, postData, id, patchData }) => {
  const [form] = Form.useForm();
  const handleCencel = () => {
    setOpen(false);
    form.resetFields();
  };
  useEffect(() => {
    const fetchAndSetValues = async () => {
      if (open && update.id) {
        form.setFieldsValue({
          quantity: update.quantity || "",
          discount: update.discount || "",
          colors: update.colors.join(", ") || "",
          description: update.description || "",
        });
      }
    };
    fetchAndSetValues();
  }, [open, update, form]);

  const onFinish = (values) => {
    if (update.id) {
      const new_data = { ...values, discount: Number(values.discount), quantity: Number(values.quantity), product_id: Number(id) };
      patchData(new_data, update.id);
    }
    const new_data = { ...values, discount: Number(values.discount), quantity: Number(values.quantity), product_id: Number(id) };
    postData(new_data);
    setOpen(false);
    setUpdate({});
  };

  return (
    <Modal title="Add new brand" open={open} onCancel={handleCencel} footer={null}>
      <Form form={form} name="basic" layout="vertical" onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[
            {
              required: true,
              message: "Please input your Brand name!",
            },
          ]}
        >
          <Input type="number" className="active !w-full" />
        </Form.Item>
        <Form.Item
          label="Discount"
          name="discount"
          rules={[
            {
              required: true,
              message: "Please input your Brand name!",
            },
          ]}
        >
          <Input type="number" className="active !w-full" />
        </Form.Item>
        <Form.Item
          label="Color"
          name="colors"
          rules={[
            {
              required: true,
              message: "Please input your Brand name!",
            },
          ]}
        >
          <Input className="active !w-full" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input your Brand name!",
            },
          ]}
        >
          <TextArea rows={3} placeholder="Type your message here..." />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default index;

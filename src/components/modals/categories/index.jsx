import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import "./style.css";
const SimpleModal = ({ open, setOpen, postCategory, patchData, update, setUpdate }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (open && update) {
      form.setFieldsValue({
        name: update.name || "",
      });
    } else if (open) {
      form.resetFields();
    }
  }, [open, update, form]);

  const onFinish = (values) => {
    if (update?.id) {
      patchData(values, update.id);
    } else {
      postCategory(values);
    }
    form.resetFields();
    setOpen(false);
    setUpdate({});
  };
  const handleCancel = () => {
    form.resetFields();
    setUpdate({});
    setOpen(false);
  };

  return (
    <>
      <Modal title="Add new category" open={open} onCancel={handleCancel} footer={null}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Category name" name="name" rules={[{ required: true, message: "Please input your name!" }]}>
            <Input className="active py-2 hover:border-customRed" />
          </Form.Item>
          <Form.Item>
            <Button className="btn py-5 text-[17px]" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SimpleModal;

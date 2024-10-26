import React, { useEffect } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";

const index = ({ open, setOpen, update, patchData }) => {
  const [form] = Form.useForm();
  const navigete = useNavigate();
  const onFinish = async (values) => {
    patchData(values, update.id);
    setOpen(false);
    form.resetFields();
  };
  const handleCancel = () => {
    setOpen(false);
  };
  useEffect(() => {
    const fetchAndSetValues = async () => {
      if (open && update.id) {
        form.setFieldsValue({
          first_name: update.first_name || "",
          last_name: update.last_name || "",
          phone_number: update.phone_number || "",
          email: update.email || "",
          password: "",
        });
      }
    };
    fetchAndSetValues();
  }, [open, update, form]);
  return (
    <Modal open={open} onCancel={handleCancel} footer={null}>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        method="POST"
        action="/login"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="First name"
          name="first_name"
          rules={[
            {
              required: true,
              message: "First name is required!",
            },
          ]}
        >
          <Input className="py-2 !w-full" />
        </Form.Item>
        <Form.Item
          label="Last name"
          name="last_name"
          rules={[
            {
              required: true,
              message: "Last name is required!",
            },
          ]}
        >
          <Input className="py-2 !w-full" />
        </Form.Item>
        <Form.Item
          label="Phone number"
          name="phone_number"
          rules={[
            {
              required: true,
              message: "Phone number is required!",
            },
          ]}
        >
          <Input className="py-2 !w-full" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Email is required!",
            },
          ]}
        >
          <Input className="py-2 !w-full" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password className="py-2" />
        </Form.Item>

        <Form.Item>
          <Button style={{ width: "100%", paddingBlock: "20px", color: "#fff", backgroundColor: "rgb(213, 82, 0)", marginBlock: "10px" }} type="submit" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default index;

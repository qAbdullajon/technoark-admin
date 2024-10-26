import { Button, Form, Input, Modal, Select } from "antd";
import axios from "axios";
import React, { useEffect } from "react";

const index = ({ open, setOpen, brandOptions, postData, update, setUpdate, patchData }) => {
  const [form] = Form.useForm();
  const handleCencel = () => {
    setOpen(false);
    setUpdate({});
  };
  const onFinish = (values) => {
    if (update.id) {
      const new_data = {
        name: values.name,
        brand_id: typeof values.brand_id === "number" ? values.brand_id : update.brand_id,
      };
      patchData(new_data, update.id);
    } else {
      postData(values);
    }
    setOpen(false);
  };
  const select = async (id) => {
    try {
      const res = await axios.get(`https://texnoark.ilyosbekdev.uz/brand/${id}`);
      console.log(res);
      return res.data.data.name;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchAndSetValues = async () => {
      if (open && update.id) {
        const selectName = await select(update.brand_id);
        form.setFieldsValue({
          name: update.name || "",
          brand_id: selectName || "",
        });
      } else if (open) {
        form.resetFields();
      }
    };
    fetchAndSetValues();
  }, [open, update, form]);
  return (
    <Modal title="Add new brand category" open={open} onCancel={handleCencel} footer={null}>
      <Form layout="vertical" form={form} name="basic" onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Category name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input className="active !w-full" />
        </Form.Item>
        <Form.Item
          label="Select"
          name="brand_id"
          rules={[
            {
              required: true,
              message: "Please input your category !",
            },
          ]}
        >
          <Select className="h-[42px]">
            {brandOptions?.map((item, i) => (
              <Select.Option key={i} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
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

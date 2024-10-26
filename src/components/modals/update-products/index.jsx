import { PlusOutlined } from "@ant-design/icons";
import { Modal, Button, Checkbox, Form, Input, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { products } from "@server";

const index = ({ open, setOpen, categorySelect, patchData, update, setUpdate }) => {
  const [form] = Form.useForm();
  const [brand, setBrand] = useState(true);
  const [brandCategory, setBrandCategory] = useState(true);
  const [brandSelect, setBrandSelect] = useState([]);
  const [brandCategorySelect, setBrandCategorySelect] = useState([]);
  const handleCategory = async (value) => {
    setBrand(false);
    try {
      const res = await products.getBrand(value);
      if (res.status === 200) {
        setBrandSelect(res.data.data.brands);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const brandChange = async (value) => {
    setBrandCategory(false);
    try {
      const res = await products.getBrandCategory(value);
      if (res.status === 200) {
        setBrandCategorySelect(res.data.data.brandCategories);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleCencel = () => {
    setOpen(false);
    form.resetFields();
  };
  useEffect(() => {
    const fetchAndSetValues = async () => {
      if (open && update.id) {
        form.setFieldsValue({ name: update.name || "", price: update.price || "" });
      }
    };
    fetchAndSetValues();
  }, [open, update, form]);

  const onFinish = (values) => {
    const new_data = { ...values, price: +values.price };
    patchData(new_data, update.id);
    setOpen(false);
  };

  return (
    <Modal title="Add new brand" open={open} onCancel={handleCencel} footer={null}>
      <Form form={form} name="basic" layout="vertical" onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Product name"
          name="name"
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
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input your price!",
            },
          ]}
        >
          <Input className="active !w-full" />
        </Form.Item>
        <Form.Item
          label="Select category name"
          name="category_id"
          rules={[
            {
              required: true,
              message: "Please input your category!",
            },
          ]}
        >
          <Select onChange={handleCategory}>
            {categorySelect?.map((item, i) => (
              <Select.Option key={i} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Select brand name"
          name="brand_id"
          rules={[
            {
              required: true,
              message: "Please input your category!",
            },
          ]}
        >
          <Select onChange={brandChange} disabled={brand}>
            {brandSelect?.map((item, i) => (
              <Select.Option key={i} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Select brand category"
          name="brand_category_id"
          rules={[
            {
              required: true,
              message: "Please input your category!",
            },
          ]}
        >
          <Select disabled={brandCategory}>
            {brandCategorySelect?.map((item, i) => (
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

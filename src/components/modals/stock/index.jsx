import { Modal, Button, Form, Input, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { stock } from "@server";

const index = ({ open, setOpen, postData, update, setUpdate, patchData }) => {
  const [form] = Form.useForm();
  const [categorySelect, setCategorySelect] = useState([]);
  const [brandsSelect, setBrandSelect] = useState([]);
  const [productsSelect, setProductsSelect] = useState([]);
  const [disBrand, setDisBrand] = useState(true);

  const getData = async () => {
    try {
      const res = await stock.getCategory();
      const res2 = await stock.getProducts();
      if (res.status === 200) {
        setCategorySelect(res.data.data.categories);
      }
      if (res2.status === 200) {
        setProductsSelect(res2.data.data.products);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const categorySelectChange = async (value) => {
    setDisBrand(false);
    try {
      const res = await stock.getBrand(value);
      if (res.status === 200) {
        setBrandSelect(res.data.data.brands);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const handleCencel = () => {
    setOpen(false);
    form.resetFields();
    setUpdate({});
  };

  const onFinish = (values) => {
    const new_data = { ...values, quantity: Number(values.quantity) };
    if (update.id) {
      patchData(new_data, update.id);
    } else {
      postData(new_data);
    }
    setOpen(false);
    form.resetFields();
  };

  return (
    <Modal title="Add new brand" open={open} onCancel={handleCencel} footer={null}>
      <Form form={form} name="basic" layout="vertical" onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Select category"
          name="category_id"
          rules={[
            {
              required: true,
              message: "Please input your category !",
            },
          ]}
        >
          <Select onChange={categorySelectChange} className="h-[42px]">
            {categorySelect?.map((item, i) => (
              <Select.Option key={i} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Select brand"
          name="brand_id"
          rules={[
            {
              required: true,
              message: "Please input your category !",
            },
          ]}
        >
          <Select disabled={disBrand} className="h-[42px]">
            {brandsSelect?.map((item, i) => (
              <Select.Option key={i} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Select products"
          name="product_id"
          rules={[
            {
              required: true,
              message: "Please input your category !",
            },
          ]}
        >
          <Select className="h-[42px]">
            {productsSelect?.map((item, i) => (
              <Select.Option key={i} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[
            {
              required: true,
              message: "Please input your category !",
            },
          ]}
        >
          <Input className="active !w-full" type="number" />
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

import { PlusOutlined } from "@ant-design/icons";
import { Modal, Button, Checkbox, Form, Input, Select, Upload } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const index = ({ open, setOpen, categoryOptions, postData, update, setUpdate, patchData }) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [file, setFile] = useState(null);
  const handleCencel = () => {
    setOpen(false);
    form.resetFields();
    setUpdate({});
  };
  const select = async (id) => {
    try {
      const res = await axios.get(`https://texnoark.ilyosbekdev.uz/category/${id}`);
      console.log(res);
      return res.data.data.name;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchAndSetValues = async () => {
      if (open && update.id) {
        const selectName = await select(update.category_id);
        form.setFieldsValue({
          name: update.name || "",
          category_id: selectName || "",
          description: update.description || "",
        });
      }
    };
    fetchAndSetValues();
  }, [open, update, form]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const onFinish = (values) => {
    if (update.id) {
      const new_data = {
        name: values.name,
        categoryId: typeof values.category_id === "number" ? values.category_id : update.category_id,
        description: values.description,
      };
      patchData(new_data, update.id);
      console.log(new_data);
    } else {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", values.name);
      formData.append("category_id", values.category_id);
      formData.append("description", values.description);
      postData(formData);
    }
    form.resetFields();
    setOpen(false);
  };

  return (
    <Modal title="Add new brand" open={open} onCancel={handleCencel} footer={null}>
      <Form form={form} name="basic" layout="vertical" onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Brand name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your Brand name!",
            },
          ]}
        >
          <Input className="active" />
        </Form.Item>
        <Form.Item
          label="Select"
          name="category_id"
          rules={[
            {
              required: true,
              message: "Please input your category !",
            },
          ]}
        >
          <Select className="h-[42px]">
            {categoryOptions?.map((item, i) => (
              <Select.Option key={i} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {!update.id && (
          <Form.Item label="Brand image" name="file" rules={[{ required: true, message: "Please upload a brand image!" }]}>
            <Input type="file" onChange={handleFileChange} size="large" id="basic_file" aria-required="true" className="ant-input ant-input-lg css-1yx3mpk ant-input-outlined" />
          </Form.Item>
        )}
        <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please upload a description!" }]}>
          <TextArea rows={3} />
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

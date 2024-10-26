import React, { useState } from "react";
import { Button, Drawer, Form, Input, Select, Upload, Watermark } from "antd";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { products } from "@server";

const addWatermark = ({ open, setOpen, categorySelect, postData }) => {
  const [form] = Form.useForm();
  const [brand, setBrand] = useState(true);
  const [brandCategory, setBrandCategory] = useState(true);
  const [brandSelect, setBrandSelect] = useState([]);
  const [brandCategorySelect, setBrandCategorySelect] = useState([]);
  const handleCencel = () => {
    setOpen(false);
  };
  const [fileList, setFileList] = useState([]);
  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onFinish = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", Number(values.price));
    formData.append("category_id", Number(values.category_id));
    formData.append("brand_category_id", Number(values.brand_category_id));
    formData.append("brand_id", Number(values.brand_id));
    formData.append("files", fileList);
    postData(formData);
    setOpen(false);
  };

  const openImageInNewTab = (file) => {
    const imageURL = URL.createObjectURL(file.originFileObj);
    const newTab = window.open();
    newTab.location.href = imageURL; // Yangi oynada rasmni ko'rsatish
  };
  const handleDelete = (file) => {
    setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
  };
  const customItemRender = (originNode, file) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #d9d9d9", // Oddiy inputlar border rangi
        borderRadius: "8px",
        padding: "8px",
        marginTop: "8px",
      }}
    >
      <img
        src={URL.createObjectURL(file.originFileObj)}
        alt={file.name}
        style={{
          width: "50px",
          height: "50px",
          objectFit: "cover",
          marginRight: "10px",
          cursor: "pointer",
        }}
        onClick={() => openImageInNewTab(file)}
      />
      <span style={{ flex: 1 }}>{file.name}</span>
      <Button type="text" icon={<DeleteOutlined />} onClick={() => handleDelete(file)} />
    </div>
  );
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
  return (
    <Watermark content="Ant Design" inherit={false}>
      <Drawer width={600} destroyOnClose open={open} onClose={handleCencel}>
        <h2 className="font-bold text-2xl mb-5">Add products</h2>
        <Form form={form} name="basic" className="grid grid-cols-2 gap-x-5" onFinish={onFinish} layout="vertical" autoComplete="off">
          <Form.Item
            label="Product name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input className="w-full" />
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
            <Input className="w-full" />
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
                message: "Please input your price!",
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
                message: "Please input your price!",
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
          <Form.Item name="upload" label="Fayl yuklash" rules={[{ required: true, message: "Faylni yuklang!" }]}>
            <Upload beforeUpload={() => false} onChange={handleFileChange} fileList={fileList} itemRender={customItemRender} maxCount={10}>
              <Button>
                <UploadOutlined />
                <span>Faylni tanlang</span>
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Jo‘natish
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </Watermark>
  );
};
export default addWatermark;

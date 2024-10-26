import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { Modal, Button, Form, Input, Upload } from "antd";
import React, { useState } from "react";

const Index = ({ open, setOpen, postData }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
    setFileList([]); // Fayl ro'yxatini tozalash
  };

  const onFinish = (values) => {
    const formData = new FormData();
    formData.append("position", values.position);
    if (fileList.length) {
      formData.append("file", fileList[0].originFileObj);
    }
    postData(formData);
    handleCancel();
  };

  return (
    <Modal title="Add new brand" open={open} onCancel={handleCancel} footer={null}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Position"
          name="position"
          rules={[
            {
              required: true,
              message: "Please input the position!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item name="upload" label="Fayl yuklash" rules={[{ required: true, message: "Faylni yuklang!" }]}>
          <Upload
            beforeUpload={() => false} // Faylni avtomatik yuklashni o‘chiradi
            onChange={handleFileChange}
            fileList={fileList} // Fayl ro'yxatini o‘rnatish
            maxCount={1}
            itemRender={(originNode, file) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #d9d9d9",
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
                />
                <span style={{ flex: 1 }}>{file.name}</span>
                <Button type="text" icon={<DeleteOutlined />} onClick={() => setFile(null)} />
              </div>
            )}
          >
            <Button icon={<UploadOutlined />}>Faylni tanlang</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Index;

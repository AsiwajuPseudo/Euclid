import React, { useState } from 'react';
import { Upload, Button, message, Select, Input, Form} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const Uploads = (props) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [status, setStatus] = useState('');

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append('table', values.table);
    formData.append('category', values.category);
    fileList.forEach(file => {
      formData.append('files', file.originFileObj);
    });

    try {
      const response = await fetch(props.host+'upload_files', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        form.resetFields();
        setFileList([]);
        message.warning(data.status);
      } else {
        message.warning('Error on uploading files');
      }
    } catch (error) {
      console.error('Error uploading files: ', error);
      message.warning('Error on uploading files');
    }
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="table" rules={[{ required: true, message: 'Please select a table!' }]}>
        <Select style={{ width: 120, margin: '10px 0' }} placeholder="Select Table">
          {props.menus.map((item, index) => (
            <Option key={index} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="category" rules={[{ required: true, message: 'Please input a category!' }]}>
        <Input placeholder="Category" style={{ width: 200, margin: '10px 0' }} />
      </Form.Item>
      <Upload fileList={fileList} onChange={handleChange} multiple={true}>
        <Button icon={<UploadOutlined />}>Select Files</Button>
      </Upload>
      <p>{status}</p>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={fileList.length === 0} style={{ marginTop: 10 }}>
          Upload
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Uploads;
import React, { useState } from 'react';
import { Upload, Button, message, Select, Input, Form} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const CloudUpload = (props) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [status, setStatus] = useState('');

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append('chat_id', props.chat_id);
    fileList.forEach(file => {
      formData.append('files', file.originFileObj);
    });

    try {
      const response = await fetch(props.host+'cloudupload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        form.resetFields();
        setFileList([]);
        props.set_tree(data.nodes)
        message.warning(data.status);
      } else {
        setStatus('Error on uploading files');
      }
    } catch (error) {
      console.error('Error uploading files: ', error);
      setStatus('Error on uploading files');
    }
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Upload fileList={fileList} onChange={handleChange} multiple={true}>
        <Button icon={<UploadOutlined />}>Select Files</Button>
      </Upload>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={fileList.length === 0} style={{ marginTop: 10 }}>
          Upload
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CloudUpload;
import React, { useEffect, useState } from 'react';
import { Tree, Row, Col, Card, Modal, FloatButton, Spin, Button,message } from 'antd';
import { CloudUploadOutlined, LoadingOutlined, ForkOutlined, DeleteOutlined } from '@ant-design/icons';

const { DirectoryTree } = Tree;
import Uploads from './upload.jsx';

function Files(props) {
  const [treeData, setTreeData] = useState([]);
  const [menus, setMenus] = useState([]);
  const [selectedFileContent, setSelectedFileContent] = useState(null);
  const [modalop, setModal] = useState(false);
  const [forko, setFork] = useState(false);
  const [msg,setMsg]=useState(false);
  const [transcript, setTranscipt] = useState([]);
  const [error, setError] = useState('');
  const [loader, setLoad] = useState('');
  const [noti, setNoti]=useState();
  const [pdfPath, setPdfPath] = useState(null);

  useEffect(() => {
    fetch(props.host+'tree')
      .then(response => response.json())
      .then(data => {
        setTreeData(data.nodes);
        setMenus(data.tables);
      })
      .catch(error => console.error('Error fetching tree data:', error));
  }, []);

  const handleFileClick = (fileKey) => {
    setPdfPath(fileKey)
  };

  const fork = () => {
    setFork(!forko);
    setLoad(<Spin />);
    fetch(`${props.host}add`)
      .then(response => response.json())
      .then(content => {
        setTranscipt(content.trans);
        setLoad();
      })
      .catch(error => {
        console.error('Error fetching file content:', error);
        setLoad();
      });
  };

  const renderTreeNodes = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <Tree.TreeNode title={item.title} key={item.key}>
            {renderTreeNodes(item.children)}
          </Tree.TreeNode>
        );
      }
      return (
        <Tree.TreeNode
          title={
            <span>
              {item.title}
              <Button type="text" icon={<DeleteOutlined />} onClick={() => handleDelete(item.key)}/>
            </span>
          }
          key={item.key}
          isLeaf
        />
      );
    });
  };

  const modalops = () => {
    setModal(!modalop);
  };

  const forkop = () => {
    setFork(!forko);
  };

  const handleDelete = (fileKey) => {
    fetch(`${props.host}delete_file?key=${fileKey}`)
      .then(response => response.text())
      .then(content => message.info(content))
      .catch(error => console.error('Error fetching file content:', error));
  };


  return (
    <div style={{ minWidth: '1200px' }}>
      <Row>
        <Col span={6}>
          <DirectoryTree
            defaultExpandAll
            height={500}
            onSelect={(selectedKeys, info) => {
              const selectedKey = selectedKeys[0];
              handleFileClick(selectedKey);
            }}
          >
            {renderTreeNodes(treeData)}
          </DirectoryTree>
        </Col>
        <Col span={18}>
            {pdfPath && (
                <iframe src={`${props.host}view_file?key=${pdfPath}`} width="100%" height="500"></iframe>
            )}
        </Col>
      </Row>
      <FloatButton type="primary" icon={<CloudUploadOutlined />} onClick={modalops} />
      <FloatButton type="primary" icon={<ForkOutlined />} onClick={fork} style={{ right: 94 }} />
      <Modal title="Upload files" open={modalop} onOk={modalops} onCancel={modalops}>
        <Uploads menus={menus} host={props.host}/>
      </Modal>
      <Modal title="Fork files into table" open={forko} onOk={forkop} onCancel={forkop}>
        <h2>{loader}</h2>
        <ul>
          {transcript.map(item => (
            <li key={item.file}>
              <strong>File:</strong> {item.file}, <strong>Message:</strong> {item.message}
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}

export default Files;
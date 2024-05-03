import React, { useState, useEffect } from 'react';
import { Tree, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { DirectoryTree } = Tree;

const Cloud = (props) => {

  const handleDelete = (fileKey) => {
    fetch(`${props.host}delete_cloud?name=${fileKey}&chat_id=${props.chat_id}`)
      .then(response => response.json())
      .then(content => props.set_tree(content.nodes))
      .catch(error => console.error('Error fetching file content:', error));
  };


  const renderTreeNodes = (data) =>
    data.map((item) => {
      if (item.children) {
        return (
          <Tree.TreeNode key={item.key} title={item.title}>
            {renderTreeNodes(item.children)}
          </Tree.TreeNode>
        );
      }
      return (
        <Tree.TreeNode
          title={
            <span>
              {item.title}
              <Button type="text" icon={<DeleteOutlined />} onClick={() => handleDelete(item.title)}/>
            </span>
          }
          key={item.key}
          isLeaf
        />
      );
    });

  return (
    <DirectoryTree defaultExpandAll height={500}>
      {renderTreeNodes(props.tree)}
    </DirectoryTree>
  );
};

export default Cloud;
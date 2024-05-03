import React, { useState } from 'react';
import { Button, Input, Row, Col, Timeline } from 'antd';
import {PlusOutlined, DeleteOutlined} from '@ant-design/icons';

const Tree = () => {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [inputValue, setInputValue] = useState('');

  const addItem = () => {
    if (inputValue.trim() !== '') {
      setItems([...items, inputValue]);
      setInputValue('');
    }
  };

  const deleteItem = index => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const reorderItems = (dragIndex, hoverIndex) => {
    const newItems = [...items];
    const draggedItem = newItems[dragIndex];

    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, draggedItem);

    setItems(newItems);
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onPressEnter={addItem}
            placeholder="Add new item"
          />
        </Col>
        <Col span={12}>
          <Button onClick={addItem} type="primary"><PlusOutlined/>Add Item</Button>
        </Col>
      </Row>
      <Timeline>
        {items.map((item, index) => (
          <Timeline.Item key={index}>
            <p>{item}</p>
            <Button type="primary" onClick={() => deleteItem(index)}><DeleteOutlined/></Button>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
};

export default Tree;
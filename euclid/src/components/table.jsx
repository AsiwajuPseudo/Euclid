import React from 'react';
import { Table } from 'antd';

const Tables = (props) => {
  return (
    <Table
      dataSource={props.data}
      columns={props.columns}
      bordered
      sticky
    />
  );
};

export default Tables;

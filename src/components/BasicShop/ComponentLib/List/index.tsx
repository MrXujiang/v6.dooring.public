import React, { memo, useMemo } from 'react'
import { Table } from 'antd'

import { ListConfig } from './schema'

const List: React.FC<ListConfig> = memo(({
  bordered, size, data, toggle, pageSize,
}) => {
  const pagination = useMemo(() => ({
    pageSize: Number(pageSize),
    total: data.length,
  }), [])

  return <Table
    rowKey="name"
    bordered={bordered}
    size={size}
    pagination={toggle ? pagination : false}
    columns={[
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'value',
        key: 'value',
      },
    ]}
    dataSource={data}
  />
})
export default List

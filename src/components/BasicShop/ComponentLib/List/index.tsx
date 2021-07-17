import React, { memo, useMemo } from 'react'
import { Table } from 'antd'

import { ListIcon } from '@/utils/icon/Icons'

import { ListConfig } from './schema'

interface ListConfigType extends ListConfig {
  isTpl: boolean
}

const List: React.FC<ListConfigType> = memo(({
  isTpl,
  bordered, size, data, toggle, pageSize,
}) => {
  const pagination = useMemo(() => ({
    pageSize: Number(pageSize),
    total: data.length,
  }), [])

  return (
    <>
      {isTpl
        ? <ListIcon />
        : (
          <Table
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
        )}
    </>
  )
})
export default List

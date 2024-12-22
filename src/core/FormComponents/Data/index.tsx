import React, { forwardRef, memo, useCallback, useState } from 'react'
import { Button, Modal, message } from 'antd'
import { isString } from 'lodash'

import FormattedMsg from '@/components/FormattedMsg'
import AceEditor from './AceEditor'

export interface DataProps {
  value?: string
  onChange?: (value: string, event?: any) => void | undefined
}

const Data: React.FC<DataProps> = memo(forwardRef(({ value = '', onChange }, _ref) => {
  const [visible, setVisible] = useState<boolean>(false)
  let _val = ''

  const toggloVisible = useCallback(() => {
    if (visible && _val) {
      try {
        JSON.parse(_val)
        onChange && onChange(_val)
      } catch (err) {
        message.error({ style: { zIndex: 10000 }, content: '请输入合法的JSON格式' })
        return
      }
    }
    setVisible(!visible)
  }, [visible])

  const handleChange = (val:string) => {
    _val = val
  }

  return (
    <React.Fragment>
      <Button
        ghost
        type="primary"
        size="small"
        onClick={toggloVisible} >
        <FormattedMsg id="Edit" />
      </Button>
      <Modal
        centered
        width={1000}
        visible={visible}
        title={<FormattedMsg id="Data" />}
        onOk={toggloVisible}
        onCancel={() => setVisible(false)}
        cancelButtonProps={{ ghost: true }}
        okButtonProps={{ ghost: true }}
      >
        <AceEditor
          value={JSON.stringify(
            value && isString(value)
              ? JSON.parse(value)
              : value, null, 2,
          )}
          onChange={handleChange}
        />
      </Modal>
    </React.Fragment>
  )
}))

export default memo(Data)

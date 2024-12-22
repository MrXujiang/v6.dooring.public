import React, { forwardRef, memo, useCallback, useState, useContext } from 'react'
import { Upload, Button, Image, Modal, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import FormattedMsg from '@/components/FormattedMsg'
import { IntlContext } from '@/utils/context/intl'
import { SERVER_URL, getImageUrl } from '@/utils'

import styles from './index.less'

interface BgImgProps {
  data: string[]
  value?: string
  onChange?: Function
}

const BgImg: React.FC<BgImgProps> = memo(forwardRef(({ data = [], value = '', onChange }, _ref) => {
  const formatMsg = useContext<any>(IntlContext)
  const [visible, setVisible] = useState<boolean>(false)

  const toggloVisible = useCallback(() => {
    setVisible(!visible)
  }, [visible])

  const changeBgImg = useCallback(function(url) {
    onChange && onChange(url)
    toggloVisible()
  }, [toggloVisible])

  const onUpload = useCallback((info) => {
    if (info.file.status === 'done') {
      const imageUrl = getImageUrl(info)
      onChange && onChange(imageUrl)
      toggloVisible()
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} ${formatMsg('Uploaded failed')}`)
    }
  }, [toggloVisible])

  return (
    <React.Fragment>
      <Image
        alt="bg"
        preview={false}
        width="100%"
        height={100}
        src={value}
        onClick={toggloVisible}
      />
      <Modal
        centered
        width={1000}
        visible={visible}
        footer={null}
        title={<FormattedMsg id="Gallery" />}
        onCancel={toggloVisible}
        cancelButtonProps={{ ghost: true }}
        okButtonProps={{ ghost: true }}
      >
        <Upload
          name="file"
          action={`${SERVER_URL}/api/v0/files/upload/free`}
          onChange={onUpload}
          showUploadList={false}
        >
          <Button
            type="primary"
            icon={<UploadOutlined />}
          >
            <FormattedMsg id="Click to Upload" />
          </Button>
        </Upload>
        <div className={styles.images}>
          {data.map((item: string) => (
            <Image
              alt="bg"
              preview={false}
              key={item}
              width={200}
              height={100}
              src={item}
              onClick={changeBgImg.bind(this, item)}
            />
          ))}
        </div>
      </Modal>
    </React.Fragment>
  )
}))

export default memo(BgImg)

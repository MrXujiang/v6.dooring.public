import React from 'react'
import { Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

import FormattedMsg from '@/components/FormattedMsg'
import { SERVER_URL, getImageUrl } from '@/utils'

interface UploadComponentProps {
  value?: string
  onChange?: Function
}

class UploadComponent extends React.Component<UploadComponentProps> {
  state = {
    loading: false,
    imageUrl: this.props.value,
  }

  handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      const { onChange } = this.props
      const imageUrl = getImageUrl(info)
      this.setState({
        imageUrl,
        loading: false,
      })
      onChange && onChange(imageUrl)
    }
  };

  render() {
    const { loading, imageUrl } = this.state
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>
          <FormattedMsg id="Upload" />
        </div>
      </div>
    )
    return (
      <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={`${SERVER_URL}/api/v0/files/upload/free`}
        onChange={this.handleChange}
      >
        {imageUrl
          ? <img src={imageUrl} alt="img" style={{ width: '100%' }} />
          : uploadButton}
      </Upload>
    )
  }
}

export default UploadComponent

import React from 'react'
import { Layout } from 'antd'
import { IP_URL, IP_ADDRESS } from '@/utils'

import styles from './index.less'

const { Footer } = Layout

const FooterLayput: React.FC = () => {
  return (
    <Footer className={styles.footer}>
      <a href={IP_URL} target="_blank" rel="noreferrer">
        {IP_ADDRESS}
      </a>
    </Footer>
  )
}

export default FooterLayput

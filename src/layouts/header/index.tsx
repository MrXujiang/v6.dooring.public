import React from 'react'
import { Layout } from 'antd'

import RightContent from './rightContent'

import styles from './index.less'

const { Header } = Layout

const HeaderLayput: React.FC = () => {
  return (
    <Header className={styles.header}>
      <RightContent />
    </Header>
  )
}

export default HeaderLayput

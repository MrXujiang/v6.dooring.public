import React, { useState, useMemo, useEffect } from 'react'
import { Link } from 'umi'
import { Layout, Menu } from 'antd'

import logo from 'assets/logo.png'
import { siderMenus, showMenus } from '../schema'

import styles from './index.less'

interface SiderProps {
  location: { pathname: string };
}

const SiderLayput: React.FC<SiderProps> = ({ location: { pathname } }) => {
  const curKey = useMemo(() => pathname.slice(1), [pathname])

  const [selectedKey, setSelectedKey] = useState<string>(curKey)

  useEffect(() => setSelectedKey(curKey), [pathname])

  return (
    <Layout.Sider className={styles.sider} width={200}>
      <div className={styles.logo}>
        <Link to="/template">
          <img src={logo} alt="logo" width={164} />
        </Link>
      </div>
      <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
        {showMenus(siderMenus)}
      </Menu>
    </Layout.Sider>
  )
}

export default SiderLayput

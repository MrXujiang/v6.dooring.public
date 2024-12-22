import React from 'react'
import { Menu } from 'antd'
import { Link } from 'umi'
import { DatabaseOutlined, FundProjectionScreenOutlined } from '@ant-design/icons'

import FormattedMsg from '@/components/FormattedMsg'

export const siderMenus: any[] = [
  {
    key: 'template',
    icon: <DatabaseOutlined />,
    text: <FormattedMsg id="Template" />,
    path: '/template',
  },
  {
    key: 'screen',
    icon: <FundProjectionScreenOutlined />,
    text: <FormattedMsg id="My screen" />,
    path: '/screen',
  },
]

interface siderMenuList {
  key: number;
  icon: any;
  title: string;
  children: [];
  text: string;
  path: string;
}

export function showMenus(menulist: any[]) {
  return menulist.map((menu: siderMenuList) => {
    if (menu.children) {
      return (
        <Menu.SubMenu key={menu.key} icon={menu.icon} title={menu.title}>
          {showMenus(menu.children)}
        </Menu.SubMenu>
      )
    } else {
      return (
        <Menu.Item key={menu.key} icon={menu.icon} style={{ height: 48, lineHeight: '48px' }}>
          <Link to={menu.path}>{menu.text}</Link>
        </Menu.Item>
      )
    }
  })
}

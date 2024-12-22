import React, { useMemo, useCallback, useContext } from 'react'
import { Dropdown, Menu, Avatar, Input, Popover, Image } from 'antd'
import { history, connect, Dispatch, Link } from 'umi'
import { SettingOutlined, LogoutOutlined, SearchOutlined } from '@ant-design/icons'
import { StateWithHistory } from 'redux-undo'

import FormattedMsg from '@/components/FormattedMsg'
import { IntlContext } from '@/utils/context/intl'
import { CurrentUser } from '@/models/user'
import { title } from '@/utils'
import avatar from '@/assets/avatar.svg'
import group from '@/assets/qtqd_code.png'

import styles from './index.less'

interface RightContentProps {
  currentUser: CurrentUser;
  lang: string;
  dispatch: Dispatch;
}

const RightContent: React.FC<RightContentProps> = ({ currentUser, lang, dispatch }) => {
  const formatMsg = useContext<any>(IntlContext)
  const name = localStorage.getItem('n')?.substring(0, 3)

  const onMenuClick: (params: { key: React.Key }) => void = useCallback(({ key }) => {
    switch (key) {
    case 'logout':
      localStorage.removeItem('n')
      localStorage.removeItem('v6')
      localStorage.removeItem('rp')
      localStorage.removeItem('maxage')
      history.replace('/user/login')
      break
    case 'settings':
      history.push('/modify')
      break
    case 'admin':
      window.open('/admin')
      break
    case 'zh-cn':
      localStorage.setItem(`${title}Lang`, 'zh-cn')
      dispatch({ type: 'user/changeLocale', payload: 'zh-cn' })
      break
    case 'en':
      localStorage.setItem(`${title}Lang`, 'en')
      dispatch({ type: 'user/changeLocale', payload: 'en' })
      break
    }
  }, [])

  // eslint-disable-next-line no-undef
  const actions: JSX.Element = useMemo(
    () => (
      <Menu onClick={onMenuClick}>
        {/* <Menu.Item key="settings">
          <SettingOutlined />
          <FormattedMsg id="Personal Settings" />
        </Menu.Item>
        <Menu.Divider /> */}
        <Menu.Item key="admin">
          <SettingOutlined />
          <FormattedMsg id="admin" />
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <LogoutOutlined />
          <FormattedMsg id="Log out" />
        </Menu.Item>
      </Menu>
    ),
    [],
  )

  // eslint-disable-next-line no-undef
  const globalLanguages: JSX.Element = useMemo(
    () => (
      <Menu selectedKeys={[lang]} onClick={onMenuClick}>
        <Menu.Item key="en">
          <span className={styles.lang}>US</span>
          English
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="zh-cn">
          <span className={styles.lang}>CN</span>
          简体中文
        </Menu.Item>
      </Menu>
    ),
    [lang],
  )

  const testGroup = useMemo(() => (
    <Image
      preview={false}
      src={group}
      alt="group"
      width={235}
     />
  ), [])

  // useEffect(() => {
  //   dispatch({ type: 'user/getUserInfo' })
  // }, [])

  const handleGoLogin = () => {
    history.push('user/login')
  }

  return (
    <div className={styles.rightContent}>
      <Input
        placeholder={formatMsg('Enter search content')}
        className={styles.searchInput}
        prefix={<SearchOutlined className={styles.searchIcon} />}
      />
      <a className={styles.language} href="http://h5.dooring.cn/h5_plus/price" target="_blank">私有化部署</a>
      <Popover
        content={testGroup}
        placement="bottom"
      >
        <a>
          <FormattedMsg id="Technical communication" />
        </a>
      </Popover>
      <a href="https://www.bilibili.com/video/BV19y4y1G7b3/" target="_blank">
        <FormattedMsg id="Video tutorial" />
      </a>
      <a href="http://h5.dooring.cn/doc/zh/guide/product.html" target="_blank">
        <FormattedMsg id="Document" />
      </a>
      {currentUser && currentUser.username
        ? (
          <Dropdown overlayClassName={styles.overlay} overlay={actions} placement="bottomCenter">
            <span className={styles.currentUser}>
              <Avatar
                size="small"
                className={styles.avatar}
                src={currentUser.tx || avatar}
                alt="avatar"
              />
              <span>{currentUser.username}</span>
            </span>
          </Dropdown>
        )
        : (
          name
            ? <Dropdown overlay={actions} placement="bottomCenter">
              <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{name}</Avatar>
            </Dropdown>
            : <div style={{ color: '#fff', cursor: 'pointer', marginRight: '10px' }} onClick={handleGoLogin}><FormattedMsg id="Sign in now" /></div>
        )}
    </div>
  )
}

export default connect((state: StateWithHistory<any>) => ({
  lang: state.present.user.lang,
  currentUser: state.present.user.currentUser,
}))(RightContent)

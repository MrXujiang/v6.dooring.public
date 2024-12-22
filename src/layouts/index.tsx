import React, { useMemo, useCallback } from 'react'
import { connect } from 'umi'
import { ConfigProvider, Layout } from 'antd'
import enUS from 'antd/lib/locale/en_US'
import zhCN from 'antd/lib/locale/zh_CN'
import { StateWithHistory } from 'redux-undo'

import { IntlProvider, createIntl, createIntlCache } from 'react-intl'
import en_US from '@/locales/en'
import zh_CN from '@/locales/zh'

import { IntlContext } from '@/utils/context/intl'
import { IP_URL, IP_ADDRESS } from '@/utils'
import Header from './header'
import Sider from './sider'
// import Footer from './footer'

import styles from './index.less'

const cache = createIntlCache()

const useLayouts = ['/template', '/screen']

interface BasicLayoutProps {
  // eslint-disable-next-line no-undef
  children: JSX.Element;
  location: any;
  lang: string;
}

const BasicLayout: React.FC<BasicLayoutProps> = ({ children, location, lang }) => {
  const getLocale: (lang: string, type: string) => any = useCallback((lang, type) => {
    let language = null
    switch (lang) {
    case 'zh-cn':
      language = type === 'antd' ? zhCN : zh_CN
      break
    case 'en':
      language = type === 'antd' ? enUS : en_US
      break
    }
    return language
  }, [])

  // react-intl
  const intl = useMemo(
    () =>
      createIntl(
        {
          locale: lang,
          messages: getLocale(lang, 'react-intl'),
        },
        cache,
      ),
    [lang],
  )

  const formatMsg = useCallback(
    (id, defaultMsg) =>
      intl.formatMessage({
        id,
        defaultMessage: defaultMsg || id,
      }),
    [intl.locale],
  )

  return (
    <IntlProvider messages={getLocale(lang, 'react-intl')} locale={lang}>
      <ConfigProvider locale={getLocale(lang, 'antd')}>
        <IntlContext.Provider value={formatMsg}>
          {useLayouts.some(item => location.pathname === item)
            ? (
              <Layout className={styles.basicLayout}>
                <Sider location={location} />
                <Layout className={styles.contentLayout}>
                  <Header />
                  <Layout.Content className={styles.content}>
                    {children}
                    <div className={styles.footerBox}>
                      <a href={IP_URL} target="_blank" rel="noreferrer">
                        {IP_ADDRESS}
                      </a>
                    </div>
                  </Layout.Content>
                  {/* <Footer /> */}
                </Layout>
              </Layout>
            )
            : (
              <React.Fragment>{children}</React.Fragment>
            )}
        </IntlContext.Provider>
      </ConfigProvider>
    </IntlProvider>
  )
}

export default connect((state: StateWithHistory<any>) => ({
  lang: 'zh-cn',
}))(BasicLayout)

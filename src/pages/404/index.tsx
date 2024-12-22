import React, { useState, useEffect } from 'react'
import { history } from 'umi'

import FormattedMsg from '@/components/FormattedMsg'
import notFoundImg from '@/assets/404.svg'

import styles from './index.less'

const NotFound = () => {
  const [time, setTime] = useState<number>(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => {
        if (prevTime === 1) {
          history.replace('/')
          return 0
        }
        return Math.max(prevTime - 1, 0)
      })
    }, 1000)
    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [])

  return (
    <div className={styles.notFoundWrapper}>
      <img src={notFoundImg} alt="404" />
      <div>
        <span>
          <FormattedMsg id="Not Found" />
        </span>
        <p>
          <FormattedMsg
            id="NOT_FOUND_DESC"
            values={{
              time,
            }}
          />
        </p>
      </div>
    </div>
  )
}

export default NotFound

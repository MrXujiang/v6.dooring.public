import React from 'react'
import { Popover } from 'antd'
import { InsertRowBelowOutlined } from '@ant-design/icons'
import Draggable from 'react-draggable'

import FormattedMsg from '@/components/FormattedMsg'

import styles from './index.less'

interface CanvasControlProps {
  rightColla: boolean
  scaleNum: number
  handleSlider: Function
}

const fastMenu = (
  <div className={styles.fastMenu}>
    <div className={styles.boardTit}>
      <FormattedMsg id="Shortcuts" />
    </div>
    <div className={styles.keyRow}>
      <span className={styles.key}>
        <code>command + c</code>
        <code>ctrl + c</code>
      </span>
      <span className={styles.text}>
        <FormattedMsg id="Copy components" />
      </span>
    </div>
    <div className={styles.keyRow}>
      <span className={styles.key}>
        <code>delete</code>
        <code>backspace</code>
      </span>
      <span className={styles.text}>
        <FormattedMsg id="Delete components" />
      </span>
    </div>
    <div className={styles.keyRow}>
      <span className={styles.key}>
        <code>
          <FormattedMsg id="Right mouse menu" />
        </code>
        <code>
          <FormattedMsg id="Shortcut keyboard(delete/copy)" />
        </code>
      </span>
    </div>
  </div>
)

const CanvasControl: React.FC<CanvasControlProps> = ({ scaleNum, handleSlider, rightColla }) => {
  return (
    <Draggable>
      <div className={styles.sliderWrap} style={{ right: rightColla ? 80 : 420 }}>
        <span
          className={styles.sliderBtn}
          onClick={handleSlider.bind(this, 1)}
          style={
            scaleNum === 1.5 ? { pointerEvents: 'none' } : { display: 'initial', marginLeft: '13px' }
          }
        >
            +
        </span>
        <span>{Math.floor(scaleNum * 10) * 10}%</span>
        <span
          className={styles.sliderBtn}
          style={scaleNum === 0.2 ? { pointerEvents: 'none' } : { display: 'initial' }}
          onClick={handleSlider.bind(this, 0)}
        >
            -
        </span>
        <span className={styles.backSize}>
          <Popover title={null} content={fastMenu} trigger="hover">
            <InsertRowBelowOutlined />
          </Popover>
        </span>
      </div>
    </Draggable>

  )
}

export default CanvasControl

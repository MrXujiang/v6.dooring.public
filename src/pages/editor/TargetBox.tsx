import React, { useMemo, memo, ReactNode, CSSProperties } from 'react'
import { useDrag } from 'react-dnd'
import classnames from 'classnames'

import schema from '@/components/BasicShop/schema'
import FormattedMsg from '@/components/FormattedMsg'

import styles from './index.less'

interface TargetBoxProps {
  item: any
  children: ReactNode
}

const TargetBox: React.FC<TargetBoxProps> = memo(({ item, children }) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      imgname: item.imgname,
      type: item.type,
      config: schema[item.type as keyof typeof schema].config,
      h: item.h,
      editableEl: schema[item.type as keyof typeof schema].editData,
      category: item.category,
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const containerStyle: CSSProperties = useMemo(() => ({
    opacity: isDragging ? 0.4 : 1,
  }),
  [isDragging])

  return (
    <div
      ref={drag}
      className={classnames(styles.module, { [styles.half]: item.cols === 'half' })}
      style={{ ...containerStyle }}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <FormattedMsg id={item.displayName} />
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  )
})

export default TargetBox

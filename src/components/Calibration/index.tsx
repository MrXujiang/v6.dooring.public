import React, { useEffect, useRef, useCallback } from 'react'

import styles from './index.less'

export type CalibrationTypes = {
  direction: 'up' | 'left' | 'right'
  len: number
  background?: string
}

const Calibration: React.FC<CalibrationTypes> = ({ direction, len, background }) => {
  const calibrationRef = useRef<HTMLDivElement>(null)

  const generateElement = useCallback(
    (item?: boolean, num?: number) => {
      if (calibrationRef.current) {
        const createSpan = document.createElement('div')
        createSpan.style.backgroundColor = '#C4C4C4'
        if (direction === 'up') {
          createSpan.style.width = '1px'
          createSpan.style.height = '6px'
          createSpan.style.display = 'inline-block'
        } else {
          calibrationRef.current.style.flexDirection = 'column'
          createSpan.style.height = '1px'
          createSpan.style.width = '6px'
        }
        if (item) {
          const createSpanContent = document.createElement('span')
          if (direction === 'up') {
            createSpan.style.height = '16px'
            createSpanContent.style.transform = 'translate(2px, 3px) scale(0.83)'
          } else {
            createSpan.style.width = '16px'
            createSpanContent.style.transform = 'translate(4px, 2px) rotate(90deg) scale(0.83)'
          }
          createSpanContent.style.display = 'block'
          createSpanContent.className = 'calibrationNumber'
          createSpanContent.innerHTML = num! * 5 + ''
          createSpan.appendChild(createSpanContent)
        }
        calibrationRef.current.appendChild(createSpan)
      }
    },
    [direction],
  )

  useEffect(() => {
    if (calibrationRef.current) {
      for (let i = -10; i < len / 5; i++) {
        if (i % 10 === 0) {
          generateElement(true, i)
        } else {
          generateElement()
        }
      }
    }
  }, [direction, generateElement])

  return (
    <div
      className={styles.calibration}
      ref={calibrationRef}
      style={{ background: background || '#191B1E' }}
    />
  )
}

export default Calibration

import React from 'react'
import { cloneDeep, isArray, isEmpty } from 'lodash'
import { SketchPicker, ColorResult } from 'react-color'

import { colors } from '@/components/BasicShop/common'
import { rgba2Obj } from '@/utils/tool'

import styles from './index.less'

interface DataType {
  name: string
  value: number
}

// value 初始值传来，onchange item给的回调
interface colorPickerProps {
  data?: string | DataType[]
  value?: string | string[]
  onChange?: (v: string) => void
}

class colorPicker extends React.Component<colorPickerProps> {
  state: any = {
    displayColorPicker: false,
    color: rgba2Obj(!isArray(this.props.value) ? this.props.value : 'rgba(255,255,255,1)'),
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  }

  handleNameClick(name: string) {
    this.setState({ [`displayColorPicker${name}`]: true })
  }

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  }

  handleNameClose(name: string) {
    this.setState({ [`displayColorPicker${name}`]: false })
  }

  handleChange = (color: ColorResult) => {
    const { onChange } = this.props
    this.setState({ color: color.rgb })
    onChange && onChange(`rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`)
  }

  handleNameChange(name: string, index: number, color: ColorResult) {
    const { value, onChange } = this.props
    this.setState({ [`color${name}`]: color.rgb })
    const v = cloneDeep(value) as any
    v[index] = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
    onChange && onChange(v)
  }

  render() {
    const { data, value } = this.props
    return (
      <React.Fragment>
        {isEmpty(data)
          ? (
            <React.Fragment>
              <div className={styles.wrapper}>
                <div
                  className={styles.color}
                  style={{
                    // border: value === 'rgba(0,0,0,0)' ? '1px dashed #ffffff' : 'none',
                    background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
                  }}
                  onClick={this.handleClick}
                />
              </div>
              {this.state.displayColorPicker && (
                <React.Fragment>
                  <div className={styles.modal}>
                    <SketchPicker color={this.state.color} onChange={this.handleChange} />
                  </div>
                  <div className={styles.mask} onClick={this.handleClose} />
                </React.Fragment>
              )}
            </React.Fragment>
          )
          : (
            <React.Fragment>
              {(data as DataType[])?.map((d, index) => (
                <React.Fragment key={d.name}>
                  <div className={styles.wrapper}>
                    <span className={styles.text}>{d.name}:</span>
                    <div
                      className={styles.color}
                      style={{
                        display: 'inline-block',
                        background: value
                          ? value[index % 7]
                            ? value[index % 7]
                            : colors[index % 7]
                          : colors[index % 7],
                      }}
                      onClick={this.handleNameClick.bind(this, d.name)}
                    />
                  </div>
                  {this.state[`displayColorPicker${d.name}`] && (
                    <React.Fragment>
                      <div className={styles.modal}>
                        <SketchPicker
                          color={this.state[`color${d.name}`]}
                          onChange={this.handleNameChange.bind(this, d.name, index)}
                        />
                      </div>
                      <div className={styles.mask} onClick={this.handleNameClose.bind(this, d.name)} />
                    </React.Fragment>
                  )}
                </React.Fragment>
              ))}
            </React.Fragment>
          )}
      </React.Fragment>
    )
  }
}

export default colorPicker

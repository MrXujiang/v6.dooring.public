import React, { memo, useEffect, useCallback, useState } from 'react'
import { Form, Select, InputNumber, Input, Radio, Switch, Collapse } from 'antd'

import FormattedMsg from '@/components/FormattedMsg'
import Table from './FormComponents/Table'
import Upload from './FormComponents/Upload'
import MutiText from './FormComponents/MutiText'
import Color from './FormComponents/Color'
import BgImg from './FormComponents/BgImg'
import Data from './FormComponents/Data'

import styles from './index.less'

const { Option } = Select
const { TextArea } = Input

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

interface FormEditorProps {
  uid: string
  config: Array<any>
  defaultValue: any
  onSave: Function
}

const FormEditor: React.FC<FormEditorProps> = ({ config, defaultValue, onSave, uid }) => {
  const [form] = Form.useForm()
  const [tab, setTab] = useState<string>('config')

  const onFinish = useCallback((values) => {
    onSave(values)
  }, [onSave])

  const handlechange = useCallback(() => {
    // console.log('data: ', form.getFieldsValue())
    onFinish(form.getFieldsValue())
  }, [onFinish])

  const changeTab = useCallback(function(belong) {
    belong !== tab && setTab(belong)
  }, [tab])

  const getStyle = useCallback((belong, value?, key?) => {
    if (tab === belong) {
      if (!value) {
        return {}
      } else if (value !== defaultValue[key]) {
        return { display: 'none' }
      } else {
        return {}
      }
    } else {
      return { display: 'none' }
    }
  }, [tab, defaultValue])

  const getToggleKey = useCallback((item) => {
    if (item.toggle) {
      return 'toggle'
    }
    if (item.dataType) {
      return 'dataType'
    }
  }, [])

  const configRender = useCallback((children: Array<any>) => {
    return children.map((item, i) => (
      <React.Fragment key={i}>
        {item.type === 'Collapse' && (
          <Collapse bordered={false} style={getStyle(item.belong)}>
            <Collapse.Panel forceRender key={item.key} header={<FormattedMsg id={item.name} />}>
              {configRender(item.range)}
            </Collapse.Panel>
          </Collapse>
        )}
        {item.type === 'Number' && (
          <Form.Item
            label={<FormattedMsg id={item.name} />}
            name={item.key}
            style={getStyle(item.belong, item.toggle || item.dataType, getToggleKey(item))}
          >
            <InputNumber
              size="small"
              step={item.step || 1}
              min={item.range && item.range[0]}
              max={item.range && item.range[1]}
            />
          </Form.Item>
        )}
        {item.type === 'Switch' && (
          <Form.Item
            label={<FormattedMsg id={item.name} />}
            name={item.key}
            valuePropName="checked"
            style={getStyle(item.belong, item.toggle || item.dataType, getToggleKey(item))}
          >
            <Switch size="small" />
          </Form.Item>
        )}
        {item.type === 'Text' && (
          <Form.Item
            label={<FormattedMsg id={item.name} />}
            name={item.key}
            style={getStyle(item.belong, item.toggle || item.dataType, getToggleKey(item))}
          >
            <Input size="small" />
          </Form.Item>
        )}
        {item.type === 'TextArea' && (
          <Form.Item
            label={<FormattedMsg id={item.name} />}
            name={item.key}
            style={getStyle(item.belong, item.toggle || item.dataType, getToggleKey(item))}
          >
            <TextArea allowClear autoSize={{ minRows: 2, maxRows: 4 }} size="small" />
          </Form.Item>
        )}
        {item.type === 'Color' && (
          <Form.Item
            label={<FormattedMsg id={item.name} />}
            name={item.key}
            style={getStyle(item.belong, item.toggle || item.dataType, getToggleKey(item))}
          >
            <Color />
          </Form.Item>
        )}
        {item.type === 'MultiColor' && (
          <Form.Item
            label={<FormattedMsg id={item.name} />}
            name={item.key}
            style={getStyle(item.belong, item.toggle || item.dataType, getToggleKey(item))}
          >
            <Color data={defaultValue.data} />
          </Form.Item>
        )}
        {item.type === 'Select' && (
          <Form.Item
            label={<FormattedMsg id={item.name} />}
            name={item.key}
            style={getStyle(item.belong, item.toggle || item.dataType, getToggleKey(item))}
          >
            <Select dropdownClassName="form_editor_select" size="small">
              {item.range.map((v: any, i: number) => {
                return (
                  <Option value={v.key} key={i}>
                    <FormattedMsg id={v.text} />
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
        )}
        {item.type === 'MutiText' && (
          <Form.Item
            label={<FormattedMsg id={item.name} />}
            name={item.key}
            style={getStyle(item.belong, item.toggle || item.dataType, getToggleKey(item))}
          >
            <MutiText />
          </Form.Item>
        )}
        {item.type === 'Table' && (
          <Form.Item
            label={<FormattedMsg id={item.name} />}
            name={item.key}
            valuePropName="data"
            style={getStyle(item.belong, item.toggle || item.dataType, getToggleKey(item))}
          >
            <Table data={item.data} />
          </Form.Item>
        )}
        {item.type === 'Upload' && (
          <Form.Item
            label={<FormattedMsg id={item.name} />}
            name={item.key}
            style={getStyle(item.belong, item.toggle || item.dataType, getToggleKey(item))}
          >
            <Upload />
          </Form.Item>
        )}
        {item.type === 'Radio' && (
          <Form.Item
            label={<FormattedMsg id={item.name} />}
            name={item.key}
            style={getStyle(item.belong, item.toggle || item.dataType, getToggleKey(item))}
          >
            <Radio.Group buttonStyle="solid">
              {item.range.map((v: any, i: number) => {
                return (
                  <Radio className={styles.radio} value={v.key} key={i}>
                    <FormattedMsg id={v.text} />
                  </Radio>
                )
              })}
            </Radio.Group>
          </Form.Item>
        )}
        {item.type === 'BgImg' && (
          <Form.Item
            label={<FormattedMsg id={item.name} />}
            name={item.key}
            style={getStyle(item.belong, item.toggle || item.dataType, getToggleKey(item))}
          >
            <BgImg data={item.range} />
          </Form.Item>
        )}
        {item.type === 'Data' && (
          <Form.Item
            label={<FormattedMsg id={item.name} />}
            name={item.key}
            style={getStyle(item.belong, item.toggle || item.dataType, getToggleKey(item))}
          >
            <Data />
          </Form.Item>
        )}
      </React.Fragment>
    ))
  }, [getStyle])

  useEffect(() => {
    form.setFieldsValue(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    return () => {
      form.resetFields()
    }
  }, [uid, form])

  return (
    <React.Fragment>
      <div className={styles.attr}>
        <div
          className={tab === 'config' ? styles.active : ''}
          onClick={changeTab.bind(this, 'config')}
        >
          <FormattedMsg id="Config" />
        </div>
        {uid !== '001' && (
          <React.Fragment>
            <div
              className={tab === 'data' ? styles.active : ''}
              onClick={changeTab.bind(this, 'data')}
            >
              <FormattedMsg id="Data" />
            </div>
            <div
              className={tab === 'event' ? styles.active : ''}
              onClick={changeTab.bind(this, 'event')}
            >
              <FormattedMsg id="Event" />
            </div>
          </React.Fragment>
        )}
      </div>
      <Form
        className={styles.formScroll}
        form={form}
        name="form_editor"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={defaultValue}
        onValuesChange={handlechange}
      >
        {configRender(config)}
      </Form>
    </React.Fragment>
  )
}

export default memo(FormEditor)

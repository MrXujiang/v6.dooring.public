import React, { useContext, useCallback, useState, useEffect, useMemo } from 'react'
import { Button, message, Switch, Input, Empty, Modal } from 'antd'
import { SaveOutlined } from '@ant-design/icons'
import domtoimage from 'dom-to-image'
import { saveAs } from 'file-saver'
import { isArray, isEmpty } from 'lodash'
import { connect, Dispatch, history } from 'umi'
import { ActionCreators, StateWithHistory } from 'redux-undo'

import FormattedMsg from '@/components/FormattedMsg'
import { ScreenDataType, PointDataType } from '@/pages/editor/models/editorModel'
import { IntlContext } from '@/utils/context/intl'
import {
  LeftIcon, TempIcon, UndoIcon,
  RedoIcon, DeleteIcon, EyeIcon,
  CameraIcon, FileIcon, ReleaseIcon,
} from '@/utils/icon/Icons'
import { uuid } from '@/utils/tool'

import logo from 'assets/logo.png'
import styles from './index.less'

interface HeaderComponentProps {
  pointData: PointDataType[]
  screenData: ScreenDataType
  dispatch: Dispatch
  future: any[]
  past: any[]
  location: any
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({
  pointData, screenData, location,
  dispatch, future, past,
}) => {
  const formatMsg = useContext<any>(IntlContext)
  const [tempVisible, setTempVisible] = useState<boolean>(false)
  const [delVisible, setDelVisible] = useState<boolean>(false)
  const [releaseVisible, setReleaseVisible] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(false)
  const [pwd, setPwd] = useState<string>('')
  const [previewVisible, setPreviewVisible] = useState<boolean>(false)
  const [tpls, setTpls] = useState<any[]>([])

  const rp = useMemo(() => localStorage.getItem('rp'), [localStorage.getItem('rp')])

  const toBack = useCallback(() => history.push('/'), [])

  const toggleTemp = useCallback(() => {
    setTempVisible(!tempVisible)
  }, [tempVisible])

  const importTpl = useCallback((tid: string) => {
    dispatch({ type: 'editorModel/gettpl', payload: tid })
      .finally(() => {
        toggleTemp()
      })
  }, [toggleTemp])

  const redohandler = useCallback(() => {
    dispatch(ActionCreators.redo())
  }, [])

  const undohandler = useCallback(() => {
    dispatch(ActionCreators.undo())
  }, [])

  const toggleDel = useCallback(() => {
    setDelVisible(!delVisible)
  }, [delVisible])

  const clear = useCallback(() => {
    dispatch({ type: 'editorModel/clearAll' })
    toggleDel()
  }, [toggleDel])

  const toPreview = useCallback(() => {
    history.push('/preview')
  }, [])

  const save = useCallback((linkPreview) => {
    localStorage.setItem('pointData', JSON.stringify(pointData))
    const data = {
      tpl: pointData,
      pageConfig: screenData,
      tid: location.query.tid || uuid(10, 10),
      status: 0,
    }
    linkPreview && toPreview()
    message.success(formatMsg('Save success'))
  }, [pointData, screenData, location.query.tid])

  const generatePoster = useCallback(() => {
    if (!screenData.title) {
      message.error(formatMsg('Please enter the screen name'))
      return
    }
    localStorage.setItem('pointData', JSON.stringify(pointData))
    const curEl = document.getElementById('js_canvas') as HTMLElement
    domtoimage.toBlob(curEl)
      .then(function(blob: Blob) {
        saveAs(blob, `${screenData.title}.png`)
      })
      .catch(function(error:any) {
        console.error('oops, something went wrong!', error)
      })
  }, [screenData.title])

  const toggloPreviewVisible = useCallback(() => {
    setPreviewVisible(!previewVisible)
  }, [previewVisible])

  const confirmPreviewModal = useCallback(() => {
    toPreview()
    toggloPreviewVisible()
  }, [toggloPreviewVisible])

  const saveTpl = useCallback(() => {
    if (!screenData.title) {
      message.error(formatMsg('Please enter the screen name'))
      return
    }
    const data = {
      name: screenData.title,
      cate: screenData.cate,
      img: screenData.bg,
      tid: location.query.tid || uuid(10, 10),
      tpl: pointData,
      pageConfig: screenData,
    }
    toggloPreviewVisible()
  }, [screenData, pointData, toggloPreviewVisible])

  const toggleRelease = useCallback(() => {
    setReleaseVisible(!releaseVisible)
  }, [releaseVisible])

  const handleChecked = useCallback(() => {
    setChecked(!checked)
  }, [checked])

  const changePwd = useCallback((e) => {
    setPwd(e.target.value)
  }, [])

  const savev6 = useCallback((pwd?: string) => {
    const data: any = {
      tid: location.query.tid || uuid(10, 10),
      tpl: pointData,
      pageConfig: screenData,
      status: 1,
    }
    pwd && (data.pwd = pwd)
    dispatch({ type: 'editorModel/savev6', payload: data }).then((res: any) => {
      toggloPreviewVisible()
    })
  }, [pointData, screenData, toggloPreviewVisible, location.query.tid])

  const release = useCallback(() => {
    if (!screenData.title) {
      message.error(formatMsg('Please enter the screen name'))
      return
    }
    if (checked && !pwd) {
      message.error(formatMsg('Please enter the template password'))
      return
    }
    toggleRelease()
    savev6(pwd)
  }, [checked, pwd, savev6, toggleRelease])

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Button
          type="text"
          size="large"
          icon={<LeftIcon />}
          onClick={toBack}
        />
        <div className={styles.tempBtn} onClick={toggleTemp}>
          <TempIcon />&nbsp;<FormattedMsg id="Template library" />
        </div>
      </div>
      <div className={styles.center}>
        <Button
          type="text"
          size="large"
          icon={<UndoIcon />}
          title={formatMsg('Undo')}
          onClick={undohandler}
          disabled={!pointData.length || past.length < 2}
        />
        <Button
          type="text"
          size="large"
          icon={<RedoIcon />}
          title={formatMsg('Redo')}
          onClick={redohandler}
          disabled={future.length === 0}
        />
        <Button
          type="text"
          size="large"
          icon={<DeleteIcon />}
          title={formatMsg('Empty')}
          onClick={toggleDel}
          disabled={!pointData.length}
        />
      </div>
      <div className={styles.right}>
        <Button
          type="text"
          size="large"
          icon={<EyeIcon />}
          title={formatMsg('Preview')}
          onClick={save.bind(this, true)}
          disabled={!pointData.length}
        />
        <Button
          type="text"
          size="large"
          icon={<CameraIcon />}
          title={formatMsg('Generate the poster and download it')}
          onClick={generatePoster}
          disabled={!pointData.length}
        />
        <Button
          type="text"
          size="large"
          icon={<FileIcon />}
          title={formatMsg('Save')}
          onClick={save.bind(this, false)}
          disabled={!pointData.length}
        />
        {rp === 'STPV-0' && (
          <Button
            type="text"
            size="large"
            icon={<SaveOutlined />}
            title={formatMsg('Save the template')}
            onClick={saveTpl}
            disabled={!pointData.length}
          />
        )}
        <Button
          type="text"
          size="large"
          icon={<ReleaseIcon />}
          title={formatMsg('Release')}
          onClick={toggleRelease}
          disabled={!pointData.length}
        />
      </div>
      <Modal
        visible={tempVisible}
        title={<FormattedMsg id="Template library" />}
        onCancel={toggleTemp}
        onOk={toggleTemp}
        cancelButtonProps={{ ghost: true }}
        okButtonProps={{ ghost: true }}
        className={styles.templateLibrary}
      >
        {isEmpty(tpls)
          ? <Empty />
          : tpls.map(tmp => (
            <div key={tmp.t} className={styles.tpls}>
              <img src={tmp.img || logo} onClick={importTpl.bind(this, tmp.t)} />
              <div className={styles.text}>{tmp.n || '未命名'}</div>
            </div>
          ))
        }
      </Modal>
      <Modal
        visible={delVisible}
        title={<FormattedMsg id="Operation" />}
        onCancel={toggleDel}
        onOk={clear}
        cancelButtonProps={{ ghost: true }}
        okButtonProps={{ ghost: true }}
      >
        <FormattedMsg id="Make sure to clear the canvas?" />
      </Modal>
      <Modal
        visible={previewVisible}
        title={<FormattedMsg id="Prompt" />}
        onCancel={toggloPreviewVisible}
        onOk={confirmPreviewModal}
        cancelButtonProps={{ ghost: true }}
        okButtonProps={{ ghost: true }}
      >
        <FormattedMsg id="Save successfully, do you want to open preview?" />
      </Modal>
      <Modal
        visible={releaseVisible}
        title={<FormattedMsg id="Release" />}
        onCancel={toggleRelease}
        onOk={release}
        cancelButtonProps={{ ghost: true }}
        okButtonProps={{ ghost: true }}
      >
        <div className={styles.tmp}>
          <FormattedMsg id="Whether to expose templates" />
          &nbsp;
          <Switch
            checkedChildren={<FormattedMsg id="Private" />}
            unCheckedChildren={<FormattedMsg id="Public" />}
            checked={checked}
            onChange={handleChecked}
          />
        </div>
        {checked && (
          <Input.Password
            placeholder={formatMsg('Please enter the template password')}
            value={pwd}
            onChange={changePwd}
          />
        )}
      </Modal>
    </div>
  )
}

export default connect(({ future, past }: StateWithHistory<any>) => ({
  future,
  past,
}))(HeaderComponent)

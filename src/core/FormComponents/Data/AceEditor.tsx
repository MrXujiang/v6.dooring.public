import React from 'react'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-chaos'

import { DataProps } from './index'

const AceEditorComponent: React.FC<DataProps> = ({ value = '', onChange }) => {
  return (
    <AceEditor
      mode="json"
      theme="chaos"
      width="auto"
      tabSize={2}
      debounceChangePeriod={200}
      value={value}
      editorProps={{ $blockScrolling: true }}
      showPrintMargin={false}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
      }}
      onChange={onChange}
    />
  )
}

export default AceEditorComponent

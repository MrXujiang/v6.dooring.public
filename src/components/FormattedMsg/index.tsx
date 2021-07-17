import React from 'react'
import { FormattedMessage } from 'react-intl'

interface FormattedMsgProps {
  id: string;
  defaultMsg?: string;
  description?: string;
  values?: any;
}

const FormattedMsg: React.FC<FormattedMsgProps> = ({ id, defaultMsg, description, values }) => {
  return (
    <FormattedMessage
      id={id}
      defaultMessage={defaultMsg || id}
      description={description}
      values={values}
    />
  )
}

export default FormattedMsg

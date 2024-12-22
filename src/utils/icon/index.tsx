import React from 'react'
import Icon from '@ant-design/icons'

// eslint-disable-next-line no-undef
const CreateIcon: (icon: JSX.Element) => React.FC = img => props => <Icon component={() => img} {...props} />

export default CreateIcon

import React from 'react'
import classNames from 'classnames'
import './style'
const Icon = (props) => {
  const {type, spin, className = '', ...others} = props
  const classString = classNames({
    'md-icon': true,
    [`md-icon-${type}`]: type,
    'md-icon-spin': !!spin || type === 'loading'
  }, className)
  return (<i
    {...others}
    className={classString}
  />)
}

export default Icon

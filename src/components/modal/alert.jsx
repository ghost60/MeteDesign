import React from 'react'
// import classNames from 'classnames'
import Button from '../button'
import './style'
const Alert = (props, className) => {
//   const clsNames = classNames({}, className)

  return (
    <div className='md-modal'>
      <div className='md-mask'>this is mask</div>
      <div className='md-alert'>
        <Button
          type='primary'
          size='large'>
          确认
        </Button>
      </div>
    </div>
  )
}

export default Alert

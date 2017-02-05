import React from 'react'
import ReactDOM from 'react-dom'
import ModalFrame from './modalFrame'
import Icon from '../icon'
import Button from '../button'
import './style'
const Dialog = (...props) => {
    // 对话框类型
  props = Object.assign({}, ...props)
  console.log(props)
  const prefixCls = 'md-modal'
  let type = props.type
  let div = document.createElement('div')
  document.body.appendChild(div)
  let iconType
  switch (type) {
    case 'confirm':
      iconType = 'question'
      break

  }
  let close = () => {
    const unmountResult = ReactDOM.unmountComponentAtNode(div)
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div)
    }
  }
  let body = (
    <div className={`${prefixCls}-dialog-body`}>
      <Icon type={iconType} className={`${prefixCls}-icon-${iconType}`} />
      <span className={`${prefixCls}-title ${prefixCls}-dialog-title`}>{props.title}</span>
      <div className={`${prefixCls}-dialog-content`}>{props.content}</div>
    </div>
    )
  let footer
  if (type === 'confirm') {
    footer = (
      <div className={`${prefixCls}-dialog-footer`}>
        <Button type='default' onClick={close}>
            取消
        </Button>
        <Button type='primary' onClick={close}>
            确定
        </Button>
      </div>
        )
  } else {
    footer = (
      <div className={`${prefixCls}-dialog-footer`}>
        <Button type='primary'>
            确定
        </Button>
      </div>
        )
  }
  ReactDOM.render(
    <ModalFrame visiable style={{width: props.width || '400px'}}>
      {body}
      {footer}
    </ModalFrame>,
  div)
}
export default Dialog

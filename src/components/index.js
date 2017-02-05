import React from 'react'
import { render } from 'react-dom'

import Button from './button'
import Icon from './icon'
import ModalFrame from './modal/modalFrame'
import Dialog from './modal/dialog'
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      showConfirm: false
    }
  }
  render () {
    return (
      <div>
        Mete Design
              <hr />
        <h2>BUTTON</h2>
        <Button type='link' size='large' onClick={() => { window.alert('btn') }}>
          LINK
              </Button>
        <Button type='primary' size='large' onClick={() => { window.alert('btn') }}>
          PRIMARY
              </Button>
        <Button size='large' onClick={() => { window.alert('btn') }}>
          DEFAULT
              </Button>
        <h2>ICON</h2>
        <Icon type='stepbackward' />
        <Icon type='loading' spin />
        <h2>MODAL</h2>
        <Button type='primary' size='small' onClick={() => { this.setState({ showModal: true }) }}>
          普通modal
        </Button>
        <ModalFrame title='this is md-modal' visiable={this.state.showModal} closable onClose={() => { this.setState({ showModal: false }) }}>
          <p>this is p tag</p>
        </ModalFrame>
        <Button onClick={() => { Dialog({type: 'confirm', title: 'confirm', content: 'this is confirm content'}) }}>
          Confirm
          </Button>
      </div>)
  }
}

render(<App />, document.getElementById('root'))

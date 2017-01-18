import React from 'react'
import { render } from 'react-dom'

import Button from './button'
import Icon from './icon'
class App extends React.Component {
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
      </div>)
  }
}

render(<App />, document.getElementById('root'))

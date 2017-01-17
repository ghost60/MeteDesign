import React from 'react'
import { render } from 'react-dom'

import Button from './button'
class App extends React.Component {
  render () {
    return (
      <div>
              Mete Design
              <hr />
        <Button type='button'>
              button
              </Button>
      </div>)
  }
}

render(<App />, document.getElementById('root'))

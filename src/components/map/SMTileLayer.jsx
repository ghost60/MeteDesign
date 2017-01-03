import { PropTypes } from 'react';
import SMCanvasLayer from './SMCanvasLayer';
import {
    GridLayer
}
from 'react-leaflet'

export default class SMTileLayer extends GridLayer {
  static propTypes = {
    opacity: PropTypes.number,
    url: PropTypes.string.isRequired,
    zIndex: PropTypes.number,
  };

  componentWillMount () {
    super.componentWillMount()
    const { url, ...props } = this.props
    this.leafletElement = SMCanvasLayer(url, props)
  }

  componentDidUpdate (prevProps: Object) {
    super.componentDidUpdate(prevProps)
    const { url } = this.props
    if (url !== prevProps.url) {
      this.leafletElement.setUrl(url)
    }
  }
}
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TempoControl extends Component {
  render () {
    return <div className="tempoControl buttonShadow">
      <Tempo className="tempo" />
      <div className="tempoButtonsContainer">
        <TempoButton increase />
        <TempoButton />
      </div>
    </div>
  }
}

class Tempo extends Component {
  render () {
    return <div className="tempo">120</div>
  }
}

class TempoButton extends Component {
  render () {
    const { increase } = this.props
    return increase
      ? <div className="tempoButton">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="20" width="20" viewBox="0 0 100 100">
          <polygon points="50,0 100,100 0,100" />
        </svg>
      </div>
      : <div className="tempoButton">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="20" width="20" viewBox="0 0 100 100">
          <polygon points="0,0 100,0 50,100" />
        </svg>
      </div>
  }
}

TempoButton.propTypes = {
  increase: PropTypes.bool
}

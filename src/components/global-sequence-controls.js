import React, { Component } from 'react'
import PlayControl from './play-control.js'
import TempoControl from './tempo-control.js'
import '../App.css'

export default class GlobalSequenceControls extends Component {
  render () {
    return <div className="globalSequenceControls">
          <PlayControl />
          <TempoControl />
      </div>
  }
}

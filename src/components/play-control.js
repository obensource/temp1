import React, { Component } from 'react'
import { StopButton, PlayButton } from './control-buttons.js'
import '../App.css'

export default class PlayControl extends Component {
  render () {
    return <div className="playControlBody">
      <StopButton />
      <PlayButton />
    </div>
  }
}

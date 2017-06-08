import React, { Component } from 'react'
import '../App.css'

export class StopButton extends Component {
  render () {
    return <div className="controlButton icon iconStop buttonShadow">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 400 400">
        <rect x="120" y="120" strokeMiterlimit="10" width="160" height="160" />
      </svg>
    </div>
  }
}

export class PlayButton extends Component {
  render () {
    return <div className="controlButton icon iconPlay buttonShadow">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 400 400">
        <polygon strokeMiterlimit="10" points="280,200 160,280 160,120" />
      </svg>
    </div>
  }
}
    

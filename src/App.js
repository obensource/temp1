import React, { Component } from 'react'
import './App.css'
import GlobalSequenceControls from './components/global-sequence-controls.js'
import Sequencer from './components/sequencer/sequencer.js'
import PadMatrix from './components/pad-matrix.js'

// header: play/tempo, sequence selector
// Sequence length: provides current length of sequence to pad matrix.
// Pad Matrix: 4 instrumentSequences, 1 light-button matrix

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="appTitle buttonShadow">JS-808</div>
        <GlobalSequenceControls />
        <Sequencer />
        <PadMatrix />
      </div>
    )
  }
}

export default App

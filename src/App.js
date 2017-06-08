import React, { Component } from 'react'
import './App.css'
import GlobalSequenceControls from './components/global-sequence-controls.js'
import Sequencer from './components/sequencer.js'
import PadMatrix from './components/pad-matrix.js'

// header: play/tempo, sequence selector
// Sequence length: provides current length of sequence to pad matrix.
// Pad Matrix: 4 instrumentSequences, 1 light-button matrix

class App extends Component {
  render() {
    return (
      <div className="App">
        <GlobalSequenceControls />
        <Sequencer />
        <PadMatrix />
      </div>
    )
  }
}

export default App

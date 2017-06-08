import React, { Component } from 'react'

export default class Sequencer extends Component {
  render () {
    return <div className="sequencer">
      <SequenceIndex />
      <div className="sequenceSelectorText shadowContainer">SEQUENCE SELECTOR</div>
      <SequenceSelector />
      </div>
  }
}

class SequenceIndex extends Component {
  render () {
    const sequenceCount = Array.apply(null, {length: 16}).map(Number.call, Number)
    return <div className="sequencerIndexContainer shadowContainer">
      {sequenceCount.map((sequenceIndex, i) => {
        return <div key={i} className="sequencerIndex">{i + 1}</div>
      })}
    </div>
  }
}

class SequenceSelector extends Component {
  render () {
    const sequenceCount = Array.apply(null, {length: 16}).map(Number.call, Number)
    return <div className="sequenceSelectorContainer">
      {sequenceCount.map((sequenceIndex, i) => {
        return <div key={i} className="sequenceSelectorCell buttonShadow" />
      })}
    </div>
  }
}

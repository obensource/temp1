import React, { Component } from 'react'

export default class SequenceIndex extends Component {
  render () {
    const sequenceCount = Array.apply(null, {length: 16}).map(Number.call, Number)
    return <div className="sequencerIndexContainer shadowContainer">
      {sequenceCount.map((sequenceIndex, i) => {
        return <div key={i} className="sequencerIndex">{i + 1}</div>
      })}
    </div>
  }
}

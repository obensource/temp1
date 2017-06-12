import React, { Component } from 'react'

export default class SequenceSelector extends Component {
  render () {
    const sequenceCount = Array.apply(null, {length: 16}).map(Number.call, Number)
    return <div className="sequenceSelectorContainer">
      {sequenceCount.map((sequenceIndex, i) => {
        return <div key={i} className="sequenceSelectorCell buttonShadow" />
      })}
    </div>
  }
}

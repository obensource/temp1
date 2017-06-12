import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class PadMatrix extends Component {
  render () {
    return <div className="padMatrixContainer shadowContainer">
      <PadMatrixContainer />
      <CurrentStep />
    </div>
  }
}

class PadMatrixContainer extends Component {
  render () {
    const instrumentsDummyObject = {
      instrumentsNum: 4,
      instrument1: 'KICK',
      instrument2: 'SNARE',
      instrument3: 'OPEN HAT',
      instrument4: 'CLOSED HAT'
    }
    return <div className="padMatrixContainer">
      <PadMatrixRow rowName={instrumentsDummyObject.instrument1} />
      <PadMatrixRow rowName={instrumentsDummyObject.instrument2} />
      <PadMatrixRow rowName={instrumentsDummyObject.instrument3} />
      <PadMatrixRow rowName={instrumentsDummyObject.instrument4} />
    </div>
  }
}

class PadMatrixRow extends Component {
  render () {
    const { rowName } = this.props
    const sequenceCount = Array.apply(null, {length: 16}).map(Number.call, Number)
    return <div>
      <div className="rowName">{rowName}</div>
      <div className="padMatrixRowContainer">
        {sequenceCount.map((sequenceIndex, i) => {
          return i >= 4
            ? i % 4 === 0
              ? <div key={i} className="padMatrixCell buttonShadow">•</div>
              : <div key={i} className="padMatrixCell buttonShadow" />
            : i === 0
              ? <div key={i} className="padMatrixCell buttonShadow">•</div>
              : <div key={i} className="padMatrixCell buttonShadow" />
        })}
      </div>
    </div>
  }
}

PadMatrixRow.propTypes = {
  rowName: PropTypes.string
}

class CurrentStep extends Component {
  render () {
    const stepCount = Array.apply(null, {length: 16}).map(Number.call, Number)
    return <div className="currentStepContainer">
      {stepCount.map((sequenceIndex, i) => {
        return <div key={i} className="stepCell buttonShadow" />
      })}
    </div>
  }
}

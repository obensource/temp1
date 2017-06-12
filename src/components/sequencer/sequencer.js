import React, { Component } from 'react'
import SequenceSelector from './sequence-selector.js'
import SequenceIndex from './sequence-index.js'
import * as DemoSequence from './demo-sequence.json'

// let messageScheduler = null; // Worker thread to send us scheduling messages.
let audioContext;
let masterGainNode;

// let timeoutId;

// let startTime;
// let lastDrawTime = -1;

// let sequences;

// let numberInstruments = 4; // probably don't need
let initialSequenceIndex = 10;
let currentSequence;
// DemoSequence - no let needed

export default class Sequencer extends Component {
  initSequence(sourceSequence) {
    const sequence = {
      sequenceIndex: sourceSequence.sequenceIndex,
      tempo: sourceSequence.tempo,
      kick: sourceSequence.kick.slice(0), // slice(0): pragmatic method for copying the entire array
      snare: sourceSequence.snare.slice(0),
      openHH: sourceSequence.openHH.slice(0),
      closedHH: sourceSequence.closedHH.slice(0)
    }
    return sequence
  }

  // may need to run init on componenOn mount, or initialized context at the top of the app and pass down

  render () {
    const sourceSequence = {
      'sequenceIndex': 0,
      'tempo': 100,
      'kick': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      'snare': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      'openHH': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      'closedHH': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    }
    const sequence = this.initSequence(sourceSequence)
    console.log(sequence)

    // let loopLength = 16;
    // let sequencerIndex = 0;
    // let minTempo = 53;
    // let maxTempo = 180;
    // let noteTime = 0.0;

    // let volumes = [0, 0.3, 1];
    // let sequencerIndexCount = 0;
    
    const instrumentGroup = (name) => {
      this.pathName = () => {
          let pathName = "sounds/drum-samples/" + name + "/"
          return pathName
      };
    
      this.kickBuffer = 0
      this.snareBuffer = 0
      this.openHHBuffer = 0
      this.closedHHBuffer = 0
    
      this.instrumentLoadCount = 0
      
      this.startedLoading = false
      this.isLoaded = false
      
      this.demoIndex = -1
    }
    
    instrumentGroup.setDemoIndex = (index) => {
        this.demoIndex = index
    }
    
    instrumentGroup.load = () => {
        if (this.startedLoading) {
          return
        }
            
        this.startedLoading = true
            
        let pathName = this.pathName()
    
        let kickPath = pathName + "kick.wav"
        let snarePath = pathName + "snare.wav"
        let hihatPath = pathName + "openHH.wav"
        let tom1Path = pathName + "closedHH.wav"
    
        this.loadSample(0, kickPath)
        this.loadSample(1, snarePath)
        this.loadSample(2, hihatPath)
        this.loadSample(3, tom1Path)
    }

    const decodingFunctions = [
      (buffer) => { this.kickBuffer = buffer },
      (buffer) => { this.snareBuffer = buffer },
      (buffer) => { this.openHH = buffer },
      (buffer) => { this.closedHH = buffer }
    ]

    instrumentGroup.loadSample = (sampleID, url) => {
      // Load asynchronously
      let request = new XMLHttpRequest()
      request.open("GET", url, true)
      request.responseType = "arraybuffer"
  
      let sequenceGroup = this
  
      request.onload = function() {
        audioContext.decodeAudioData(request.response, decodingFunctions[sampleID].bind(sequenceGroup))
  
        sequenceGroup.instrumentLoadCount++
        if (sequenceGroup.instrumentLoadCount === sequenceGroup.instrumentCount) {
          sequenceGroup.isLoaded = true
  
          if (sequenceGroup.demoIndex !== -1) {
            DemoSequence[sequenceGroup.demoIndex].setKitLoaded()
          }
        }
      }
      request.send()
    }

    const startLoadingAssets = () => {
        // // Initialize drum kits
        // let numKits = kitName.length;
        // kits = new Array(numKits);
        // for (let i  = 0; i < numKits; i++) {
        //     kits[i] = new Kit(kitName[i]);
        // }  
      
       const InstrumentGroup = new instrumentGroup('js808') // init instrument group ?
        
        // Start loading the assets used by the presets first, in order of the presets.
        for (let demoIndex = 0; demoIndex < 5; ++demoIndex) {
          let group  = DemoSequence[demoIndex].sequenceIndex
          
          // These effects and kits will keep track of a particular demo, so we can change
          // the loading status in the UI.
          group.setDemoIndex(demoIndex)
          
          group.load()
        }
        
        // Setup initial drumkit
        currentSequence = InstrumentGroup[initialSequenceIndex] // TODO: this won't work yet.
    }

    const demoButtonURL = (demoIndex) => {
      let n = demoIndex + 1
      let demoName = "demo" + n
      let url = "images/btn_" + demoName + ".png" // TODO: ADJUST
      return url
    }
    
  function init() {
      // Let the beat demos know when all of their assets have been loaded.
      // Add some new methods to support this.
      for (var i = 0; i < DemoSequence.length; ++i) {
        DemoSequence[i].index = i;
        DemoSequence[i].isKitLoaded = false;
  
        DemoSequence[i].setKitLoaded = () => {
          this.isKitLoaded = true
          this.checkIsLoaded()
        };
  
        DemoSequence[i].setEffectLoaded = () => {
          this.isEffectLoaded = true
          this.checkIsLoaded()
        };
  
        // DemoSequence[i].checkIsLoaded = () => { // TODO: check is loaded if necessary
        //     if (this.isLoaded()) {
        //         showDemoAvailable(this.index); 
        //     }
        // };
  
        DemoSequence[i].isLoaded = () => {
            return this.isKitLoaded
        }
      }
          
      startLoadingAssets()
  
      // NOTE: THIS NOW RELIES ON THE MONKEYPATCH LIBRARY TO LOAD
      // IN CHROME AND SAFARI (until they release unprefixed)
      let context = new AudioContext();
      
      // Create master volume.
      masterGainNode = context.createGain();
      masterGainNode.gain.value = 0.7; // reduce overall volume to avoid clipping
      masterGainNode.connect(context.destination);

      // TODO: event listeners
      // var elKitCombo = document.getElementById('kitcombo');
      // elKitCombo.addEventListener("mousedown", handleKitComboMouseDown, true);
  
      // document.body.addEventListener("mousedown", handleBodyMouseDown, true);
  
      initControls();
      updateControls();
  
      var timerWorkerBlob = new Blob([
          "var timeoutID=0;function schedule(){timeoutID=setTimeout(function(){postMessage('schedule'); schedule();},100);} onmessage = function(e) { if (e.data == 'start') { if (!timeoutID) schedule();} else if (e.data == 'stop') {if (timeoutID) clearTimeout(timeoutID); timeoutID=0;};}"]);
  
      // Obtain a blob URL reference to our worker 'file'.
      var timerWorkerBlobURL = window.URL.createObjectURL(timerWorkerBlob);
  
      timerWorker = new Worker(timerWorkerBlobURL);
      timerWorker.onmessage = function(e) {
        schedule();
      };
      timerWorker.postMessage('init'); // Start the worker.
  
  }

    return <div className="sequencer">
      <SequenceIndex />
      <div className="sequenceSelectorText shadowContainer">SEQUENCE SELECTOR</div>
      <SequenceSelector />
      </div>
  }
}

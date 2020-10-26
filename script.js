/******** Sounds from CodeCamp (untiL I can find my own) *********

'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'    //open hh
'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'    // closed hh

*/


class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayText: "" 
    };

    this.updateDisplayText = this.updateDisplayText.bind(this);
  }

  updateDisplayText(text) {
    this.setState({
      displayText: text 
    });
  }

  render() {
    return (
      React.createElement("div", { className: "container", id: "drum-machine" },
      React.createElement("div", { className: "row" },
      React.createElement("h1", { className: "h1 col-sm-12 text-center my-5" }, "Tom's Drum Machine")),

      React.createElement("div", { className: "row" },
      React.createElement("div", { className: "col-sm-4 mx-auto" },
      React.createElement(Display, { text: this.state.displayText }))),


      React.createElement("div", { className: "row" },
      React.createElement("div", { className: "col-sm-4 mx-auto" },
      React.createElement(DrumPad, { keyFace: "Q", keyCode: "81", action: this.updateDisplayText, soundName: "Heater-1", clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' }),
      React.createElement(DrumPad, { keyFace: "W", keyCode: "87", action: this.updateDisplayText, soundName: "Heater-2", clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' }),
      React.createElement(DrumPad, { keyFace: "E", keyCode: "69", action: this.updateDisplayText, soundName: "Heater-3", clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' }))),


      React.createElement("div", { className: "row" },
      React.createElement("div", { className: "col-sm-4 mx-auto" },
      React.createElement(DrumPad, { keyFace: "A", keyCode: "65", action: this.updateDisplayText, soundName: "Heater-4", clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' }),
      React.createElement(DrumPad, { keyFace: "S", keyCode: "83", action: this.updateDisplayText, soundName: "Clap", clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' }),
      React.createElement(DrumPad, { keyFace: "D", keyCode: "68", action: this.updateDisplayText, soundName: "Open-HH", clip: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' }))),


      React.createElement("div", { className: "row" },
      React.createElement("div", { className: "col-sm-4 mx-auto" },
      React.createElement(DrumPad, { keyFace: "Z", keyCode: "90", action: this.updateDisplayText, soundName: "Kick-n-Hat", clip: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' }),
      React.createElement(DrumPad, { keyFace: "X", keyCode: "88", action: this.updateDisplayText, soundName: "Kick", clip: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' }),
      React.createElement(DrumPad, { keyFace: "C", keyCode: "67", action: this.updateDisplayText, soundName: "Closed-HH", clip: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' })))));

  }}


function Display(props) {
  return (
    React.createElement("p", { className: "h3 text-light text-center border rounded bg-dark", style: { height: "40px" }, id: "display" }, props.text)
  );
}

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonStyle: "btn-secondary" 
    };

    this.playSound = this.playSound.bind(this);
    this.resetButton = this.resetButton.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  playSound() {
    this.props.action(this.props.soundName);
    this.setState({
      buttonStyle: "btn-primary" 
    });

    setTimeout(() => {this.resetButton();}, 100);
    let sound = document.getElementById(this.props.keyFace);
    sound.currentTime = 0;
    sound.play();
  }

  resetButton() {
    this.setState({
      buttonStyle: "btn-secondary" 
    });
  }

  handleKeyPress(event) {
    if (event.keyCode == this.props.keyCode) {
      this.playSound();
    }
  }

  render() {
    let name = "h4 text-light text-center drum-pad btn col-sm-4 border " + this.state.buttonStyle;
    return (
      React.createElement("p", { className: name, onClick: this.playSound, id: this.props.soundName }, this.props.keyFace, React.createElement("audio", { className: "clip", id: this.props.keyFace, src: this.props.clip }))
    );
  }
}


ReactDOM.render(React.createElement(DrumMachine, null), document.getElementById("root"));
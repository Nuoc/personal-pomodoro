import React, { Component } from 'react';
import './App.css';
import Button from 'material-ui/Button';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import teal from 'material-ui/colors/teal';
import grey from 'material-ui/colors/grey';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import NavigationIcon from 'material-ui-icons/Navigation';

const theme = createMuiTheme({
  palette: createPalette({
    primary: teal, // Purple and green play nicely together.
    accent: grey
  })
});

const Focus = props => {
  return (
    <div className="time-selector">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '200px'
        }}
      >
        <IconButton
          onClick={() => {
            props.handleCount(1);
          }}
          type="submit"
          style={{
            position: 'absolute',
            left: '342',
            top: '325'
          }}
        >
          <NavigationIcon color="#9E9E9E" />
        </IconButton>
        <IconButton
          onClick={() => {
            props.handleCount(2);
          }}
          type="submit"
          style={{
            transform: 'rotate(180deg)',
            position: 'absolute',
            right: '33%',
            top: '50%'
          }}
        >
          <NavigationIcon color="#9E9E9E" />
        </IconButton>
      </div>
    </div>
  );
};

const TimerDisplay = props => {
  const minutes = props.min < 10 ? `0${props.min}` : props.min;
  const seconds = props.sec < 10 ? `0${props.sec}` : props.sec;
  return (
    <div>
      {props.countdown === false
        ? <div>
            {minutes}:00
          </div>
        : <div>
            {minutes}:{seconds}
          </div>}
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: true,
      min: this.props.min,
      sec: this.props.sec,
      countdownOn: false
    };
    this.reset = this.reset.bind(this);
    this.countdown = this.countdown.bind(this);
    this.handleCount = this.handleCount.bind(this);
  }

  handleCount(id) {
    const minutes = this.state.min;
    if (id === 1) {
      this.setState({ min: minutes + 1 });
    } else if (id === 2) {
      this.setState({ min: minutes - 1 });
    }
  }

  countdown() {
    const stopper = 0;
    this.setState({ countdownOn: true, min: this.state.min - 1 });
    this.interval = window.setInterval(() => {
      const currentSec = this.state.sec;
      const currentMin = this.state.min;
      if (this.state.min === stopper) {
        this.setState({ min: this.props.min });
        window.clearInterval(this.interval);
      }
      if (currentSec === stopper) {
        this.setState({
          sec: this.props.sec,
          min: currentMin - 1
        });
      } else {
        this.setState({ sec: currentSec - 1 });
      }
    }, 1000);
  }

  reset() {
    window.clearInterval(this.interval);
    this.setState({
      min: this.props.min,
      sec: this.props.sec,
      countdownOn: false
    });
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Paper className="time-display">
            <h1 style={{ opacity: '.5' }}>focus</h1>
            <TimerDisplay
              min={this.state.min}
              sec={this.state.sec}
              countdown={this.state.countdownOn}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                width: '250px'
              }}
            >
              <Button
                raised={true}
                color="primary"
                disableFocusRipple={true}
                type="submit"
                onClick={this.countdown}
              >
                Start
              </Button>
              <Button
                raised={true}
                color="primary"
                disableFocusRipple={true}
                type="submit"
                onClick={this.reset}
              >
                Reset
              </Button>
            </div>
          </Paper>
          <Focus handleCount={this.handleCount} min={this.state.min} />
        </div>
      </MuiThemeProvider>
    );
  }
}

App.defaultProps = {
  min: 25,
  sec: 59
};

export default App;

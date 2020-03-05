class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      main: 'blue',
      mainNum: 255,
      other: 0,
      screen: 'start'
    }
    this.changeUp = this.changeUp.bind(this);
    this.changeDown = this.changeDown.bind(this);
    this.changeLeft = this.changeLeft.bind(this);
    this.changeRight = this.changeRight.bind(this);
    this.exploreGreen = this.exploreGreen.bind(this);
    this.exploreRed = this.exploreRed.bind(this);
    this.exploreBlue = this.exploreBlue.bind(this);
    this.backToSelect = this.backToSelect.bind(this);
  }
  
  changeUp() {
    if (this.state.mainNum < 255) {
      this.setState((state) => ({mainNum: state.mainNum + 5}));
    }
  }
  changeDown() {
    if (this.state.mainNum > 0) {
      this.setState((state) => ({mainNum: state.mainNum - 5}));
    }
  }
  changeLeft() {
    if (this.state.other < 255) {
      this.setState((state) => ({other: state.other + 5}));
    }
  }
  changeRight() {
    if (this.state.other > 0) {
      this.setState((state) => ({other: state.other - 5}));
    }
  }
  
  exploreRed() {
    this.setState({
      main: 'red',
      screen: 'explore'
    });
  }
  exploreGreen() {
    this.setState({
      main: 'green',
      screen: 'explore'
    });
  }
  exploreBlue() {
    this.setState({
      main: 'blue',
      screen: 'explore'
    });
  }
  
  backToSelect() {
    this.setState({
      mainNum: 255,
      other: 0,
      screen: 'start'});
  }
  
  render() {
    if (this.state.screen == 'start') {
      return (
        <div>
          <StartScreen green={this.exploreGreen} red={this.exploreRed} blue={this.exploreBlue} />
        </div>
      );
    } else if (this.state.screen == 'explore') {
      return (
        <div>
          <ExploreScreen main={this.state.main} other={this.state.other} mainNum={this.state.mainNum} />
          <Buttons up={this.changeUp} down={this.changeDown} left={this.changeLeft} right={this.changeRight} back={this.backToSelect} />
        </div>
      );
    };
  }
}

function StartScreen(props) {
  return(
    <div>
      <h1>Please select a color to explore</h1>
      <button onClick={props.red}>Red</button>
      <button onClick={props.green}>Green</button>
      <button onClick={props.blue}>Blue</button>
    </div>
  );
}

function Buttons(props) {
  return (
    <div>
      <button onClick={props.up}>Up</button>
      <button onClick={props.down}>Down</button>
      <button onClick={props.left}>Left</button>
      <button onClick={props.right}>Right</button>
      <br/>
      <button onClick={props.back}>Explore another color</button>
    </div>
  );
}

function ExploreScreen(props) {
  const main = props.main;
  const mainNum = props.mainNum;
  const other = props.other;
  if (main == 'blue') {
    styles = {backgroundColor: `rgb(${other}, ${other}, ${mainNum})`,
             width: '400px',
             height: '400px',
             border: '2px solid black'};
  } else if (main == 'red') {
    styles = {backgroundColor: `rgb(${mainNum}, ${other}, ${other})`,
             width: '400px',
             height: '400px',
             border: '2px solid black'}
  } else if (main == 'green') {
    styles = {backgroundColor: `rgb(${other}, ${mainNum}, ${other})`,
             width: '400px',
             height: '400px',
             border: '2px solid black'}
  }
  const coordX = (255 - other) / 5;
  const coordY = mainNum / 5;
  return (
    <div id='screen' style={styles}>
      <h1>({coordX}, {coordY})</h1>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

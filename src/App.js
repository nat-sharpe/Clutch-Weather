import React, {Component} from 'react';
import Main from './components/main';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      locations: ['Atlanta', 'San Francisco'],
      currentLocation: 'Atlanta'
    };
  };

  componentDidMount() {
    const getWeather = () => {
      fetch(`https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${this.state.currentLocation}")&format=json`)
        .then(data => {
          console.log(data);
          const jsonResult = data.json();
          jsonResult.then(parsedData => {
            console.log(parsedData.query.results.channel.item.condition.temp);
          });
        }) 
    };
    getWeather();
  };

  render() {
    return (
      <Main />
    );
  };
};

export default App;

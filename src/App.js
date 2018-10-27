import React, {Component} from 'react';
import Main from './components/main';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      locations: ['Atlanta', 'San Francisco'],
      currentLocation: {
        city: 'Atlanta',
        state: 'GA'
      },
      forecast: [
        {
          day: 'Sat',
          high: '32',
          low: '28',
          text: 'Sunny'     
        },
        {
          day: 'Sun',
          high: '31',
          low: '26',
          text: 'Mostly Sunny'     
        }
      ]
    };
  };

  componentDidMount() {
    const getWeather = () => {
      fetch(`https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${this.state.currentLocation.city}, ${this.state.currentLocation.state}")&format=json`)
        .then(data => {
          const jsonResult = data.json();
          jsonResult.then(parsedData => {
            console.log(parsedData.query.results.channel.location.city);
            console.log(parsedData.query.results.channel.item.condition.text);
            console.log(parsedData.query.results.channel.item.condition.temp);
            const nextFourDays = parsedData.query.results.channel.item.forecast;
            for (let ii = 0; ii < 4; ii++) {
              console.log(nextFourDays[ii].day);
              console.log(nextFourDays[ii].text);
              console.log(nextFourDays[ii].high);
              console.log(nextFourDays[ii].low);
            };
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

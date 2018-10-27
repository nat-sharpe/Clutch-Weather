import React, {Component} from 'react';
import Main from './components/main';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      savedLocations: [
        {
          city: 'Atlanta',
          state: 'GA'
        }
      ],
      currentLocation: {
        city: 'Atlanta',
        state: 'GA'
      },
      currentCondition: {},
      currentForecast: []
    };
  };

  componentDidMount() {
    const getWeather = () => {
      fetch(`https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${this.state.currentLocation.city}, ${this.state.currentLocation.state}")&format=json`)
        .then(data => {
          const jsonResult = data.json();
          jsonResult.then(parsedData => {
            const conditionData = {
              city: parsedData.query.results.channel.location.city,
              text: parsedData.query.results.channel.item.condition.text,
              temp: parsedData.query.results.channel.item.condition.temp
            };
            this.setState({
              currentCondition: conditionData
            })
            console.log(this.state.currentCondition)
            const nextFourDays = parsedData.query.results.channel.item.forecast;
            for (let ii = 0; ii < 4; ii++) {
              let dayData = {
                day: nextFourDays[ii].day,
                text: nextFourDays[ii].text,     
                high: nextFourDays[ii].high,
                low: nextFourDays[ii].low
              };
              this.setState({ 
                currentForecast: [
                  ...this.state.currentForecast, 
                  dayData
                ]
              }); 
            };
            console.log(this.state.currentForecast)
          });
        }) 
    };
    getWeather();
  };

  render() {
    return (
      <Main state={this.state}/>
    );
  };
};

export default App;

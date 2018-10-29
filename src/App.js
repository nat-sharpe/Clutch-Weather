import React, {Component} from 'react';
import Main from './components/main';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      savedLocations: [
        {
          city: 'Atlanta',
          region: 'GA'
        },
        {
          city: 'New York',
          region: 'NY'
        },
        {
          city: 'San Francisco',
          region: 'CA'
        }
      ],
      currentLocation: {
        city: 'Atlanta',
        region: 'GA',
        index: 0
      },
      currentCondition: {},
      currentForecast: [],
    };
  };

  getWeather = () => {
    fetch(`https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${this.state.currentLocation.city}, ${this.state.currentLocation.region}")&format=json`)
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
          let dayArray = [];
          for (let ii = 0; ii < 4; ii++) {
            let dayData = {
              day: nextFourDays[ii].day,
              text: nextFourDays[ii].text,     
              high: nextFourDays[ii].high,
              low: nextFourDays[ii].low
            };
            dayArray.push(dayData);
          };
          this.setState({ 
            currentForecast: dayArray
          }); 
        });
      }) 
    };

  toggleCity = () => {
    const nextIndex = (this.state.currentLocation.index + 1);
    const newLocation = {
      city: this.state.savedLocations[nextIndex].city,
      region: this.state.savedLocations[nextIndex].region,
      index: nextIndex
    };
    this.setState({ 
      currentLocation: newLocation
    }, 
      this.getWeather);
  };

  componentDidMount() {
    this.getWeather();
  };

  render() {
    return (
      <Main state={this.state} toggleCity={this.toggleCity}/>
    );
  };
};

export default App;

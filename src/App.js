import React, {Component} from 'react';
import Main from './components/main';
import Choose from './components/choose';

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
      showMain: true,
      showChoose: true,
      showAdd: false,
    };
  };

  getWeather = () => {
    console.log('city' + this.state.currentLocation.city)
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

  componentDidMount() {
    this.getWeather();
  };

  toggleLocation = () => {
    let nextIndex; 
    if (this.state.currentLocation.index === (this.state.savedLocations.length - 1)) {
      nextIndex = 0; 
    } else {
      nextIndex = (this.state.currentLocation.index + 1); 
    };
    const newLocation = {
      city: this.state.savedLocations[nextIndex].city,
      region: this.state.savedLocations[nextIndex].region,
      index: nextIndex
    };
    console.log(newLocation)
    this.setState({ 
      currentLocation: newLocation
    }, 
      this.getWeather);
  };

  chooseLocation = () => {
    let nextIndex; 
    if (this.state.currentLocation.index === (this.state.savedLocations.length - 1)) {
      nextIndex = 0; 
    } else {
      nextIndex = (this.state.currentLocation.index + 1); 
    };
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

  render() {
    if (this.state.showMain) {
      return <Main state={this.state} toggleLocation={this.toggleLocation}/>
    } else if (this.state.showChoose) {
      return <Choose state={this.state} />
    }
  };
};

export default App;

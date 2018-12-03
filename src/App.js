import React, { Component } from 'react';
import './App.css';
import SingleLocation from './containers/SingleLocation';
import EveryLocation from './containers/EveryLocation';
import AddLocation from './containers/AddLocation';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      savedLocations: [],
      currentLocation: {},
      currentCondition: {},
      currentForecast: [],
      visiblePage: 'single',
      matchingCities: [],
      viewInfo: false
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
          temp: parsedData.query.results.channel.item.condition.temp,
          info: [
            {type: 'Sunrise',
            value: parsedData.query.results.channel.astronomy.sunrise},
            {type: 'Sunset',
            value: parsedData.query.results.channel.astronomy.sunset},
            {type: 'Wind',
            value: `${parsedData.query.results.channel.wind.speed} mph`},
            {type: 'Humidity',
            value: `${parsedData.query.results.channel.atmosphere.humidity}%`}
          ]
        };

        this.setState({
          currentCondition: conditionData
        });
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
    const checkStorage = localStorage.getItem('saved-locations');
    let savedLocations = [];
    if (checkStorage) {
      savedLocations = JSON.parse(checkStorage);
    } else {
      savedLocations = [
        {
          city: 'Atlanta',
          region: 'GA',
          uniqueId: 'default_location'
        }
      ];
    };
    console.log(savedLocations)
    this.setState({
      savedLocations: savedLocations,
      currentLocation: {
        ...savedLocations[0],
        index: 0
      }
    }, 
    () => {
      this.getWeather();
    });
  };

  toggleLocation = (direction) => {
  
    const currentIndex = this.state.currentLocation.index;
    let nextIndex; 

    if (direction === 'left') {
      nextIndex = (currentIndex === 0) ? this.state.savedLocations.length - 1 : currentIndex - 1; 
    } else if (direction === 'right') {
      nextIndex = (currentIndex === this.state.savedLocations.length - 1) ? 0 : currentIndex + 1; 
    }

    const newLocation = {
      city: this.state.savedLocations[nextIndex].city,
      region: this.state.savedLocations[nextIndex].region,
      index: nextIndex
    };
    this.setState({ 
      currentLocation: newLocation,
      viewInfo: false
    }, 
      this.getWeather);
  };

  toggleLeft = () => {
    this.toggleLocation('left');
  };

  toggleRight = () => {
    this.toggleLocation('right');
  };

  viewEvery = () => {
    this.setState({ 
      visiblePage: 'every',
      viewInfo: false
    })
  };

  viewSingle = index => {
    const location = this.state.savedLocations[index];
    this.setState({
      visiblePage: 'single',
      currentLocation: {
        city: location.city,
        region: location.region,
        index: index,
      }
    }, () => this.getWeather());
  };

  viewAdd = () => {
    this.setState({
      visiblePage: 'add',
    });
  };

  deleteLocation = uniqueId => {
    const newArray = this.state.savedLocations.filter(location => location.uniqueId !== uniqueId);
    this.setState({
      savedLocations: newArray
    }, () => localStorage.setItem('saved-locations', JSON.stringify(this.state.savedLocations)));
  };

  addNew = location => {
    this.setState({
      visiblePage: 'every',
      matchingCities: [],
      savedLocations: [...this.state.savedLocations, location],
      currentLocation: {
        city: location.city,
        region: location.region,
        id: location.uniqueId,
        index: this.state.savedLocations.length
      }
    }, () => {
      localStorage.setItem('saved-locations', JSON.stringify(this.state.savedLocations));
      this.getWeather();
    });
  };

  getMatches = (inputCity) => {
    fetch(`https://query.yahooapis.com/v1/public/yql?q=select * from geo.places(all) where text="${inputCity}*" and country = "United States"&format=json`)
    .then(data => {
      const jsonResult = data.json();
      jsonResult.then(parsedData => {
        let matchingCities = [];
        const results = parsedData.query.results;
        let uniqueId = 'id-city' + Math.random().toString(36).substr(2, 16);
        if (results && Array.isArray(results.place)) {
          results.place.forEach(place => {
            matchingCities.push({
              city: place.name,
              region: (place.admin1 && place.admin1.code !== '') ? place.admin1.code.slice(3) : place.country.content,
              uniqueId: uniqueId
            });
          });
        } else if (results && results.place) {
          matchingCities.push({
            city: results.place.name,
            region: (results.place.admin1 && results.place.admin1.code !== '') ? results.place.admin1.code.slice(3) : results.place.country.content,
            uniqueId: uniqueId
          });
        }
        this.setState({
          matchingCities: matchingCities
        }, () => console.log(this.state.matchingCities))
      })
    }); 
  };

  toggleInfo = () => {
    console.log('here')
    this.setState({
      viewInfo: !this.state.viewInfo,
    })
  };

  render() {
    let page;
    if (this.state.visiblePage === 'single') {
      page = <SingleLocation 
        state={this.state} 
        toggleLeft={this.toggleLeft}
        toggleRight={this.toggleRight}  
        viewEvery={this.viewEvery}
        toggleInfo={this.toggleInfo} 
      />
    } else if (this.state.visiblePage === 'every') {
      page = <EveryLocation 
        state={this.state} 
        deleteLocation={this.deleteLocation} 
        viewSingle={this.viewSingle}
        viewAdd={this.viewAdd}
      />
    } else if (this.state.visiblePage === 'add') {
      page = <AddLocation 
        state={this.state}
        getMatches={this.getMatches} 
        addNew={this.addNew}
      />
    };

    return (
      <div className='app'>
        {page}
      </div>
    )
  };
};

export default App;

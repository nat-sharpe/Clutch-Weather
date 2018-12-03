import React, {Component} from 'react';
import './styles/single.css'

class SingleLocation extends Component {
  render() {
    let forecastOrInfo = [];
    let toggleMessage = '';

    if (this.props.state.viewInfo) {
      const infoData = this.props.state.currentCondition.info;
      toggleMessage = 'Forecast';
      infoData.forEach((info, index) => {
        forecastOrInfo.push(
          <li className="info-row" key={index}>
            <p className="row-title">{info.type}</p>
            <p className="row-data">{info.value}</p>
          </li>
        )
      });
    } else {
      const forecastData = this.props.state.currentForecast;
      toggleMessage = 'More Data';
      forecastData.forEach((dayData, index) => {
        let day = (index === 0) ? 'Today' : dayData.day;
        forecastOrInfo.push(
          <li className="forecast-row" key={index}>
            <p className="row-day">{day}</p>
            <p className="row-weather">{dayData.text}</p>
            <p className="row-high">{dayData.high}°</p>
            <p className="row-low">{dayData.low}°</p>
          </li>
        )
      });
    };

    return (
      <div className="single-main">
        <div className="current">
          <h2 className="current-city">{this.props.state.currentLocation.city}</h2>
          <p className="current-weather" >{this.props.state.currentCondition.text}</p>
          <h1 className="current-temp">{this.props.state.currentCondition.temp}°</h1>
        </div>
        <div className="forecast-or-info">
          {forecastOrInfo}
        </div>
        <div className="toggle-info">
          <button onClick={this.props.toggleInfo} type="button">{toggleMessage}</button>
        </div>
        <div className="footer">
          <div className="toggle-location">
            <button onClick={this.props.toggleLeft} type="button">{'<'}</button>
          </div>  
          <div className="location-all">
            <button onClick={this.props.viewEvery} type="button">Your Locations</button>
          </div> 
          <div className="toggle-location">
            <button onClick={this.props.toggleRight} type="button">{'>'}</button>
          </div>  
        </div>
      </div>
    );
  };
};

export default SingleLocation;
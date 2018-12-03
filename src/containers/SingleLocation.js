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
            <h3 className="row-data">{info.value}</h3>
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
          <h1 className="current-temp">{this.props.state.currentCondition.temp}</h1>
        </div>
        <hr className="line"/>
        <div className="forecast-or-info">
          {forecastOrInfo}
        </div>
        <div className="toggle-info" onClick={this.props.toggleInfo}>
          <h3>{toggleMessage}</h3>
        </div>
        <div className="footer">
          <div className="toggle-location" onClick={this.props.toggleLeft}>
            <h3>{'<'}</h3>
          </div>  
          <div className="view-every" onClick={this.props.viewEvery}>
            <h3>Your Locations</h3>
          </div> 
          <div className="toggle-location" onClick={this.props.toggleRight}>
            <h3>{'>'}</h3>
          </div>  
        </div>
      </div>
    );
  };
};

export default SingleLocation;
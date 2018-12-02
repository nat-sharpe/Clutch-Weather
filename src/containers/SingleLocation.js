import React, {Component} from 'react';
import './single.css'

class SingleLocation extends Component {
  render() {
    const forecastRows = [];
    const forecastData = this.props.state.currentForecast;

    forecastData.forEach((dayData, index) => {
      let day = (index === 0) ? 'Today' : dayData.day;
      forecastRows.push(
        <li className="forecast-row" key={index}>
          <p className="row-day">{day}</p>
          <p className="row-weather">{dayData.text}</p>
          <p className="row-high">{dayData.high}°</p>
          <p className="row-low">{dayData.low}°</p>
        </li>
      )
    });

    return (
      <div className="single-main">
        <div className="current">
          <h2 className="current-city">{this.props.state.currentLocation.city}</h2>
          <p className="current-weather" >{this.props.state.currentCondition.text}</p>
          <h1 className="current-temp">{this.props.state.currentCondition.temp}°</h1>
        </div>
        <div className="forecast">
          {forecastRows}
        </div>
        <div className="footer">
          <div className="toggle">
            <button onClick={this.props.toggleLeft} type="button">{'<'}</button>
          </div>  
          <div className="location-all">
            <button onClick={this.props.viewEvery} type="button">Your Locations</button>
          </div> 
          <div className="toggle">
            <button onClick={this.props.toggleRight} type="button">{'>'}</button>
          </div>  
        </div>
      </div>
    );
  };
};

export default SingleLocation;
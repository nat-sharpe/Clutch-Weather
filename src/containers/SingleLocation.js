import React, {Component} from 'react';

class SingleLocation extends Component {
  render() {
    const forecastRows = [];
    const forecastData = this.props.state.currentForecast;
    forecastData.forEach((dayData, index) => {
      let day = (index === 0) ? 'Today' : dayData.day;
      forecastRows.push(
        <li className="forecast-row" key={index}>
          <p>{day}</p>
          <p>{dayData.text}</p>
          <p>{dayData.high}°</p>
          <p>{dayData.low}°</p>
        </li>
      )
    });
    return (
      <div className="main">
        <div className="header">
          <h1>Clutch Weather</h1>
        </div>
        <div className="current">
          <h2>{this.props.state.currentCondition.city}</h2>
          <h3>{this.props.state.currentCondition.text}</h3>
          <h1>{this.props.state.currentCondition.temp}°</h1>
        </div>
        <ul className="forecast">
          {forecastRows}
        </ul>
        <div className="nav">
          <div className="location-toggle">
            <button onClick={this.props.toggleLocation} type="button">Toggle Locations</button>
          </div>  
          <div className="location-all">
            <button onClick={this.props.chooseLocation} type="button">All Locations</button>
          </div> 
        </div>
      </div>
    );
  };
};

export default SingleLocation;
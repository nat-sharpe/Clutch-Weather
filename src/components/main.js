import React, {Component} from 'react';

class Main extends Component {
  render() {
    return (
      <div className="main">
        <div className="header">
          <h1>Clutch Weather</h1>
        </div>
        <div className="current">
          <h2>Atlanta</h2>
          <h3>Cloudy</h3>
          <h1>41°</h1>
        </div>
        <ul className="forecast">
          <li className="forecast-row">
            <p>Today</p>
            <p>Cloudy</p>
            <p>20°</p>
            <p>60°</p>
          </li>
          <li className="forecast-row">
            <p>Tuesday</p>
            <p>Sunny</p>
            <p>30°</p>
            <p>40°</p>
          </li>
          <li className="forecast-row">
            <p>Wednesday</p>
            <p>Cloudy</p>
            <p>40°</p>
            <p>50°</p>
          </li>
          <li className="forecast-row">
            <p>Thursday</p>
            <p>Rainy</p>
            <p>20°</p>
            <p>50°</p>
          </li>
        </ul>
        <div className="nav">
          <div className="location-toggle">
            <h3>Toggle Locations</h3>
          </div>  
          <div className="location-all">
            <h3>All Locations</h3>
          </div>
        </div>
      </div>
    );
  };
};

export default Main;
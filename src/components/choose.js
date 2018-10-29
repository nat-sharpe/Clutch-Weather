import React, {Component} from 'react';

class Choose extends Component {
  render() {
    const locationRows = [];
    const locations = this.props.state.savedLocations;
    locations.forEach((location, index) => {
      locationRows.push(
        <li className="location-row" key={index}>
          <p>{location.city}</p>
        </li>
      )
    });
    return (
      <div className="choose">
        <ul className="forecast">
          {locationRows}
        </ul>
        <div className="nav">
          <div className="add-location">
            <button onClick={this.props.addLocation} type="button">Add Location</button>
          </div>
        </div>
      </div>
    );
  };
};

export default Choose;
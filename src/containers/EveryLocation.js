import React, {Component} from 'react';
import './every.css';

class EveryLocation extends Component {
  render() {

    const locationRows = [];
    const locations = this.props.state.savedLocations;

    locations.forEach((location, index) => {
      const handleView = () => this.props.viewSingle(index);

      const handleDelete = () => this.props.deleteLocation(location.uniqueId);

      const deleteButton = 
        (locations.length > 1) ? 
        <button className="row-delete" onClick={handleDelete}>X</button> :
        null;

      locationRows.push(
        <li className="locations-row" key={index}>
          <h3 className="row-city" onClick={handleView}>{`${location.city}, ${location.region}`}</h3>
          {deleteButton}
        </li>
      )
    });

    return (
      <div className="every-main">
        <div className="locations">
          {locationRows}
        </div>
        <div className="nav">
          <div className="add-location">
            <button onClick={this.props.viewAdd} type="button">Add Location</button>
          </div>
        </div>
      </div>
    );
  };
};

export default EveryLocation;
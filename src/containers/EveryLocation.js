import React, {Component} from 'react';
import './styles/every.css';

class EveryLocation extends Component {
  render() {

    const locationRows = [];
    const locations = this.props.state.savedLocations;

    locations.forEach((location, index) => {
      const handleView = () => this.props.viewSingle(index);
      const handleDelete = () => this.props.deleteLocation(location.uniqueId);

      const deleteButton = 
        (locations.length > 1) ? 
        <div className="row-delete" onClick={handleDelete}><h3>X</h3></div> :
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
        <div className="footer">  
          <div className="view-every" onClick={this.props.viewAdd}>
            <h3>Add</h3>
          </div> 
        </div>
      </div>
    );
  };
};

export default EveryLocation;
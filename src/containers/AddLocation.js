import React, {Component} from 'react';
import './add.css';

class AddLocation extends Component {
      
  handleChange = (event) => {
    const inputCity = event.target.value;
    if (inputCity.length > 2) {
      this.props.getMatches(inputCity) 
    };
  };

  render () {

    const matchRows = [];
    const matches = this.props.state.matchingCities;

    matches.forEach((location, index) => {
      const handleSelect = () => this.props.viewSingle(location);

      matchRows.push(
        <li className="match-row" key={`${location.city}${index}`}>
          <h3 className="row-city" onClick={handleSelect}>{`${location.city}, ${location.region}`}</h3>
        </li>
      )
    });

    return (
      <div className="add-main">
        <form>
          <input
            type="text"
            onChange={event => this.handleChange(event)}
            placeholder="Search by City"
          />
          {/* <button type="submit">Submit!</button> */}
        </form>
        <div className="locations">
          {matchRows}
        </div>
      </div>
    )
  }
};

export default AddLocation;
import React, {Component} from 'react';
import './styles/add.css';

class AddLocation extends Component {
      
  handleChange = (event) => {
    const inputCity = event.target.value;
    if (inputCity.length > 1) {
      this.props.getMatches(inputCity) 
    } else if (inputCity.length < 1) {
      this.props.clearSearch();
    };
  };

  render () {

    const matchRows = [];
    const matches = this.props.state.matchingCities;

    matches.forEach((location, index) => {
      const handleAdd = () => this.props.addNew(location);

      matchRows.push(
        <li className="match-row" key={`${location.city}${index}`}>
          <h3 className="row-city" onClick={handleAdd}>{`${location.city}, ${location.region}`}</h3>
        </li>
      )
    });

    return (
      <div className="add-main">
        <form>
          <input
            type="text"
            onChange={event => this.handleChange(event)}
            placeholder="Search by City in USA"
          />
          {/* <button type="submit">Submit!</button> */}
        </form>
        <div className="locations">
          {matchRows}
        </div>
        <div className="footer">  
          <div className="view-every" onClick={this.props.viewEvery}>
            <h3>Your Locations</h3>
          </div> 
        </div>
      </div>
    )
  }
};

export default AddLocation;
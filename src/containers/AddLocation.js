import React, {Component} from 'react';

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
        <li className="locations-row" key={`${location.city}${index}`}>
          <p className="row-city" onClick={handleAdd}>{`${location.city}, ${location.region}`}</p>
        </li>
      )
    });

    return (
      <div className="add-main">
        <form className="search">
          <input
            className="search-input"
            type="text"
            onChange={event => this.handleChange(event)}
            placeholder="Search by US City"
          />
        </form>
        <div className="locations">
          {matchRows}
        </div>
        <div className="footer">  
          <div className="view-every-big" onClick={this.props.viewEvery}>
            <h3>Your Locations</h3>
          </div> 
        </div>
      </div>
    )
  }
};

export default AddLocation;
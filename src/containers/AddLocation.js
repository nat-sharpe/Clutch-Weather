import React, {Component} from 'react';

class AddLocation extends Component {
      
  handleChange = (event) => {
    const inputCity = event.target.value;
    if (inputCity.length > 2) {
      this.props.getMatches(inputCity) 
    };
  };

  render () {
    console.log(this.props.state.matchingCities)
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
      </div>
    )
  }
};

export default AddLocation;
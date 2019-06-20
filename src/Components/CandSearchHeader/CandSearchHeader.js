import React, { Component } from 'react';
import './CandSearchHeader.css';
import Faker from '../../util/faker'


class CandSearchHeader extends Component {
  handleChange = (event, type) => {
    this.props.termsChanged(event.target.value, type)
  }
  
  openMap = () => {
    let postcode = this.props.searchTerms['postcode']
    if(postcode) {
      var win = window.open(`https://maps.google.co.uk/maps?q=${postcode}`, '_blank');
          win.focus();
    }
  }
  
  
  render() {
    const statuses = Faker.candStatuses.map(status => {
        return <option 
                  key={status}
                  value={status}>{status}</option>
      }) 
    
    const roles = Faker.roles.map(role => {
        return <option 
                  key={role}
                  value={role}>{role}</option>
      })
    
    const consultants = Faker.consultants.map(consultant => {
        return <option 
                key={consultant}
                value={consultant}>{consultant}</option>
      })
    
    return (
      <div className="searchHeader">
        <div className="row1">
          <a>Forename</a>
          <input 
            type="text" 
            onChange={(event) => this.handleChange(event, 'forename')} 
            value={this.props.searchTerms['forename']}
            placeholder="Forename"
            className="input"/>
          <a>Surname</a>
          <input 
            type="text" 
            onChange={(event) => this.handleChange(event, 'surname')} 
            value={this.props.searchTerms['surname']}
            placeholder="Surname"
            className="input"/>
          <a>Status</a>
          <select onChange={(event) => this.handleChange(event, 'status')}>
            {statuses}
          </select>
          <a>Role</a>
          <select onChange={(event) => this.handleChange(event, 'roleCode')}>
            {roles}
          </select>
          <a>Consultant</a>
          <select onChange={(event) => this.handleChange(event, 'consultant')}>
            {consultants}
          </select>
        </div>
        <div className="row2">
          <a>Email</a>
          <input 
            type="text" 
            onChange={(event) => this.handleChange(event, 'email')} 
            value={this.props.searchTerms['email']}
            placeholder="Email"
            className="input"/>
          <a>Telephone</a>
          <input 
            type="text" 
            onChange={(event) => this.handleChange(event, 'telephone')} 
            value={this.props.searchTerms['telephone']}
            placeholder="Telephone"
            className="input"/>
          <a>Postcode</a>
          <input 
            type="text" 
            onChange={(event) => this.handleChange(event, 'postcode')} 
            value={this.props.searchTerms['postcode']}
            placeholder="Postcode"
            className="input"/>
          <button type="button" onClick={this.openMap}>Open Map With Postcode</button>
          <a>Radius</a>
          <input 
            type="text" 
            onChange={(event) => this.handleChange(event, 'radius')} 
            value={this.props.searchTerms['radius']} 
            className="radius"/>
        </div>
        <div className="row3">
          <a>Google Maps URL</a><input type="text" onChange={this.props.locationChange} value={this.props.locationURL} placeholder="Google Maps URL" className="urlInput"/>
          <button type="button" onClick={this.props.applyPostcode}>Apply Radius Search</button>
          <a>Lat: {this.props.location.lat}</a><a>Long: {this.props.location.long}</a> 
        </div>
        <div>
          <button type="button" onClick={this.props.newCand.bind(this, 'new')} className="newCand">New Candidate</button>
          <button type="button" onClick={this.props.clearSearch} className="clearSearch">Clear Search</button>
          <a>Results: {this.props.length} records</a>
          <button type="button" onClick={this.props.changeColumns.bind(this, 'true')}>Change Columns</button>
        </div>
      </div>
    )
  }  
}

export default CandSearchHeader;
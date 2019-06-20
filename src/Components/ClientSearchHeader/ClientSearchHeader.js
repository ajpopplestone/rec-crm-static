import React, { Component } from 'react';
import './ClientSearchHeader.css';
import Faker from '../../util/faker'


class ClientSearchHeader extends Component {
  handleChange = (event, type) => {
    this.props.termsChanged(event.target.value, type)
  }
  
  openMap = () => {
    let postcode = this.props.searchTerms['postcode']
    var win = window.open(`https://maps.google.co.uk/maps?q=${postcode}`, '_blank');
        win.focus();
  }
  
  
  render() {
    const statuses = Faker.clientStatuses.map(status => {
        return <option 
                  key={status}
                  value={status}>{status}</option>
      }) 
    
    const busTypes = Faker.busTypes.map(busType => {
            return <option 
                    key={busType} 
                    value={busType}>{busType}</option>
          })
    
    const consultants = Faker.consultants.map(consultant => {
        return <option 
                  key={consultant}
                  value={consultant}>{consultant}</option>
      })
    
    
    return (
      <div className="searchHeader">
        <div className="row1">
          <a>Company Name</a>
          <input 
            type="text" 
            onChange={(event) => this.handleChange(event, 'name')} 
            value={this.props.searchTerms['name']}
            placeholder="Company Name"
            className="input"/>
          <a>Email</a>
          <input 
            type="text" 
            onChange={(event) => this.handleChange(event, 'email')} 
            value={this.props.searchTerms['email']}
            placeholder="Email"
            className="input"/>
          <a>Status</a>
          <select onChange={(event) => this.handleChange(event, 'status')}>
            {statuses}
          </select>
          <a>Business Type</a>
          <select onChange={(event) => this.handleChange(event, 'businessType')}>
            {busTypes}
          </select>
          <a>Consultant</a>
          <select onChange={(event) => this.handleChange(event, 'consultant')}>
            {consultants}
          </select>
        </div>
        <div className="row2">
          <a>Website</a>
          <input 
            type="text" 
            onChange={(event) => this.handleChange(event, 'website')} 
            value={this.props.searchTerms['website']}
            placeholder="Website"
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
          <button type="button" onClick={this.props.newClient.bind(this, 'new')} className="newCand">New Client</button>
          <button type="button" onClick={this.props.clearSearch} className="clearSearch">Clear Search</button>
          <a>Results: {this.props.length} records</a>
          <button type="button" onClick={this.props.changeColumns.bind(this, 'true')}>Change Columns</button>
        </div>
      </div>
    )
  }  
}

export default ClientSearchHeader;
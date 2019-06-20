import React, { Component } from 'react';
import TextEdit from '../TextEdit/TextEdit'
import SelectEdit from '../SelectEdit/SelectEdit'
import Faker from '../../util/faker'
import './Candidate.css';



class Candidate extends Component {
    state = {
        candidate: this.props.candidate,
        postcodeURL: ''
    }
    
    changeDataHandler = (event, type) => {
        let candidate = {...this.state.candidate}
        candidate[type] = event.target.value
        this.setState({candidate: candidate})
    } 
    
    closeCandHandler = () => {
        this.props.open('');
        this.props.updateRadius();
    }
    
    saveCandHandler = () => {
        this.props.update(this.state.candidate);
        this.closeCandHandler();
    }
    
    addPostcode = (event) => {
        this.setState({postcodeURL: event.target.value})
    }
    
    applyPostcode = (event) => {
        let regexll = new RegExp('@(.*),(.*),')
        let lat = ''
        let long = ''
        let url = this.state.postcodeURL
        console.log(url)
        if (url.match(regexll)) {
            var latLongMatch = url.match(regexll)
            lat = latLongMatch[1]
            long = latLongMatch[2]
        }
        
        let candidate = {...this.state.candidate}
        candidate.lat = lat
        candidate.long = long
        this.setState({candidate: candidate})
    }
    
    openMap = () => {
        if(this.state.candidate.postcode)
        var win = window.open(`https://maps.google.co.uk/maps?q=${this.state.candidate.postcode}`, '_blank');
        win.focus();
    }

    render () {
        const statuses = Faker.candStatuses.map(status => {
            return <option key={status} value={status}>{status}</option>
          }) 
        
        const roles = Faker.roles.map(role => {
            return <option key={role} value={role}>{role}</option>
          })
        
        const consultants = Faker.consultants.map(consultant => {
            return <option key={consultant} value={consultant}>{consultant}</option>
          })
        
        return (
        <div className="record">
            <TextEdit workbench="candidate" type="forename" value={this.state.candidate.forename} changed={this.changeDataHandler}/>
            <TextEdit workbench="candidate" type="surname" value={this.state.candidate.surname} changed={this.changeDataHandler}/>
            <TextEdit workbench="candidate" type="email" value={this.state.candidate.email} changed={this.changeDataHandler}/>
            <TextEdit workbench="candidate" type="telephone" value={this.state.candidate.telephone} changed={this.changeDataHandler}/>
            <TextEdit workbench="candidate" type="address" value={this.state.candidate.address} changed={this.changeDataHandler}/>
            <TextEdit workbench="candidate" type="postcode" value={this.state.candidate.postcode} changed={this.changeDataHandler}/>
            <p>Lat: {this.state.candidate.lat}</p>
            <p>Long: {this.state.candidate.long}</p>
            <p>UID: {this.state.candidate.UID}</p>
            <p><a>Google Maps URL</a><input type="text" onChange={this.addPostcode}/>
            <button type="button" onClick={this.openMap}>Open Map From Postcode</button>
            <button type="button" onClick={this.applyPostcode}>Apply Lat/Long</button></p>
            <div>
                <SelectEdit workbench="candidate" title="Status" type="status" options={statuses} value={this.state.candidate.status} changed={this.changeDataHandler}/>
                <SelectEdit workbench="candidate" title="Role" type="roleCode" options={roles} value={this.state.candidate.roleCode} changed={this.changeDataHandler}/>
                <SelectEdit workbench="candidate" title="Consultant" type="consultant" options={consultants} value={this.state.candidate.consultant} changed={this.changeDataHandler}/>
            </div>
            <p>
                <button onClick={this.saveCandHandler}>Save</button>
                <button onClick={this.closeCandHandler}>Close</button>
            </p>
        </div>
        )
    }
}

export default Candidate;


// {this.state.candidate.forename}
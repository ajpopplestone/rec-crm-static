import React, { Component } from 'react';
import TextEdit from '../TextEdit/TextEdit'
import SelectEdit from '../SelectEdit/SelectEdit'
import Faker from '../../util/faker'
import './Client.css';



class Client extends Component {
    state = {
        client: this.props.client,
        postcodeURL: ''
    }
    
    changeDataHandler = (event, type) => {
        let client = {...this.state.client}
        client[type] = event.target.value
        this.setState({client: client})
    } 
    
    closeClientHandler = () => {
        this.props.open('');
        this.props.updateRadius();
    }
    
    saveClientHandler = () => {
        this.props.update(this.state.client);
        this.closeClientHandler();
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
        
        let client = {...this.state.client}
        client.lat = lat
        client.long = long
        this.setState({client: client})
    }
    
    openMap = () => {
        if(this.state.client.postcode)
        var win = window.open(`https://maps.google.co.uk/maps?q=${this.state.client.postcode}`, '_blank');
        win.focus();
    }

    render () {
        const statuses = Faker.clientStatuses.map(status => {
            return <option key={status} value={status}>{status}</option>
          }) 
        
        const busTypes = Faker.busTypes.map(busType => {
            return <option key={busType} value={busType}>{busType}</option>
          })
        
        const consultants = Faker.consultants.map(consultant => {
            return <option key={consultant} value={consultant}>{consultant}</option>
          })
        
        return (
        <div className="record">
        <h1>Client</h1>
            <TextEdit workbench="client" type="name" value={this.state.client.name} changed={this.changeDataHandler}/>
            <TextEdit workbench="client" type="website" value={this.state.client.website} changed={this.changeDataHandler}/>
            <TextEdit workbench="client" type="email" value={this.state.client.email} changed={this.changeDataHandler}/>
            <TextEdit workbench="client" type="telephone" value={this.state.client.telephone} changed={this.changeDataHandler}/>
            <TextEdit workbench="client" type="address" value={this.state.client.address} changed={this.changeDataHandler}/>
            <TextEdit workbench="client" type="postcode" value={this.state.client.postcode} changed={this.changeDataHandler}/>
            <p>Lat: {this.state.client.lat}</p>
            <p>Long: {this.state.client.long}</p>
            <p><a>Google Maps URL</a><input type="text" onChange={this.addPostcode}/>
            <button type="button" onClick={this.openMap}>Open Map From Postcode</button>
            <button type="button" onClick={this.applyPostcode}>Apply Lat/Long</button></p>
            <div>
                <SelectEdit workbench="client" type="status" options={statuses} value={this.state.client.status} changed={this.changeDataHandler}/>
                <SelectEdit workbench="client" type="businessType" options={busTypes} value={this.state.client.busType} changed={this.changeDataHandler}/>
                <SelectEdit workbench="client" type="consultant" options={consultants} value={this.state.client.consultant} changed={this.changeDataHandler}/>
            </div>
            <p>
                <button onClick={this.saveClientHandler}>Save</button>
                <button onClick={this.closeClientHandler}>Close</button>
            </p>
        </div>
        )
    }
}

export default Client;


// {this.state.candidate.forename}
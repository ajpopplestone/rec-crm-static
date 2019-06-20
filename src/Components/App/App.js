import React, { Component } from 'react';
import './App.css';
import Workbench from '../Workbench/Workbench'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import Login from '../Login/Login'
// import Data from '../../util/data'
import Faker from '../../util/faker'

const candCount = 500
const clientCount = 100

class App extends Component {
  state = {
    data: {
      candidate: Faker.generateCandidates(candCount),
      client: Faker.generateClients(clientCount)
    },
    UIDCount: {
      candidate: candCount,
      client: clientCount
    },
    workbenchType: 'home',
    defaultSearchTerms: {
      candidate: {forename: '', surname: '', radius: 50, telephone: '', email: '', postcode: ''},
      client: {name: '', email: '', website: '', telephone: '', postcode: '', radius: 50}
    },
    loggedIn: false,
    loginDetails: {
      AP: '255327056',
      GE: '255327056',
      MI: '255327056',
      MP: '255327056',
      DB: '255327056',
      DRB: '255327056',
      Andrew: '84765848' 
    } 
  }
  
  updateRecord = (update) => {
    let data = {...this.state.data}
    let UIDCount = {...this.state.UIDCount}
    if (!update.UID){
      let newID = '' + (this.state.UIDCount[this.state.workbenchType] + 1);
            while (newID.length < 4) {
                newID = '0' + newID;
            }
      update.UID = newID
      data[this.state.workbenchType].push(update)
    } else {
      let index = data[this.state.workbenchType].findIndex(record => {
        return record.UID === update.UID
      })
      data[this.state.workbenchType][index] = update
    }
    UIDCount[this.state.workbenchType]++
    this.setState({data: data, UIDCount: UIDCount})
  }
  
  changeWorkbench = (type) => {
    this.setState({workbenchType: type})
  }
  
  applyPostcode = (lat, long) => {
        let data = {...this.state.data}
        // let regex = new RegExp('@(.*),(.*),')
        // let lat = ''
        // let long = ''
        // if (url.match(regex)) {
        //     var latLongMatch = url.match(regex)
        //     lat = latLongMatch[1]
        //     long = latLongMatch[2]
        // }
        
          for (var record of data[this.state.workbenchType]) {
              if ((lat && long) && (record.lat && record.long)) {
                var R = 6371e3; // metres
                var φ1 = record.lat * (Math.PI/180);
                var φ2 = lat * (Math.PI/180);
                var Δφ = (lat-record.lat) * (Math.PI/180);
                var Δλ = (long-record.long) * (Math.PI/180);
                
                var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                        Math.cos(φ1) * Math.cos(φ2) *
                        Math.sin(Δλ/2) * Math.sin(Δλ/2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                
                var d = R * c;
                
                record.distance = Math.round(d / 1000);
              } else {
                record.distance = ''
              }
              
          }
  
        
        this.setState({data: data})
  }
  
  checkLogin = (login, password) => {
    if (this.hash(password) === this.state.loginDetails[login]) {
      this.setState({loggedIn: login})
    } else {
      alert("Login Failed!!")
    }
  }
  
  hash = (s) => {
    /* Simple hash function. */
    var a = 1, c = 0, h, o;
    if (s) {
        a = 0;
        /*jshint plusplus:false bitwise:false*/
        for (h = s.length - 1; h >= 0; h--) {
            o = s.charCodeAt(h);
            // eslint-disable-next-line
            a = (a<<6&268435455) + o + (o<<14);
            c = a & 266338304;
            // eslint-disable-next-line
            a = c!==0?a^c>>21:a;
        }
    }
    return String(a);
  }
  
  logOut = () => {
    this.setState({loggedIn: false})
  }
  

  render() {
    let display = null
    let header = <Header logOut={this.logOut} loginUser={this.state.loggedIn}/>
    if (this.state.loggedIn) {
      display = (
        <div>
          {header}
          <div className="main-container">
            <Sidebar 
              changeWorkbench={this.changeWorkbench}
              workbench={this.state.workbenchType}/>
            <Workbench 
              data={this.state.data[this.state.workbenchType]}
              update={this.updateRecord}
              applyPostcode={this.applyPostcode}
              workbench={this.state.workbenchType}
              defaultSearchTerms={this.state.defaultSearchTerms}
              loggedIn={this.state.loggedIn}/>
          </div>
          <div>
            V 1.00.18.1
          </div>
        </div>
      )
    } else {
      display = (
        <div>
          {header}
          <Login checkLogin={this.checkLogin}/>
        </div>
      )
    }
    
    return (
      <div className="App">
        {display}
      </div>
    );
  }
}

export default App;

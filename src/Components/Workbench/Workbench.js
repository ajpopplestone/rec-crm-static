import React, { Component } from 'react';
import './Workbench.css';
import Search from '../Search/Search'
import Home from '../Home/Home'
import Admin from '../Admin/Admin'


class Workbench extends Component {
  render() {
    let display = null
    switch(this.props.workbench) {
      case 'client': 
        display = (
          <Search 
            data={this.props.data}
            update={this.props.update}
            applyPostcode={this.props.applyPostcode}
            workbench={this.props.workbench}
            defaultSearchTerms={this.props.defaultSearchTerms}/> 
          )
        break;
      case 'candidate':
        display = ( 
          <Search 
            data={this.props.data}
            update={this.props.update}
            applyPostcode={this.props.applyPostcode}
            workbench={this.props.workbench}
            defaultSearchTerms={this.props.defaultSearchTerms}/> 
          )
        break;  
      case 'home': 
        display = <Home />
        break
      case 'admin': 
        display = <Admin />
        break
      default:
        console.log("No workbench to display")
    }
    
    return (
        <div className="workbench">
            {display}       
        </div> 
    );
  }
}

export default Workbench;









     
















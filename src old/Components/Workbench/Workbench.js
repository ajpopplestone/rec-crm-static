import React, { Component } from 'react';
import './Workbench.css';
import SearchResults from '../SearchResults/SearchResults'


class Workbench extends Component {
  render() {
    return (
        <div class="workbench">
            <SearchResults candidates={this.props.candidates}/>        
        </div> 
    );
  }
}

export default Workbench;









     
















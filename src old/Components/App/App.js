import React, { Component } from 'react';
import './App.css';
import Workbench from '../Workbench/Workbench'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import Data from '../../util/data'


class App extends Component {
  state = {
    candidates: Data.candidates
  }
  
  render() {
    return (
      <div className="App">
        <Header/>
        <div class="main-container">
          <Sidebar/>
          <Workbench candidates={this.state.candidates}/>
        </div>
      </div>
    );
  }
}

export default App;

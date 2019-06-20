import React, { Component } from 'react';
import './TableHeader.css';
import Glossary from '../../util/glossary'


class TableHeader extends Component {
  // constructor(props) {
  //       super(props);
  //       this.sortHandler = this.sortHandler.bind(this)
  //   }

  // sortHandler(value) {
  //   this.props.sort(value)
  // }
  
  buildColumns = () => {
    let columns = this.props.columns.map(column => {
      let className = (this.props.sortBy === column ? 'selectedColumn' : '')
      let direction = null
      if (this.props.sortBy === column && this.props.sortAssending) {
        direction = '   ▲';
      } else if (this.props.sortBy === column && !this.props.sortAssending) {
        direction = '   ▼';
      }
      
      return <th key={column} onClick={() => this.props.sort(column)} className={className}>{Glossary[this.props.workbench][column]}{direction}</th>
    })
    return columns;
  }

  render() {

      return (
        <tr>
  	      {this.buildColumns()}
  	    </tr>
      )
  }

}

export default TableHeader;

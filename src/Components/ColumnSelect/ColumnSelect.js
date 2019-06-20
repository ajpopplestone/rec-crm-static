import React, { Component } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import onClickOutside from "react-onclickoutside";
import './ColumnSelect.css';




class ColumnSelect extends Component {
  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
    for (var column in this.props.columns) {
      if(this.props.columns[column])
      this.selectedCheckboxes.add(column);
    }
  }
  
  handleClickOutside = evt => {
    console.log("clicked")
    this.props.close(false)
  }
  
  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  }
  
  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
  
    this.props.updateColumns(this.selectedCheckboxes)
  }
  
  createCheckbox = label => {
    
    return <Checkbox
              label={label}
              handleCheckboxChange={this.toggleCheckbox}
              key={label}
              checked={this.props.columns[label]}
              workbench={this.props.workbench}
            />
  }
  

  
  createCheckboxes = (items) => (
    items.map(this.createCheckbox)
  )
  
  
  buildColumns = () => {
    let columnsArray = Object.keys(this.props.columns);
    return columnsArray
  }
  
  render() {
    return (
      <div className="columnSelect">
            <h1>Select Column</h1>
            <form onSubmit={this.handleFormSubmit}>
              {this.createCheckboxes(this.buildColumns())}
  
              <button className="btn btn-default" type="submit">Save</button>
            </form>

      </div>
    );
  }
}

export default onClickOutside(ColumnSelect);









     
















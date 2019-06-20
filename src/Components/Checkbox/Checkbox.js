import React, { Component } from 'react';
import './Checkbox.css';
import Glossary from '../../util/glossary'


class Checkbox extends Component {
  state = {
    isChecked: this.props.checked,
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props;

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    handleCheckboxChange(label);
  }

  render() {
    const { label } = this.props;
    const { isChecked } = this.state;

    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            value={label}
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
          />

          {Glossary[this.props.workbench][label]}
        </label>
      </div>
    );
  }
}


export default Checkbox;
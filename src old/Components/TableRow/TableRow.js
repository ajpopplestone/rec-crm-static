import React from 'react';
import './TableRow.css';


const TableRow = ( props ) => {
    return (
        <tr class="selected">
	      <td>{this.props.forename}</td>
	      <td>{this.props.surname}</td>
	      <td>Church Road, Epsom</td>
	      <td>LIVE</td>
	      <td>bob@carter.com</td>
	      <td>07896 568485</td>
	      <td>01372 659865</td>
	      <td>Glenn</td>
	      <td>====</td>
	    </tr>
    )
}

export default TableRow;
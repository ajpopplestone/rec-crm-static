import React from 'react';
import './TableHeader.css';


const TableHeader = ( props ) => {
    return (
        <tr>
	      <th>Forename</th>
	      <th>Surname</th>
	      <th>Address</th>
	      <th>Status</th>
	      <th>Email</th>
	      <th>Mobile</th>
	      <th>Phone</th>
	      <th>Consultant</th>
	      <th>Open</th>
	    </tr>
    )
}

export default TableHeader;
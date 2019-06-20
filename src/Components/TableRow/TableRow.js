import React from 'react';
import './TableRow.css';


const TableRow = ( props ) => {
  let rows = []
  for (var row in props.data) {
    if (props.columnsSelected[row]){
      switch(row) {
        case 'postcode':
          rows.push(<td key={row} onClick={props.openMap.bind(this, props.data[row])}>{props.data[row]}</td>)
          break;
        default:
          rows.push(<td key={row} onClick={props.open.bind(this, props.data.UID)}>{props.data[row]}</td>)
          
      }
      
    }
    
  }
  

    return (
      <tr className="selected">
	      {rows}
	    </tr>
    )
}

export default TableRow;

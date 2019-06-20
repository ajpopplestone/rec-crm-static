import React from 'react';
import './SelectEdit.css';
import Glossary from '../../util/glossary'


const SelectEdit = ( props ) => {
    
    return (
     <div className="selector">
        <a>{Glossary[props.workbench][props.type]}</a>
          <select onChange={(event) => props.changed(event, props.type)} value={props.value}>
            {props.options}
          </select>
     </div>
    )
}

export default SelectEdit;
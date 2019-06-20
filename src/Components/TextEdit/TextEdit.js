import React from 'react';
import './TextEdit.css';
import Glossary from '../../util/glossary'



const TextEdit = ( props ) => {
    return (
     <div className="textEdit">
        <p>{Glossary[props.workbench][props.type]}
            <input 
                type="text"
                value={props.value}
                onChange={(event) => props.changed(event, props.type)} 
                /> 
        </p>
     </div>
    )
}

export default TextEdit;
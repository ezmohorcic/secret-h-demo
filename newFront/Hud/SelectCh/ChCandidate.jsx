import React from 'react';

import './ChCandidate.css';

function ChCandidate(props)
{ 
    return(
        <div className='chCandidate'>
            <button className='chSelection' onClick={()=>
                {props.setSelected(props.element);}}
            >{props.element.username}</button>
            <div className="showOff"></div>
        </div>
    )
}

export default ChCandidate;
import React from 'react';

function ChCandidate(props)
{
    return(
        <div className='chCandidate'>
            <button onClick={props.setSelected(props.element)}></button>
        </div>
    )
}


export default ChCandidate;
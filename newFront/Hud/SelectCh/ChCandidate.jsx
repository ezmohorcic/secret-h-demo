import React from 'react';

function ChCandidate(props)
{
    const onclick = function(elemento)
    {
        console.log(elemento);
        props.setSelected(elemento);
    }
    return(
        <div className='chCandidate'>
            <button onClick={onclick(props.element)}>{props.element.username}</button>
        </div>
    )
}


export default ChCandidate;
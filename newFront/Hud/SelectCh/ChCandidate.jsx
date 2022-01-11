import React from 'react';

function ChCandidate(props)
{
    /*const onclick = function()
    {
        console.log(props.element);
        props.setSelected(props.element);
    }*/
    return(
        <div className='chCandidate'>
            <button onClick={()=>
                {
                    props.setSelected(props.element);
                }}>{props.element.username}</button>
        </div>
    )
}


export default ChCandidate;
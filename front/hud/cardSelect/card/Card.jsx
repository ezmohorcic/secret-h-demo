import React from 'react';

function Card(props)
{
    return(
        <div className='CardShell' id= {"card"+props.numberCard}>
            <button className='buttonDiscard' onClick={props.onSelectCard(props.numberCard,props.arrCartas)}>
                <div className='cardContentShell'>
                    <p>{props.content}</p>
                </div>
            </button>
        </div>
    )
}

export default Card;
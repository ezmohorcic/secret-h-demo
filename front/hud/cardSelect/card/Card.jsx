import React from 'React';

function Card(props)
{
    return(
        <div className='CardShell' id={props.vote}>
            <button className='buttonDiscard' onClick={props.onSelectCard()}>
                <div className='voteTextShell'>
                    <p>{voteP}</p>
                </div>
            </button>
        </div>
    )
}

export default Card;
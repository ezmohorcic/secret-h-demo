import React from 'react';

function Vote(props)
{
    var voteP;
    if(props.vote==false){voteP="NEIN!"}
    else {voteP="JA!";}
    return(
        <div className='voteShell' id={props.vote}>
            <button className='buttonVote' onClick={props.onVote(props.vote)}>
                <div className='voteTextShell'>
                    <p>{voteP}</p>
                </div>
            </button>
        </div>
    )
}

export default Vote;
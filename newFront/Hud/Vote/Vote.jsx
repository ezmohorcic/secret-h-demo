import React from 'react';

function Vote(props)
{
    function onVote(comm)
    {
        socket.emit("voted_gov",{vote:comm});
        props.setVoteDisp("none");
    }
    
    return(
        <div id="VoteContainer" style={props.voteDisp}>
            <div className="voteCard">
                <Vote vote={false} onVote={onVote(false)}/>
            </div>
            <div className="voteCard">
                <Vote vote={true} onVote={onVote(true)}/>
            </div>
        </div>
    )
}

export default Vote;
import React from 'react';
import Vote from "./vote/Vote.jsx";

function VoteSelect(props)
{
    function onVote(comm){socket.emit("voted_gov",{vote:comm});}
    return(
        <div id="VoteContainer">
            <div className="voteCard">
                <Vote vote={false} onVote={onVote}/>
            </div>
            <div className="voteCard">
                <Vote vote={true} onVote={onVote}/>
            </div>
        </div>
    )
}

export default VoteSelect;
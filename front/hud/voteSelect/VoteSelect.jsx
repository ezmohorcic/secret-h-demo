import React from 'react';
import Vote from "./vote/Vote.jsx";

function VoteSelect(props)
{
    //viene la callback setVoteDisp, cuando usuario clickea, cambia el estado, y re renderiza este componente a display=none
    //Cuando es turno de votar, se cambia mas arriba, y como cambia, baja por el DOM hasta aca y se modifica este componente 
    function onVote(comm)
    {
        socket.emit("voted_gov",{vote:comm});
        props.setVoteDisp("none");
    }
    return(
        <div id="VoteContainer" style={display=props.voteDisp}>
            <div className="voteCard">
                <Vote vote={false} onVote={onVote(false)}/>
            </div>
            <div className="voteCard">
                <Vote vote={true} onVote={onVote(true)}/>
            </div>
        </div>
    )
}

export default VoteSelect;
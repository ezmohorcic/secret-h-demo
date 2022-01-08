import React,{useContext, useEffect, useState} from 'react';
import { SocketContext } from "../../app.js";

function Vote(props)
{
    const socket = useContext(SocketContext);
    const [voteDisp,setVoteDisp]=useState({display:"none"}); 
    const onVote= function(comm)
    {
        socket.emit("voted_gov",{vote:comm});
        setVoteDisp({display:"none"});
    }

    return(
        <div id="VoteContainer" style={voteDisp}>
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
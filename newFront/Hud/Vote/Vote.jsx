import React,{useContext, useEffect, useState} from 'react';
import { SocketContext } from "../../Indexjs";

function Vote(props)
{
    const socket = useContext(SocketContext);
     
    const onVoteYes= function()
    {
        socket.emit("voted_gov",{vote:true});
        props.setVoteD(false);
    }
    const onVoteNo= function()
    {
        socket.emit("voted_gov",{vote:false});
        props.setVoteD(false);
    }

    return(
        <div id="VoteContainer">
            <div className="voteCard">
                <button id='voteNo' onClick={onVoteNo}>NEIN!</button>
            </div>
            <div className="voteCard">
                <button id='voteYes' onClick={onVoteYes}>JA!</button>
            </div>
        </div>
    )
}

export default Vote;
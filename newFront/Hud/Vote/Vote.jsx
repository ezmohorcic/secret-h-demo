import React,{useContext, useEffect, useState} from 'react';
import { SocketContext } from "../../app.js";

function Vote(props)
{
    const socket = useContext(SocketContext);
    //const [voteDisp,setVoteDisp]=useState({display:"none"}); 
    const onVoteYes= function()
    {
        console.log("onVoteYes")
        socket.emit("voted_gov",{vote:true});
        props.setVoteD(false);
    }
    const onVoteNo= function()
    {
        console.log("onVoteNo")
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
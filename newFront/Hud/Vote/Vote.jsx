import React,{useContext, useEffect, useState} from 'react';
import { SocketContext } from "../../Indexjs";
import './Vote.css';

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
                <button id='voteNo' onClick={onVoteNo}>
                    <div id="borderNo">
                        <div id="thinBorderNo">
                            NEIN!
                        </div>
                    </div>
                </button>
            </div>
            <div className="voteCard">
                <button id='voteYes' onClick={onVoteYes}>      
                    <div id="borderYes">
                        <div id="thinBorderYes">
                            JA!
                        </div>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Vote;
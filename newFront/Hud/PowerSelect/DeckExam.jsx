import React, {useState, useContext, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../../Indexjs";

import './DeckExam.css';

function DeckExam(props)
{
    const socket = useContext(SocketContext);
    //const all_players=useSelector((state)=>state.all_players);
    const player_data=useSelector(state=>state.player_data)
    var arrShow = props.powerPayload.map((element,index)=>
    {
        let view;
        if(element=="red")
        {
            return(
                <div key={"cardChoose"+index} className="shellShowRed">
                    <div className="innerShowRed"></div>
                </div>
            )
        }
        else
        {
            return(
                <div key={"cardChoose"+index} className="shellShowBlue">
                    <div className="innerShowBlue"></div>
                </div>
            )
        }
    });

    return(
        
        <div id='deckExamContainer'>
            <p id="deckExFlavor">The future appears before your eyes</p>
            <button id="closeDeckExam" onClick={()=>
                {
                    socket.emit("rest_know_examine_deck",player_data);
                    props.setViewPower("");
                }}>Close</button>
            <div id="deckShell">{arrShow}</div>
        </div>
    )
}

export default DeckExam;
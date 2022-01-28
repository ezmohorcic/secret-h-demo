import React,{useContext, useState} from 'react';
import { SocketContext } from "../../Indexjs";
import ChCandidate from "./ChCandidate.jsx"
import { useDispatch, useSelector } from "react-redux";

import './SelectCh.css';

function SelectCh(props)
{
    const socket = useContext(SocketContext);
    const [selected,setSelected]=useState({});

    const stats_turno=useSelector((state)=>state.stats_turno)
    const all_players=useSelector((state)=>state.all_players)
    const player_data=useSelector((state)=>state.player_data)

    const sendCh= function()
    {
        if(selected.socketId)
        {
            socket.emit("selected_chancellor",selected);
            props.setViewSelectedCh(false);
            setSelected({});
        }
        
    }
    var chCandidates= all_players.map(element=>
        {
            if(stats_turno.last_elected[0].position!=element.position && stats_turno.last_elected[1].position!=element.position && player_data.position!=element.position && element.estado!="dead")return(<ChCandidate element={element} setSelected={setSelected}/>)
        });

    return(
        <div id='SelectChContainer'>
            <p id='chFlavor'>Select your Chancellor, Mr.President</p>
            <div id="sendContainer">
                <p id='selectedView'>Selected: {selected.username}</p>
                <button id='selectedSend' onClick={sendCh}>Send</button>
            </div>

            <div id='candidatesShell'>{chCandidates}</div>
        </div>
    )
}

export default SelectCh;
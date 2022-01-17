import React,{useContext, useState} from 'react';
import { SocketContext } from "../../Indexjs";
import ChCandidate from "./ChCandidate.jsx"
import { useDispatch, useSelector } from "react-redux";

function SelectCh(props)
{
    const socket = useContext(SocketContext);
    const [selected,setSelected]=useState({});

    const stats_turno=useSelector((state)=>state.stats_turno)
    const all_players=useSelector((state)=>state.all_players)
    const player_data=useSelector((state)=>state.player_data)
    console.log("last_elected")
    console.log(stats_turno.last_elected);
    const sendCh= function()
    {
        console.log(selected)
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
            <p>Seleccionado: {selected.username}</p>
            <button onClick={sendCh}>Enviar!</button>
            <div id='candidatesShell'>{chCandidates}</div>
        </div>
    )
}

export default SelectCh;
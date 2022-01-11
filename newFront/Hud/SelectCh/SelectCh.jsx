import React,{useContext, useState} from 'react';
import { SocketContext } from "../../app.js";
import ChCandidate from "./ChCandidate.jsx"

function SelectCh(props)
{
    const socket = useContext(SocketContext);
    const [selected,setSelected]=useState({});

    const sendCh= function()
    {
        if(selected!={})
        {
            socket.emit("selected_chancellor",selected);
            props.setViewSelectedCh(false,[],[]);
        }
        
    }
    var chCandidates= props.all_players.map(element=>
        {
            if(props.last_elected[0].position!=element.position && props.last_elected[1].position!=element.position && props.position!=element.position && element.estado!="dead")return(<ChCandidate element={element} setSelected={setSelected}/>)
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
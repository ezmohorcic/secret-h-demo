import React from 'react';
import { Socket } from 'socket.io';
import ChCandidate from "./chCandidate/ChCandidate.jsx";

function SelectCh(props)
{
    const [selected,setSelected]= useState({username:""})
    
    function preSelectCh(player)
    {
        setSelected(player);
        props.setViewSelectedCh("none");
        setSelected({username:""});
    }
    function sendCh(){socket.emit("selected_chancellor",selected)}

    var arrShow = props.all_players.map((element)=>
    {
        if(!props.stats_turno.last_elected.include(element))
        {
            return(
                <ChCandidate
                playerInfo={element}
                onSelect={preSelectCh}
                />
            )
        }
    });

    return(
        <div id='SelectChContainer' style={{display:props.ViewSelectedCh}}>
            <p>seleccionado: {selected.username}</p>
            <button onClick={sendCh()}></button>
            {arrShow}
        </div>
    )
}

export default SelectCh;
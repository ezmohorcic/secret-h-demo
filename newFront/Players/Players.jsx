import React from "react";
import Player from "./Player/Player.jsx";
import { useDispatch, useSelector } from "react-redux";

import './Players.css';

function Players()
{
    //const state=useSelector((state)=>state.stats_turno)
    const all_players=useSelector((state)=>state.all_players)
    const player_data=useSelector((state)=>state.player_data)
    const knownRols=useSelector((state)=>state.knownRols)
    
    var players=all_players.map(element=>
        {
            return(<Player key={'player'+element.position} your_pos={player_data.position} qty={all_players.length} knownRols={knownRols} your_rol={player_data.rol} player={element}/>)
        });
    return(
        <div id="playersContainer">
            <ul id='playersUl'>
                {players}
            </ul>
            <div id="pmContainer">
                
            </div>
        </div>
    )
}

export default Players;
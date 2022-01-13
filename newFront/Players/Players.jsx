import React from "react";
import Player from "./Player/Player.jsx";
import { useDispatch, useSelector } from "react-redux";



function Players(props)
{
    const all_players=useSelector((state)=>state)
    console.log(all_players.all_players)
    var players=all_players.all_players.map(element=>
        {
            return(<Player qty={all_players.length} knownRols={props.knownRols} your_rol={props.player_data.rol} player={element}/>)
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
import React from "react";
import Player from "./Player/Player.jsx";

function Players(props)
{
    var players=props.all_players.map(element=>
        {
            return(<Player player={element}/>)
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
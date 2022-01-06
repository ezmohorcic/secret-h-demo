import React from 'react';
import Player from "./player/Player.jsx";

function Players(props)
{
    var players=props.players.map(element=>
        {
            <Player player={element}/>
        });
    return(
        <div id="playersContainer">
            <ul id='playersUl'>
                {players}
            </ul>
        </div>
    )
}


export default Players;
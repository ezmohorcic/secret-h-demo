import React from "react";

const H="hitler"; //rol hitler
const FASC="fascista"; //rol fascista
const LIB="liberal";//rol liberal

function Player(props)
{
    let rol;
    (props.your_rol==H || props.your_rol==FASC || props.knownRols.includes(props.player.position) )? rol=props.player.rol : rol="desconocido"
    return(
        <li id={'player'+props.player.position}>
            <p className='username'>{props.player.username}</p>
            <p className='rol'>{props.player.rol}</p>
        </li>
    )
}

export default Player;
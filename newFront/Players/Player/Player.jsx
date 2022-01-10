import React from "react";

const H="hitler"; //rol hitler
const FASC="fascista"; //rol fascista
const LIB="liberal";//rol liberal

function Player(props)
{
    let rol; 
    if(props.your_rol==FASC || props.knownRols.includes(props.player.position)){rol=props.player.rol}
    else if(props.your_rol==H && props.qty<7){rol=props.player.rol}
    else{ rol="desconocido";}
    
    return(
        <li id={'player'+props.player.position}>
            <p className='username'>{props.player.username}</p>
            <p className='rol'>{rol}</p>
        </li>
    )
}

export default Player;
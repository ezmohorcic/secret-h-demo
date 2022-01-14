import React from "react";
import { useDispatch, useSelector } from "react-redux";

const H="hitler"; //rol hitler
const FASC="fascista"; //rol fascista
const LIB="liberal";//rol liberal

function Player(props)
{
    const next_pm=useSelector((state)=>state.next_pm)
    let rol; 
    if(props.your_rol==FASC || props.knownRols.includes(props.player.position)){rol=props.player.rol}
    else if(props.your_rol==H && props.qty<7){rol=props.player.rol}
    else{ rol="desconocido";}
    let cargo = function(){if(next_pm.position==props.player.position) return (<p className="cargo">PM</p>)}
    return(
        <li id={'player'+props.player.position}>
            <p className='username'>{props.player.username}</p>
            <p className='rol'>{rol}</p>
            <p className="estado">{props.player.estado}</p>
            {cargo()}
        </li>
    )
}

export default Player;
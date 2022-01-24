import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSkullCrossbones, faUser} from '@fortawesome/free-solid-svg-icons';
import './Player.css';

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
    let estado= function(){if(props.player.estado=="vivo"){return (<FontAwesomeIcon icon={faUser}/>)}else{return(<FontAwesomeIcon icon={faSkullCrossbones}/>)}}

    return(
        <li  className="player" id={'player'+props.player.position}>
            <p className='username'>{props.player.username}</p>
            <p className="estado">{estado()}</p>
            <p className='rol'>{rol}</p> 
            {cargo()}
        </li>
    )
}

export default Player;
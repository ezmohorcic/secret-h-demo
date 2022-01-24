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
    const next_pm=useSelector((state)=>state.next_pm);
    const next_chancelor=useSelector((state)=>state.next_chancelor);

    let rol; 
    if(props.your_rol==FASC || props.knownRols.includes(props.player.position)){rol=props.player.rol}
    else if(props.your_rol==H && props.qty<7){rol=props.player.rol}
    else{ rol="desconocido";}
    let cargo = function()
    {
        console.log(next_chancelor)
        console.log(props.player)
        console.log(next_chancelor.chancellor.position==props.player.position)
        if(next_pm.position==props.player.position) {return (<p className="cargo playerP">PM</p>)}
        else if(next_chancelor.chancellor.position==props.player.position) return (<p className="cargo playerP">chancellor</p>)
    }
    let estado= function()
    {
        if(props.player.estado=="alive"){return (<FontAwesomeIcon className="estado"  icon={faUser}/>)}
        else{return(<FontAwesomeIcon className="estado"  icon={faSkullCrossbones}/>)}}
    
        let colorUs= function()
    {
        if(rol==H){return({color:"yellow"})}
        else if(rol==FASC){return({color:"red"})}
        else if(rol==LIB){return({color:"blue"})}
        else {return({color:"#fde1c0"})}
    }
    return(
        <li  className="player" id={'player'+props.player.position}>
            <p className='username playerP'>{props.player.username}</p>
            <p className="estado" style={colorUs()}>{estado()}</p>
            <p className='rol playerP'>{rol}</p> 
            {cargo()}
        </li>
    )
}

export default Player;
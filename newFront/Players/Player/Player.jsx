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

    if(props.your_rol==FASC || props.knownRols.includes(props.player.position)){rol=props.player.rol;}
    else if(props.your_rol==H && props.qty<7){rol=props.player.rol;}
    else if(props.your_pos==props.player.position){rol=props.player.rol;}
    else{ rol="desconocido";}

    let cargo = function()
    {
        if(next_pm.position==props.player.position){return (<p className="cargo playerP">President</p>)}
        else if(next_chancelor.chancellor.position==props.player.position){return (<p className="cargo playerP">chancellor</p>)}
    }

    let estado= function(estado)
    {
        if(estado=="alive"){return (<FontAwesomeIcon className="estado"  icon={faUser}/>)}
        else{return(<FontAwesomeIcon className="estadoMuerto"  icon={faSkullCrossbones}/>)}
    }
    
    let colorUs= function()
    {
        if(rol==H){return "hitlerColor"}
        else if(rol==FASC){ return "fascColor"}
        else if(rol==LIB){return "libColor"}
        else {return "unkColor"}
    }

    let colorCharge = function()
    {
        if(next_pm.position==props.player.position){return 'presidentColor';}
        else if(next_chancelor.chancellor.position==props.player.position){return 'chancellorColor';}
        else {return 'noRolColor';}
    }

    return(
        <li className={"player" + " " + colorCharge()} id={'player'+props.player.position}>
            <p className='username playerP'>{props.player.username}</p>
            <p className={"estado"+" "+colorUs()}>{estado(props.player.estado)}</p>
            <p className='rol playerP'>{rol}</p> 
            {cargo()}
        </li>
    )
}

export default Player;
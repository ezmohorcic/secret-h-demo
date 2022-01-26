import React, {useState, useContext, useEffect} from 'react';
import { SocketContext } from "../../Indexjs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkull, faDove} from '@fortawesome/free-solid-svg-icons';

import './Card.css';

function Card(props)
{
    const socket = useContext(SocketContext);

    let clas={};
    let icon='';
    if(props.content=="blue")
    {
        clas={class:"blueCard",but:"blueBut"}
        icon=faDove;
    }
    else
    {
        clas={class:"redCard",but:"redBut"}
        icon=faSkull;
    }

    return(
        <div className={'CardShell'+ " " + clas.class} id= {"card"+props.numberCard}>
            <button className={'buttonDiscard' + " " + clas.but} onClick=
            {()=>
                {
                    props.arrCartas.splice(props.numberCard,1);
                    if(props.emiting=="chancellor_desition") {socket.emit(props.emiting,{descartada:props.content,selected:props.arrCartas});} 
                    else {socket.emit(props.emiting,{descartada:props.content,cartas:props.arrCartas});} 
                    props.setViewCardSelect([false,[]])
                }}>
                <div className="cardIcon">
                    <FontAwesomeIcon icon={icon}/>
                </div> 
            </button>
        </div>
    )
}

export default Card;
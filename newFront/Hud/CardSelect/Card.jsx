import React, {useState, useContext, useEffect} from 'react';
import { SocketContext } from "../../app.js";

function Card(props)
{
    const socket = useContext(SocketContext);

    return(
        <div className='CardShell' id= {"card"+props.numberCard}>
            <button className='buttonDiscard' onClick=
            {()=>
                {
                    props.arrCartas.splice(props.numberCard,1);
                    if(props.emiting=="chancellor_desition") {socket.emit(props.emiting,{descartada:props.content,selected:props.arrCartas});} 
                    else {socket.emit(props.emiting,{descartada:props.content,cartas:props.arrCartas});} 
                    props.setViewCardSelect([false,[]])
                }}>
                {props.content}    
            </button>
        </div>
    )
}

export default Card;
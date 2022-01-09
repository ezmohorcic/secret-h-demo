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
                    props.arrCartas.splice(props.arrCartas[props.numberCard],1);
                    socket.emit(props.emiting,{descartada:props.content,cartas:props.arrCartas}); 
                    props.setViewCardSelect([false,[]])
                }}>
                {props.content}    
            </button>
        </div>
    )
}

export default Card;
import React, {useState, useContext, useEffect} from 'react';
import { SocketContext } from "../../app.js";
import Card from "./Card.jsx";

function CardSelect(props)
{
    const socket = useContext(SocketContext);

    /*onSelectCard= function(numberCard,arrCartas)
    {
        arrCartas.splice(arrCartas[numberCard],1);
        socket.emit(props.emitCards,{descartada:element,cartas:arrCartas});
        props.setCardDisp("none");
        
    }*/

    var cards= props.cards.map((element,index)=>
    {
        return(
            <Card
                arrCartas={props.cards}
                numberCard={index}
                content={element}
                emiting={props.emiting}
                setViewCardSelect={props.setViewCardSelect}
                //onSelectCard={onSelectCard}
            />
        )
    });
    return(<div id='CardSelectContainer'>{cards}</div>)
}

export default CardSelect;
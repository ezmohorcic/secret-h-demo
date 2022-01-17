import React, {useState, useContext, useEffect} from 'react';
import { SocketContext } from "../../Indexjs";
import Card from "./Card.jsx";

function CardSelect(props)
{
    const socket = useContext(SocketContext);

    var cards= props.cards.map((element,index)=>
    {
        return(
            <Card
                arrCartas={props.cards}
                numberCard={index}
                content={element}
                emiting={props.emiting}
                setViewCardSelect={props.setViewCardSelect}
            />
        )
    });
    return(<div id='CardSelectContainer'>{cards}</div>)
}

export default CardSelect;
import React, {useState, useContext, useEffect} from 'react';
import { SocketContext } from "../../Indexjs";
import Card from "./Card.jsx";

import './CardSelect.css';

function CardSelect(props)
{
    const socket = useContext(SocketContext);

    var cards= props.cards.map((element,index)=>
    {
        return(
            <Card
                key={'card'+index}
                arrCartas={props.cards}
                numberCard={index}
                content={element}
                emiting={props.emiting}
                setViewCardSelect={props.setViewCardSelect}
            />
        )
    });
    return(<div id='CardSelectContainer'>
        <div id="CardSlFlavor">
            <p>Select your discard</p>
        </div>
        <div id="CardsShell">
            {cards}
        </div>

        </div>)
}

export default CardSelect;
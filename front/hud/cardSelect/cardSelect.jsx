import React from 'react';
import Card from "./card/Card.jsx";

function CardSelect(props)
{
    var disp="block";

    function onSelectCard(numberCard,arrCartas)
    {
        arrCartas.splice(arrCartas[numberCard],1);
        socket.emit("pm_desition",{descartada:element,cartas:arrCartas});
        disp="none";
    }

    var cards= props.cartasTomadas.map((element,index,arr)=>
    {
        return(
            <Card
                arrCartas={arr}
                numberCard={index}
                content={element}
                onSelectCard={onSelectCard}
            />
        )
    });
    return(<div id='CardSelectContainer' style={disp}>{cards}</div>)
}

export default CardSelect;
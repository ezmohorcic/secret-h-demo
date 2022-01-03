import React from 'react';
import Card from "./card/Card.jsx";

function CardSelect(props)
{
    function onSelectCard()
    {
        props.cartas.splice(msg.cartas[props.numberCard],1);
        socket.emit("pm_desition",{descartada:element,cartas:props.cartas});
    }

    var Cards= props.cartasTomadas.map((element,index)=>
    {
        return(
            <Card
                
            />
        )
    });
    return(
        <div id='CardSelectContainer'>
            
        </div>
    )
}

export default CardSelect;
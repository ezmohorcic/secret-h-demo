import React from 'react';
import Card from "./card/Card.jsx";

function CardSelect(props)
{
    const [disp,setDisp]=useState("block");

    function onSelectCard(numberCard,arrCartas)
    {
        arrCartas.splice(arrCartas[numberCard],1);
        socket.emit(props.emitCards,{descartada:element,cartas:arrCartas});
        props.setCardDisp("none");
        
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
    return(<div id='CardSelectContainer' style={{display:props.cardDisp}}>{cards}</div>)
}

export default CardSelect;
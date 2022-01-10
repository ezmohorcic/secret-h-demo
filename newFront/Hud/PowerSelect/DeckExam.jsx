import React, {useState, useContext, useEffect} from "react";

function DeckExam(props)
{

    var arrShow = props.powerPayload.map((element)=>
    {
        return(
            <div className="genericSelect">
                {element}
            </div>
        )
    });

    return(
        
        <div id='deckExamContainer'>
            <button id="closeDeckExam" onClick={()=>props.setViewPower(["",[]])}></button>
            <div id="deckShell">{arrShow}</div>
        </div>
    )
}

export default DeckExam;
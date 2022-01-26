import React, {useState, useContext, useEffect} from "react";
//import { useDispatch, useSelector } from "react-redux";
import './DeckExam.css';

function DeckExam(props)
{
    //const all_players=useSelector((state)=>state.all_players);

    var arrShow = props.powerPayload.map((element)=>
    {
        let view;
        if(element=="red")
        {
            return(
                <div className="shellShowRed">
                    <div className="innerShowRed"></div>
                </div>
            )
        }
        else
        {
            return(
                <div className="shellShowBlue">
                    <div className="innerShowBlue"></div>
                </div>
            )
        }
    });

    return(
        
        <div id='deckExamContainer'>
            <p id="deckExFlavor">The future appears before your eyes</p>
            <button id="closeDeckExam" onClick={()=>props.setViewPower("")}>Return</button>
            <div id="deckShell">{arrShow}</div>
        </div>
    )
}

export default DeckExam;
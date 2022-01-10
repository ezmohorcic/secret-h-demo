import React, {useState, useContext, useEffect} from "react";
import { SocketContext } from "../../app";
import KillSelect from "./KillSelect.jsx";
import DeckExam from "./DeckExam.jsx";
import PlayerExam from "./PlayerExam.jsx";
import PmSelect from "./PmSelect.jsx";


function PowerSelect(props)
{
    const socket = useContext(SocketContext);
    const [viewPower,setViewPower]=useState(["",[]]); 

    let viewPowerType= function()
    {
        if(viewPower[0]=="KillSelect")      {return <KillSelect all_players={viewPower[1]} setViewPower={setViewPower} />;}
        else if(viewPower[0]=="DeckExam")   {return <DeckExam powerPayload={viewPower[1]} setViewPower={setViewPower} />;}
        else if(viewPower[0]=="PlayerExam") {return <PlayerExam all_players={viewPower[1]} setViewPower={setViewPower} setKnownRols={props.setKnownRols} />;}
        else if(viewPower[0]=="PmSelect")   {return <PmSelect all_players={viewPower[1]} setViewPower={setViewPower} />;}    
    }
    
    return(
        <div id='PowerSelectContainer'>
            {viewPowerType()}
        </div>
    )
}7

export default PowerSelect;
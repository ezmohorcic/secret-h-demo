import React, {useState, useContext, useEffect} from "react";
import { SocketContext } from "../../Indexjs";
import { useDispatch, useSelector } from "react-redux";


import KillSelect from "./KillSelect.jsx";
import DeckExam from "./DeckExam.jsx";
import PlayerExam from "./PlayerExam.jsx";
import PmSelect from "./PmSelect.jsx";

import './PowerSelect.css';

function PowerSelect()
{
    const socket = useContext(SocketContext);
    const [viewPower,setViewPower]=useState(["",[]]); 

    useEffect(()=>
    {
        socket.on("examine_deck",function(msg)
        {
            setViewPower(["DeckExam",msg]);
        });

        socket.on("kill",function(msg)
        {
            setViewPower(["KillSelect",msg]);
        });

        socket.on("examine_player",function(msg)
        {
            setViewPower(["PlayerExam",msg]);
        });

        socket.on("pick_candidate",function(msg)
        {
            setViewPower(["PmSelect",msg]);
        });
    },[socket]);
        
    let dummy=[{username:"anon1"},{username:"anon2"},{username:"anon3"},{username:"anon2"},{username:"anon3"},{username:"anon1"},{username:"anon2"},{username:"anon3"},{username:"anon2"},{username:"anon3"}]

    let viewPowerType= function()
    {
        if(viewPower[0]=="KillSelect")      {return <div id='PowerSelectContainer'><KillSelect all_players={viewPower[1]} setViewPower={setViewPower}/></div>;}
        else if(viewPower[0]=="DeckExam")   {return <div id='PowerSelectContainer'><DeckExam powerPayload={viewPower[1]} setViewPower={setViewPower}/></div>;}
        else if(viewPower[0]=="PlayerExam") {return <div id='PowerSelectContainer'><PlayerExam all_players={viewPower[1]} setViewPower={setViewPower}/></div>;}
        else if(viewPower[0]=="PmSelect")   {return <div id='PowerSelectContainer'><PmSelect all_players={viewPower[1]} setViewPower={setViewPower}/></div>;}    
    }
    
    //return(<React.Fragment>{viewPowerType()}</React.Fragment>)
    return (<div id='PowerSelectContainer'><KillSelect all_players={dummy} setViewPower={setViewPower}/></div>)
}

export default PowerSelect;
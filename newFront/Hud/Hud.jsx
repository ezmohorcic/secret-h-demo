import React, {useState, useContext, useEffect} from "react";
import { SocketContext } from "../Indexjs";
import { useDispatch } from "react-redux";

import CardSelect from "./cardSelect/CardSelect.jsx";
import PowerSelect from "./PowerSelect/PowerSelect.jsx";
import SelectCh from "./SelectCh/SelectCh.jsx";
import Vote from "./Vote/Vote.jsx";

import {setYou_chancelor,setNext_chancelor} from '../redux/actions.js';
import { useSelector } from "react-redux";
import './Hud.css';

function Hud()
{
    const socket = useContext(SocketContext);
    const dispatch = useDispatch();
    
    const [voteD,setVoteD]=useState(false);
    const [viewSelectedCh,setViewSelectedCh]=useState(false);
    const [viewCardSelect,setViewCardSelect]=useState([false,[]]);

    useEffect(()=>
    {
        socket.on("asigned_pm",function(msg){setViewSelectedCh(true);});

        socket.on("init_vote",function(msg) 
        {
            console.log(msg)
            console.log(msg.chancellor)
            setVoteD(true);
            dispatch(setNext_chancelor(msg));
        });

        socket.on("pm_desition_client",function(msg){setViewCardSelect([true,msg.cartas,"pm_desition"]);});

        socket.on("chancellor_turn",function(msg){setViewCardSelect([true,msg.cartas,"chancellor_desition"]);});

    },[socket]);

    let viewVote= function(){if(voteD) return(<Vote setVoteD={setVoteD}/>)};
    let viewSelectionCh= function(){if(viewSelectedCh==true) return(<SelectCh setViewSelectedCh={setViewSelectedCh}/>)}
    let viewCardSelection= function(){if(viewCardSelect[0]) return <CardSelect setViewCardSelect={setViewCardSelect} cards={viewCardSelect[1]} emiting={viewCardSelect[2]}/>}

    return(
        <div id="HudContainer">
            <div className="hudShell">{viewVote()}</div>
            <div className="hudShell">{viewSelectionCh()}</div>
            <div className="hudShell">{viewCardSelection()}</div>
            <div className="hudShell"><PowerSelect/></div>

        </div>
    )
}

export default Hud;

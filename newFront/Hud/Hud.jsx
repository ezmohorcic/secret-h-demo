import React, {useState, useContext, useEffect} from "react";
import { SocketContext } from "../Indexjs";
import { useDispatch } from "react-redux";

import CardSelect from "./CardSelect/CardSelect.jsx";
import PowerSelect from "./PowerSelect/PowerSelect.jsx";
import SelectCh from "./SelectCh/SelectCh.jsx";
import Vote from "./Vote/Vote.jsx";

import {setYou_chancelor,setNext_chancelor,setNewsBox} from '../redux/actions.js';
import { useSelector } from "react-redux";
import './Hud.css';

function Hud(props)
{
    const socket = useContext(SocketContext);
    const dispatch = useDispatch();

    const alive= useSelector((state)=>state.alive);
    
    const [voteD,setVoteD]=useState(false);
    const [viewSelectedCh,setViewSelectedCh]=useState(false);
    const [viewCardSelect,setViewCardSelect]=useState([false,[],""]);

    // if(props.resetEv)
    // {

    // }

    useEffect(()=>
    {
        socket.on("asigned_pm",function(msg)
        {console.log("asigned_pm")
            setViewSelectedCh(true);});
            dispatch(setNewsBox({title:"assigned_pm"}));

        socket.on("init_vote",function(msg) 
        {
            setVoteD(true);
            dispatch(setNext_chancelor(msg));
            //dispatch(setNewsBox({title:"chancellor_chosen"}));
        });

        socket.on("pm_desition_client",function(msg){setViewCardSelect([true,msg.cartas,"pm_desition"]);});

        socket.on("chancellor_turn",function(msg){setViewCardSelect([true,msg.cartas,"chancellor_desition"]);});

        socket.on("reset_hud",function()
        {
            setVoteD(false);
            setViewSelectedCh(false);
            setViewCardSelect([false,[],""]);
        });

    },[socket]);

    let viewVote= function(){if(voteD && alive==true) return(<div className="hudShell"><Vote setVoteD={setVoteD}/></div>)};
    let viewSelectionCh= function(){if(viewSelectedCh==true && alive==true) return <div className="hudShell"><SelectCh setViewSelectedCh={setViewSelectedCh}/></div>}
    let viewCardSelection= function(){if(viewCardSelect[0] && alive==true) return <div className="hudShell"><CardSelect setViewCardSelect={setViewCardSelect} cards={viewCardSelect[1]} emiting={viewCardSelect[2]}/></div>}

    return(
        <div id="HudContainer">
            {viewVote()}
            {viewSelectionCh()}
            {viewCardSelection()}
            <div className="hudShell"><PowerSelect/></div>
        </div>
    )
}

export default Hud;

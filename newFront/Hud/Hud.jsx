import React, {useState, useContext, useEffect} from "react";
import { SocketContext } from "../app";
import { useDispatch, useSelector } from "react-redux";

import CardSelect from "./cardSelect/CardSelect.jsx";
import PowerSelect from "./PowerSelect/PowerSelect.jsx";
import SelectCh from "./SelectCh/SelectCh.jsx";
import Vote from "./Vote/Vote.jsx";

function Hud()
{
    const socket = useContext(SocketContext);

    
    const [voteD,setVoteD]=useState(false);
    const [viewSelectedCh,setViewSelectedCh]=useState(false);
    const [viewCardSelect,setViewCardSelect]=useState([false,[]]);

    useEffect(()=>
    {
        socket.on("asigned_pm",function(msg)
        {
            console.log("asigned_pm")
            setViewSelectedCh(true);  
        });

        socket.on("init_vote",function(msg)
        {
            setVoteD(true);  
        });

        socket.on("pm_desition_client",function(msg)
        {
            setViewCardSelect([true,msg.cartas,"pm_desition"]);
        });

        socket.on("chancellor_turn",function(msg)
        {
            setViewCardSelect([true,msg.cartas,"chancellor_desition"]);
        });

    },[socket]);

    let viewVote= function(){if(voteD) return(<div className="hudShell"><Vote setVoteD={setVoteD}/></div>)};
    let viewSelectionCh= function(){if(viewSelectedCh==true) return(<div className="hudShell"><SelectCh setViewSelectedCh={setViewSelectedCh}/></div>)}
    let viewCardSelection= function(){if(viewCardSelect[0]) return <div className="hudShell"><CardSelect setViewCardSelect={setViewCardSelect} cards={viewCardSelect[1]} emiting={viewCardSelect[2]}/></div>}

    return(
        <div id="HudContainer">
            {viewVote()}
            {viewSelectionCh()}
            {viewCardSelection()}
            <PowerSelect/>

        </div>
    )
}

export default Hud;

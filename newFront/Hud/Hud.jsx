import React, {useState, useContext, useEffect} from "react";
import { SocketContext } from "../app";
import CardSelect from "./cardSelect/CardSelect.jsx";
import PowerSelect from "./PowerSelect/PowerSelect.jsx";
import SelectCh from "./SelectCh/SelectCh.jsx";
import Vote from "./Vote/Vote.jsx";

function Hud(props)
{
    const socket = useContext(SocketContext);
    const [voteD,setVoteD]=useState(false);
    const [viewSelectedCh,setViewSelectedCh]=useState([false,[],[],null]);
    const [viewCardSelect,setViewCardSelect]=useState([false,[]]);

    useEffect(()=>
    {
        socket.on("asigned_pm",function(msg)
        {
            setViewSelectedCh([true,msg.last_elected,msg.players,msg.position]);  
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
    let viewSelectionCh= function(){if(viewSelectedCh[0]) return(<div className="hudShell"><SelectCh setViewSelectedCh={setViewSelectedCh} last_elected={viewSelectedCh[1]} all_players={viewSelectedCh[2]} position={viewSelectedCh[3]} /></div>)}
    let viewCardSelection= function(){if(viewCardSelect[0]) return <div className="hudShell"><CardSelect setViewCardSelect={setViewCardSelect} cards={viewCardSelect[1]} emiting={viewCardSelect[2]}/></div>}

    return(
        <div id="HudContainer">
            {viewVote()}
            {viewSelectionCh()}
            {viewCardSelection()}
            <PowerSelect setKnownRols={props.setKnownRols}/>

        </div>
    )
}

export default Hud;

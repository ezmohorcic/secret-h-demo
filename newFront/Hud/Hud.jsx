import React, {useState, useContext, useEffect} from "react";
import { SocketContext } from "../app";
//import CardSelect from "./cardSelect/CardSelect.jsx";
//import PowerSelect from "./power/PowerSelect.jsx";
import SelectCh from "./SelectCh/SelectCh.jsx";
import Vote from "./Vote/Vote.jsx";

function Hud()
{
    const socket = useContext(SocketContext);
    const [voteD,setVoteD]=useState(false);
    const [viewSelectedCh,setViewSelectedCh]=useState([false,[],[],[]]);

    useEffect(()=>
    {
        socket.on("asigned_pm",function(msg)
        {
            console.log("soy pm");
            setViewSelectedCh([true,msg.last_elected,msg.players,msg.position]);  
        });

    },[socket]);

    let viewVote= function(){if(voteD) return(<div className="hudShell"><Vote voteDisp={voteD} setVoteDisp={setVoteD}/></div>)};
    let viewSelectionCh= function(){if(viewSelectedCh[0]) return(<div className="hudShell"><SelectCh setViewSelectedCh={setViewSelectedCh} last_elected={viewSelectedCh[1]} position={viewSelectedCh[3]} all_players={viewSelectedCh[2]}/></div>)}
    
    return(
        <div id="HudContainer">
            {viewVote()}
            {viewSelectionCh()}
        </div>
    )
}

export default Hud;

/*
<div className="hudShell"><CardSelect emitCards={props.emitCards} cardDisp={props.cardDisp} setCardDisp={props.setCardDisp} cartasTomadas={props.cartasTomadas}/></div>
<div className="hudShell"><PowerSelect powerPayload={props.powerPayload} power={props.power} tippedOff={props.tippedOff} all_players={props.all_players}/></div>
 */
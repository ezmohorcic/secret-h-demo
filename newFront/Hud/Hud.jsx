import React, {useState, useContext, useEffect} from "react";
import { SocketContext } from "../app";
import CardSelect from "./cardSelect/CardSelect.jsx";
import PowerSelect from "./PowerSelect/PowerSelect.jsx";
import SelectCh from "./SelectCh/SelectCh.jsx";
import Vote from "./Vote/Vote.jsx";

function Hud()
{
    const socket = useContext(SocketContext);
    const [voteD,setVoteD]=useState(false);
    const [viewSelectedCh,setViewSelectedCh]=useState([false,[],[],[]]);
    const [viewCardSelect,setViewCardSelect]=useState([false,[]]);
    /*const [viewPowerSelect,setViewPowerSelect]=useState([false,])*/

    useEffect(()=>
    {
        socket.on("asigned_pm",function(msg)
        {
            console.log("soy pm");
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
    let viewSelectionCh= function(){if(viewSelectedCh[0]) return(<div className="hudShell"><SelectCh setViewSelectedCh={setViewSelectedCh} last_elected={viewSelectedCh[1]} position={viewSelectedCh[3]} all_players={viewSelectedCh[2]}/></div>)}
    let viewCardSelection= function(){if(viewCardSelect[0]) return <div className="hudShell"><CardSelect setViewCardSelect={setViewCardSelect} cards={viewCardSelect[1]} emiting={viewCardSelect[2]}/></div>}
    //let viewPowerSelection = function(){if(viewPowerSelect[0]) return <div className="hudShell"><PowerSelect setViewPowerSelect={setViewPowerSelect}  /></div>}
    //{viewPowerSelection()}

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

/*
<div className="hudShell"><CardSelect emitCards={props.emitCards} cardDisp={props.cardDisp} setCardDisp={props.setCardDisp} cartasTomadas={props.cartasTomadas}/></div>
<div className="hudShell"><PowerSelect powerPayload={props.powerPayload} power={props.power} tippedOff={props.tippedOff} all_players={props.all_players}/></div>
 */
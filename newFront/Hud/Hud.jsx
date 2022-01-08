import React from 'react';
//import CardSelect from "./cardSelect/CardSelect.jsx";
//import PowerSelect from "./power/PowerSelect.jsx";
import SelectCh from "./selectCh/SelectCh.jsx";
import Vote from "./Vote/Vote.jsx";

function Hud(props)
{
    return(
        <div id="HudContainer">
            <div className="hudShell"><Vote voteDisp={props.voteDisp} setVoteDisp={props.setVoteDisp}/></div>  
            <div className="hudShell"><SelectCh stats_turno={props.stats_turno} ViewSelectedCh={props.ViewSelectedCh} setViewSelectedCh={props.setViewSelectedCh} all_players={props.all_players}/></div>

            <div className="hudShell"><CardSelect emitCards={props.emitCards} cardDisp={props.cardDisp} setCardDisp={props.setCardDisp} cartasTomadas={props.cartasTomadas}/></div>
            <div className="hudShell"><PowerSelect powerPayload={props.powerPayload} power={props.power} tippedOff={props.tippedOff} all_players={props.all_players}/></div>
        </div>
    )
}

export default Hud;
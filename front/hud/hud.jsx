import React from 'react';
import CardSelect from "./cardSelect/CardSelect.jsx";
import PowerSelect from "./power/PowerSelect.jsx";
import SelectCh from "./selectCh/SelectCh.jsx";
import VoteSelect from "./voteSelect/VoteSelect.jsx";

function Hud(props)
{
    return(
        <div id="HudContainer"> 
            <div className="hudShell"><CardSelect cartasTomadas={props.cartasTomadas}/></div>
            <div className="hudShell"><PowerSelect all_players={props.all_players}/></div>
            <div className="hudShell"><SelectCh all_players={props.all_players}/></div>
            <div className="hudShell"><VoteSelect voteDisp={props.voteDisp} setVoteDisp={props.setVoteDisp}/></div>    
        </div>
    )
}

export default Hud;
import React from 'react';
import KillSelect from "./killSelect/KillSelect.jsx";
import DeckExam from "./deckExam/DeckExam.jsx";
import PlayerExam from "./playerExam/PlayerExam.jsx";
import PmSelect from "./pmSelect/PmSelect.jsx";

function PowerSelect(props)
{
    var powerType;
    if(props.power=="KillSelect"){powerType=<KillSelect all_players={props.all_players}/>;}
    else if(props.power=="DeckExam"){powerType=<DeckExam powerPayload={props.powerPayload}/>;}
    else if(props.power=="PlayerExam"){powerType=<PlayerExam all_players={props.all_players}/>;}
    else if(props.power=="PmSelect"){powerType=<PmSelect all_players={props.all_players}/>;}

    return(
        <div id='PowerSelectContainer'>
            {powerType}
        </div>
    )
}7

export default PowerSelect;
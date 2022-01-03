import React from 'react';
import CardSelect from "./cardSelect/CardSelect.jsx";
import PowerSelect from "./power/PowerSelect.jsx";
import SelectCh from "./selectCh/SelectCh.jsx";
import VoteSelect from "./voteSelect/VoteSelect.jsx";

function Hud()
{
    return(
        <div id="HudContainer"> 
            <CardSelect/>
            <PowerSelect/>
            <SelectCh/>
            <VoteSelect/>
        </div>
    )
}

export default Hud;
import React from 'react';
import CardSelect from "./cardSelect/CardSelect.jsx";
import PowerSelect from "./power/PowerSelect.jsx";
import SelectCh from "./selectCh/SelectCh.jsx";
import Vote from "./vote/Vote.jsx";

function Hud()
{
    return(
        <div id="HudContainer"> 
            <CardSelect/>
            <PowerSelect/>
            <SelectCh/>
            <Vote/>
        </div>
    )
}

export default Hud;
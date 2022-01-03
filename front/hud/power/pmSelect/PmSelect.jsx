import React from 'React';
import ChCandidate from ".../selectCh/chCandidate/ChCandidate.jsx";

function PmSelect(props)
{
    var disp="block";

    function selectedPm(player)
    {
        socket.emit("pick_candidate",player);
        disp="none";
    }

    var arrShow = props.all_players.map((element)=>
    {
        <ChCandidate
            playerInfo={element}
            onSelect={selectedPm}
        />
    });

    return(
        <div id='pmSelectContainer' style={disp}>
            {arrShow}
        </div>
    )
}

export default PmSelect;
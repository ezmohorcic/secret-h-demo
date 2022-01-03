import React from 'React';
import ChCandidate from ".../selectCh/chCandidate/ChCandidate.jsx";

function KillSelect(props)
{
    var disp="block";

    function sendDeath(player)
    {
        socket.emit("kill",{player})
        disp="none";
    }

    var arrShow = props.all_players.map((element)=>
    {
        <ChCandidate
            playerInfo={element}
            onSelect={sendDeath}
        />
    });

    return(
        <div id='KillSelectContainer' style={disp}>
            {arrShow}
        </div>
    )
}


export default KillSelect;
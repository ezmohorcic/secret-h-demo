import React from 'React';
import ChCandidate from ".../selectCh/chCandidate/ChCandidate.jsx";

function PlayerExam(props)
{
    var disp="block";

    function showRol(player)
    {
        //aca agregar hook de cambio de estado del jugador que pickee
        disp="none";
    }

    var arrShow = props.all_players.map((element)=>
    {
        <ChCandidate
            playerInfo={element}
            onSelect={showRol}
        />
    });

    return(
        <div id='rolRevealContainer' style={disp}>
            {arrShow}
        </div>
    )
}

export default PlayerExam;
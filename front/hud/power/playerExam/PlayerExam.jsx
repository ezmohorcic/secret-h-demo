import React from 'React';
import ChCandidate from ".../selectCh/chCandidate/ChCandidate.jsx";

function PlayerExam(props)
{
    const [disp,setDisp]=useState("block");

    function showRol(player)
    {
        //aca agregar hook de cambio de estado del jugador que pickee
        setDisp("none");
    }

    var arrShow = props.all_players.map((element)=>
    {
        <ChCandidate
            playerInfo={element}
            onSelect={showRol}
        />
    });

    return(
        <div id='rolRevealContainer' style={display=disp}>
            {arrShow}
        </div>
    )
}

export default PlayerExam;
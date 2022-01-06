import React from 'React';
import ChCandidate from ".../selectCh/chCandidate/ChCandidate.jsx";

function KillSelect(props)
{
    const [disp,setDisp]=useState("block")

    function sendDeath(player)
    {
        socket.emit("kill",{player})
        setDisp("none");
    }

    var arrShow = props.all_players.map((element)=>
    {
        return(
            <ChCandidate
            playerInfo={element}
            onSelect={sendDeath}
            />
        )
    });

    return(
        <div id='KillSelectContainer' style={display=disp}>
            {arrShow}
        </div>
    )
}


export default KillSelect;
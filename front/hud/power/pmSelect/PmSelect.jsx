import React from 'react';
import ChCandidate from "../../selectCh/chCandidate/ChCandidate.jsx";

function PmSelect(props)
{
    const [disp,setDisp]=useState("block");

    function selectedPm(player)
    {
        socket.emit("pick_candidate",player);
        setDisp("none");
    }

    var arrShow = props.all_players.map((element)=>
    {
        return(
            <ChCandidate
            playerInfo={element}
            onSelect={selectedPm}
            />
        )
    });

    return(
        <div id='pmSelectContainer' style={display=disp}>
            {arrShow}
        </div>
    )
}

export default PmSelect;
import React, {useState, useContext, useEffect} from "react";
import { SocketContext } from "../../app";
import GenericSelection from "./GenericSelection.jsx"

function KillSelect(props)
{
    const socket = useContext(SocketContext);

    function sendDeath(player)
    {
        socket.emit("kill",{player})
        setDisp("none");
    }

    var arrShow = props.all_players.map((element)=>
    {
        return(
            /*<GenericSelection
            playerInfo={element}
            onSelect={sendDeath}
            />*/
            <div className="genericSelect">
                <button onClick={}>element.username</button>
            </div>
        )
    });

    return(
        <div id='KillSelectContainer' style={display=disp}>
            {arrShow}
        </div>
    )
}


export default KillSelect;
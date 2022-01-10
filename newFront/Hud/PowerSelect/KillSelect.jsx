import React, {useState, useContext, useEffect} from "react";
import { SocketContext } from "../../app";

function KillSelect(props)
{
    const socket = useContext(SocketContext);

    var arrShow = props.all_players.map((element)=>
    {
        return(
            <div className="genericSelect">
                <button onClick={()=>
                {
                    socket.emit("kill",{element});
                    props.setViewPower(["",[]]);
                }}>{element.username}</button>
            </div>
        )
    });

    return(
        <div id='k illSelectContainer'>
            {arrShow}
        </div>
    )
}

export default KillSelect;
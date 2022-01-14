import React, {useState, useContext, useEffect} from "react";
import { SocketContext } from "../../app";
import { useDispatch, useSelector } from "react-redux";

function KillSelect(props)
{
    const socket = useContext(SocketContext);
    const all_players=useSelector((state)=>state.all_players);

    var arrShow = all_players.map((element)=>
    {
        if(element.estado!="dead")
        {
            return(
                <div className="genericSelect">
                    <button onClick={()=>
                    {
                        socket.emit("kill",element);
                        props.setViewPower("");
                    }}>{element.username}</button>
                </div>
            )
        }
        
    });

    return(
        <div id='killSelectContainer'>
            {arrShow}
        </div>
    )
}

export default KillSelect;
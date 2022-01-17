import React, {useState, useContext, useEffect} from "react";
import { SocketContext } from "../../Indexjs";
import { useDispatch, useSelector } from "react-redux";

function PmSelect(props)
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
                        socket.emit("pick_candidate",{element});
                        props.setViewPower("");
                    }}>{element.username}</button>
                </div>
            )
        }
        
    });

    return(
        <div id='pmSelectContainer'>
            {arrShow}
        </div>
    )
}

export default PmSelect;
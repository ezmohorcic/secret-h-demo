import React, {useState, useContext, useEffect} from "react";
import { SocketContext } from "../../Indexjs";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSkull} from '@fortawesome/free-solid-svg-icons';

import './KillSelect.css';

function KillSelect(props)
{
    const socket = useContext(SocketContext);
    const all_players=useSelector((state)=>state.all_players);

    var arrShow = all_players.map((element)=>
    {
        if(element.estado!="dead")
        {
            return(
                <div className="genericSelectKill">
                    <div className="borderKillShow">
                        <button className="killBut" onClick={()=>
                        {
                            socket.emit("kill",element);
                            props.setViewPower("");
                        }}><p className="killName">{element.username}</p></button>
                    </div>
                    <div className="showKill"><FontAwesomeIcon className="skullIcon" icon={faSkull}/></div>
                </div>
            )
        }
    });
    return(
        <div id='killSelectContainer'>
            <p id="killSlFlavor">The blood will be on your hands</p>
            <div id="killContainer">
                {arrShow}
            </div>
        </div>)
}

export default KillSelect;
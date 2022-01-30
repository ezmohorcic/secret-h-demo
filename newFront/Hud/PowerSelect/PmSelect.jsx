import React, {useState, useContext, useEffect} from "react";
import { SocketContext } from "../../Indexjs";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandshake} from '@fortawesome/free-solid-svg-icons';

import './PmSelect.css';

function PmSelect(props)
{
    const socket = useContext(SocketContext);
    const all_players=useSelector((state)=>state.all_players);

    var arrShow = all_players.map((element)=>
    {
        if(element.estado!="dead")
        {
            return(
                <div className="genericSelectPm">
                    <div className="borderShowPm">
                        <button className="pmBut" onClick={()=>
                        {
                            socket.emit("rest_know_pick_candidate",element); //pick_candidate
                            props.setViewPower("");
                        }}>{element.username}</button>
                    </div>
                    <div className="showPm">
                        <FontAwesomeIcon className="handsIcon" icon={faHandshake}/>
                    </div>
                </div>
            )
        }
        
    });

    return(
        <div id='pmSelectContainer'>
            <p id="pmSlFlavor">The influence you manage bends the rules</p>
            <div id="pmContainer">{arrShow}</div>
        </div>
    )
}

export default PmSelect;
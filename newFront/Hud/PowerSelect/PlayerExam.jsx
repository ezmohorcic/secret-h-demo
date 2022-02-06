import React, {useState, useContext, useEffect} from "react";
import { SocketContext } from "../../Indexjs.js";
import { useDispatch, useSelector } from "react-redux";
import {setKnownRols,setNewsBox} from "../../redux/actions.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye} from '@fortawesome/free-solid-svg-icons';

import './PlayerExam.css';

function PlayerExam(props)
{
    const socket = useContext(SocketContext);

    const all_players=useSelector((state)=>state.all_players);
    const knownRols=useSelector((state)=>state.knownRols);
    const dispatch = useDispatch();
    let dummy=[{username:"anon1"},{username:"anon2"},{username:"anon3"},{username:"anon2"},{username:"anon3"},{username:"anon1"},{username:"anon2"},{username:"anon3"},{username:"anon2"},{username:"anon3"}]
    
    var arrShow =all_players.map((element,index)=>
    {   
        return(
            <div key={"selectExam"+index} className="genericSelectExam">
                <div className="borderShowExam">
                    <button className="examBut" onClick={()=>
                    {
                        dispatch(setKnownRols(element.position));
                        socket.emit("rest_know_examine_player",element);
                        props.setViewPower("");
                    }}><p>{element.username}</p></button>
                </div>
                <div className="showExam">
                    <FontAwesomeIcon className="eyeIcon" icon={faEye}/>
                </div>
            </div>
        )
    });

    return(
        <div id='playerExamContainer'>
            <p id="examSlFlavor">the clairvoyance touched your eyes</p>
            <div id="examContainer">{arrShow}</div>
        </div>
    )
}

export default PlayerExam;
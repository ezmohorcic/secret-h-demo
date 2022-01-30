import React, {useState, useContext, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {setKnownRols} from "../../redux/actions.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye} from '@fortawesome/free-solid-svg-icons';

import './PlayerExam.css';

function PlayerExam(props)
{
    const all_players=useSelector((state)=>state.all_players);
    const knownRols=useSelector((state)=>state.knownRols);
    const dispatch = useDispatch();
    var arrShow =all_players.map((element,index)=>
    {   
        return(
            <div key={"selectExam"+index} className="genericSelectExam">
                <div className="borderShowExam">
                    <button className="examBut" onClick={()=>
                    {
                        dispatch(setKnownRols(element.position))
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
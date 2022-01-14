import React, {useState, useContext, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {setKnownRols} from "../../redux/actions.js";

function PlayerExam(props)
{
    const all_players=useSelector((state)=>state.all_players);
    const knownRols=useSelector((state)=>state.knownRols);
    const dispatch = useDispatch();
    var arrShow = all_players.map((element)=>
    {
        return(
            <div className="genericSelect">
                <button onClick={()=>
                {
                    dispatch(setKnownRols(element.position))
                    props.setViewPower("");
                }}>{element.username}</button>
            </div>
        )
    });

    return(
        <div id='playerExamContainer'>
            {arrShow}
        </div>
    )
}

export default PlayerExam;
import React, {useState, useContext, useEffect} from "react";

function PlayerExam(props)
{

    var arrShow = props.all_players.map((element)=>
    {
        return(
            <div className="genericSelect">
                <button onClick={()=>
                {
                    props.setKnownRols(oldRols=>[...oldRols,element.position])
                    props.setViewPower(["",[]]);
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
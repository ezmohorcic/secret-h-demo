import React, {useState, useContext, useEffect} from "react";
import { SocketContext } from "../Indexjs";
import { useDispatch, useSelector } from "react-redux";

import './Stats.css';

const BLUE="blue"; //ley liberal
const RED="red"; //ley fascista

function Stats()
{
    const socket = useContext(SocketContext);

    const stats_turno=useSelector((state)=>state.stats_turno)
    const [blue,setBlue]=useState(0);
    const [red,setRed]=useState(0);

    useEffect(()=>
    {
        socket.on("law_done",function(msg)
        {
            msg.selected==BLUE ? setBlue(msg.counter):setRed(msg.counter);
        });
    },[socket]);

    var blueLaws=[];
    var redLaws=[];
    var skipped=[];

    for(var i=0;i<blue;i++){blueLaws.push(<div className="blueLaw"></div>)}
    for(var i=0;i<red;i++){redLaws.push(<div className="redLaw"></div>)}
    for(var i=0;i<stats_turno.skipped_turns;i++){blueLaws.push(<div className='skippedTurns'><div className="skippedDot"></div></div>)}


    return(
        <div id="lawLayourContainer">
            <div id="lawsCounters">
                <div className='blueLawShell'>{blueLaws}</div>
                <div className='redLawShell'>{redLaws}</div>
            </div>

            <div id="stacksCounters">
                <div className='stackLayoutShell' id='mainStackLayout'>
                    <p>cartas en juego:</p>   
                    {stats_turno.cant_left}
                </div>
                <div className='stackLayoutShell' id='discardStackLayout'>
                    <p>cartas descartadas:</p> 
                    {stats_turno.cant_descart}
                </div>
                <div id='skippedTurnsShell'>Gobiernos no pactados:{stats_turno.skipped_turns}</div>
            </div>
            
            
        </div>
    )
}

export default Stats;
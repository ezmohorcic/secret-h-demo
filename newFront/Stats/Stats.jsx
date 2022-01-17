import React, {useState, useContext, useEffect} from "react";
import { SocketContext } from "../Indexjs";
import { useDispatch, useSelector } from "react-redux";

const BLUE="blue"; //ley liberal
const RED="red"; //ley fascista

function Stats(props)
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
    for(var i=0;i<blue;i++){blueLaws.push(<div className='blueLawShell'><p>Blue</p></div>)}
    for(var i=0;i<red;i++){redLaws.push(<div className='redLawShell'><p>Red</p></div>)}
    return(
        <div className="lawLayourContainer">
            <div className="lawLayoutShell">layout azul: {blueLaws}</div>
            <div className="lawLayoutShell">layout rojo: {redLaws}</div>
            <div className='stackLayoutShell' id='mainStackLayout'>cartas en juego:{stats_turno.cant_left}</div>
            <div className='stackLayoutShell' id='discardStackLayout'>cartas descartadas:{stats_turno.cant_descart}</div>
            <div id='skippedTurnsShell'>Gobiernos no pactados:{stats_turno.skipped_turns}</div>
        </div>
    )
}

export default Stats;
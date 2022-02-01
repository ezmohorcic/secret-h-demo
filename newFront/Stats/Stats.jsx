import React, {useState, useContext, useEffect} from "react";
import { SocketContext } from "../Indexjs";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSkull, faDove} from '@fortawesome/free-solid-svg-icons';

import { setNewsBox } from "../redux/actions";
import './Stats.css';

const BLUE="blue"; //ley liberal
const RED="red"; //ley fascista

let lawDoneSound = new Audio('../Sound/ChurchBellRinging.mp3');
let duoLost = new Audio('./Sounds/duoWon.mp3');

function Stats()
{
    const socket = useContext(SocketContext);

    const stats_turno=useSelector((state)=>state.stats_turno);
    const dispatch=useDispatch();

    const [blue,setBlue]=useState(0);
    const [red,setRed]=useState(0);

    useEffect(()=>
    {
        socket.on("law_done",function(msg)
        {
            dispatch(setNewsBox({title:"law_done",disp:{display:"block"}}));
            msg.selected==BLUE ? setBlue(msg.counter):setRed(msg.counter);
        });

        socket.on("duo_lost",function(msg)
        {
            console.log(msg)
            dispatch(setNewsBox({title:"duo_lost",disp:{display:"block"},eachVote:msg.eachVote}));
            if(msg.passed_law){msg.selected==BLUE ? setBlue(msg.counter):setRed(msg.counter);}
        });
    },[socket]);

    var blueLaws=[];
    var redLaws=[];
    var skipped=[];

    for(var i=0;i<5;i++)
    {
        if(i<blue){blueLaws.push(<div key={"blueint"+i} className="blueLaw"><div className="blueIcon"><FontAwesomeIcon className="fontAweDove" icon={faDove}/></div></div>)}
        else{blueLaws.push(<div key={"blueint"+i} className="blueLaw"></div>)}
    }
    for(var i=0;i<6;i++)
    {
        if(i<red){redLaws.push(<div key={"redint"+i} className="redLaw"> <div className="redIcon"><FontAwesomeIcon className="fontAweSkull" icon={faSkull}/></div></div>)}
        else{{redLaws.push(<div key={"redint"+i} className="redLaw"></div>)}}
    }
    for(var i=0;i<stats_turno.skipped_turns;i++){skipped.push(<div key={"skipint"+i} className="skippedDot"></div>)}


    return(
        <div id="lawLayourContainer">
            <div id="lawsCounters">
                <div className='blueLawShell'>
                    <div id="thinBlueBorder"><div id="blueBorder">{blueLaws}</div></div>
                </div>
                <div className='redLawShell'>
                    <div id="thinRedBorder"><div id="redBorder">{redLaws}</div></div>
                </div>
            </div>

            <div id="stacksCounters">
                <div className='stackLayoutShell' id='mainStackLayout'>
                    <div id="stackBorder">
                        <p>Stack</p>   
                        {stats_turno.cant_left}
                    </div>
                    
                </div>
                <div className='stackLayoutShell' id='discardStackLayout'>
                    <div id="stackBorder">
                        <p>Discard</p> 
                        {stats_turno.cant_descart}
                    </div>
                </div>
                <div id='skippedTurnsShell'>
                    <div id="borderSkipped">
                        <p>Skipped Goverments</p>
                        <div className='skippedTurns'>
                            {skipped}
                        </div> 
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}

export default Stats;
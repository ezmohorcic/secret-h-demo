import React, {useState, useContext, useEffect} from "react";
import { SocketContext } from "../Indexjs";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSkull, faDove} from '@fortawesome/free-solid-svg-icons';

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

    for(var i=0;i<5;i++)
    {
        if(i<blue){blueLaws.push(<div className="blueLaw"><div className="blueIcon"><FontAwesomeIcon className="fontAweDove" icon={faDove}/></div></div>)}
        else{blueLaws.push(<div className="blueLaw"></div>)}
    }
    for(var i=0;i<6;i++)
    {
        if(i<red){redLaws.push(<div className="redLaw"> <div className="redIcon"><FontAwesomeIcon className="fontAweSkull" icon={faSkull}/></div></div>)}
        else{{redLaws.push(<div className="redLaw"></div>)}}
    }

    //for(var i=0;i<blue;i++){blueLaws.push(<div className="blueLaw"><FontAwesomeIcon icon={faDove}/></div>)}
    //for(var i=0;i<red;i++){redLaws.push(<div className="redLaw"><FontAwesomeIcon icon={faSkull}/></div>)}
    for(var i=0;i<stats_turno.skipped_turns;i++){blueLaws.push(<div className="skippedDot"></div>)}


    return(
        <div id="lawLayourContainer">
            <div id="lawsCounters">
                <div className='blueLawShell'><div id="thinBlueBorder"><div id="blueBorder">{blueLaws}</div></div></div>
                <div className='redLawShell'><div id="thinRedBorder"><div id="redBorder">{redLaws}</div></div></div>
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
                            {stats_turno.skipped_turns}
                        </div> 
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}

export default Stats;
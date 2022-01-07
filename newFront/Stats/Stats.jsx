import React from 'react';

function Stats()
{
    var blueLaws=[];
    var redLaws=[];
    for(var i;i<props.blue;i++){blueLaws.push(<div className='blueLawShell'><p>Blue</p></div>)}
    for(var i;i<props.red;i++){redLaws.push(<div className='redLawShell'><p>Red</p></div>)}
    return(
        <div className="lawLayourContainer">
            <div className="lawLayoutShell">{blueLaws}</div>
            <div className="lawLayoutShell">{redLaws}</div>
            <div className='stackLayoutShell' id='mainStackLayout'>{props.stats_turno.cant_left}</div>
            <div className='stackLayoutShell' id='discardStackLayout'>{props.stats_turno.cant_descart}</div>
            <div id='skippedTurnsShell'>{props.stats_turno.skipped_turns}</div>
        </div>
    )
}

export default Stats;
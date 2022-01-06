import React from 'react';

function LawsLayout(props)
{
    var blueLaws=props.blue.maps(element=>{return(<div className='blueLawShell'><p>{element}</p></div>)});
    var redLaws=props.red.maps(element=>{return(<div className='redLawShell'><p>{element}</p></div>)});;
    return(
        <div className="lawLayourContainer">
            <div className="lawLayoutShell">{blueLaws}</div>
            <div className="lawLayoutShell">{redLaws}</div>
            <div className='stackLayoutShell' id='mainStackLayout'>{props.cant_left}</div>
            <div className='stackLayoutShell' id='discardStackLayout'>{props.cant_descart}</div>
            <div id='skippedTurnsShell'>{props.skipped_turns}</div>
        </div>
    )
}

export default LawsLayout; 
import React from 'React';

function DeckExam(props)
{
    var disp="block";
    var deckTippedOff= props.tippedOff.map((element)=>{return(<div className='tippedCard'><p>{element}</p></div>)});

    return(
        <div id='DeckExam' style={disp}>
            {deckTippedOff}
            <button onClick={disp="none"}></button>
        </div>
    )
}

export default DeckExam;
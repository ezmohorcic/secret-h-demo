import React from 'React';

function DeckExam(props)
{
    const [disp,setDisp]=useState("block");
    var deckTippedOff= props.tippedOff.map((element)=>{return(<div className='tippedCard'><p>{element}</p></div>)});

    return(
        <div id='DeckExamContainer' style={display=disp}>
            {deckTippedOff}
            <button onClick={setDisp("none")}></button>
        </div>
    )
}

export default DeckExam;
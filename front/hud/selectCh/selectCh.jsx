import React from 'React';
import ChCandidate from "./chCandidate/ChCandidate.jsx";

function SelectCh(props)
{
    const [selected,setSelected]= useState({username:""})
    const [disp,setDisp]=useState("block");
    function preSelectCh(player)
    {
        setSelected(player);
        setDisp("none");
    }

    var arrShow = props.all_players.map((element)=>
    {
        <ChCandidate
            playerInfo={element}
            onSelect={preSelectCh}
        />
    });

    return(
        <div id='SelectChContainer' style={disp}>
            <p>seleccionado: {selected.username}</p>
            {arrShow}
        </div>
    )
}

export default SelectCh;
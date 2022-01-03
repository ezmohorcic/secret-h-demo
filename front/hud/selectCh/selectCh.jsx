import React from 'React';
import ChCandidate from "./chCandidate/ChCandidate.jsx";

function SelectCh()
{
    const [selected,setSelected]= useState({username:""})
    const 
    var disp="block";
    var selected={username:""};
    function preSelectCh(player)
    {
        setSelected(player)
        disp="none";
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
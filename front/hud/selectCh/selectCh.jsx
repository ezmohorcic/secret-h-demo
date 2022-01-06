import React from 'React';
import ChCandidate from "./chCandidate/ChCandidate.jsx";

function SelectCh(props)
{
    const [selected,setSelected]= useState({username:""})
    
    function preSelectCh(player)
    {
        setSelected(player);
        props.setViewSelectedCh("none");
        setSelected({username:""});
    }

    var arrShow = props.all_players.map((element)=>
    {
        if(!props.stats_turno.last_elected.include(element))
        {
            return(
                <ChCandidate
                playerInfo={element}
                onSelect={preSelectCh}
                />
            )
        }
    });

    return(
        <div id='SelectChContainer' style={disp}>
            <p>seleccionado: {selected.username}</p>
            {arrShow}
        </div>
    )
}

export default SelectCh;
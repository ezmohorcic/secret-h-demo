import React from 'react';
import { SocketContext } from "../../app";

function SelectCh(props)
{
    const socket = useContext(SocketContext);
    const [selected,setSelected]=useState({});

    let sendCh= function(element)
    {
        socket.emit("selected_chancellor",{element});
    }

    var chCandidates= props.all_players.map(element=>
        {
            <ChCandidate element={element} setSelected={setSelected}/>
        });

    return(
        <div id='SelectChContainer'>
            <p>Seleccionado: {selected}</p>
            <button onClick={sendCh}>Enviar!</button>
        </div>
    )
}

export default SelectCh;
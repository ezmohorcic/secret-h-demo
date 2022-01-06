import React from 'react';

function Header(props)
{
    function onInicio()
    {
        props.setSoyCero("none");
        socket.emit("init_game",{});
    }
    return(
        <div id="headerContainer" style={{display:props.soyCero}}>
            <button onClick={onInicio()}>iniciar</button>
        </div>
    )
}

export default Header;
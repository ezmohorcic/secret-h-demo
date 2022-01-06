import React from 'react';

function Player(props)
{
    return(
        <li id={'player'+props.player.position}>
            <p className='username'>{props.player.username}</p>
            <p className='rol'>{props.player.rol}</p>
        </li>
    )
}

export default Player;
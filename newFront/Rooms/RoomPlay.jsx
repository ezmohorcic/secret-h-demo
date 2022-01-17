import React from 'react';
import { io, Socket, socketio } from 'socket.io-client';


export default function RoomPlay()
{
    const renderHud=function(){if(alive==true){return <Hud/>}}
    return(
        <React.Fragment>
            <Header/>
            <Players/>
            <Stats/>
            {renderHud()}
        </React.Fragment>
    )
}

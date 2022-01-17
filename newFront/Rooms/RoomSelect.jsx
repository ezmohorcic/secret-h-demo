import React, { useEffect, useState, useContext } from 'react';
import { io, Socket, socketio } from 'socket.io-client';
import { SocketContext } from '../Indexjs.js';

export default function RoomSelect()
{
    const socket = useContext(SocketContext);
    const [roomNumber,setRoomNumber]=useState(0);
    const renderHud=function(){if(alive==true){return <Hud/>}}
    const sendRoom=socket.emit("join_room",roomNumber);
    const newRoom=socket.emit("new_room");
    return(
        <div>
            <h1>Secret Hitler!</h1>
            <button id='createButton' onClick={}>Join!</button>
            <input type="text" name="roomNumber" placeholder='Room Number' id="idRoom" value={roomNumber} onChange={(e)=>setRoomNumber(e.target.value)}/>
            <button id='joinButton'>Create...</button>
        </div>
    )
}

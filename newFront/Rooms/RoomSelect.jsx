import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { io, Socket, socketio } from 'socket.io-client';
import { SocketContext } from '../Indexjs.js';

export default function RoomSelect()
{
    const socket = useContext(SocketContext);
    const [roomNumber,setRoomNumber]=useState("");
    const [unit,setUnit]=useState('');
    //const renderHud=function(){if(alive==true){return <Hud/>}}
    const sendRoom=function(){socket.emit("join_room",roomNumber);}
    const joinRoom=function(){socket.emit("join_room",unit);}
    const newRoom=function(){socket.emit("new_room");}
    useEffect(()=>
    {
        socket.on("join_room",function(msg)
        {
            console.log(msg);
            setUnit(msg);
        });
    },[socket]);

    function roomsview(){
        if(unit=="")
        {
            return(
                <div id='roomselectContainer'>
                    <h1>Secret Hitler!</h1>
                    <input type="text" name="roomNumber" placeholder='Room Number' id="idRoom" value={roomNumber} onChange={(e)=>setRoomNumber(e.target.value)}/>
                    <Link id='joinButton' to={"/"+roomNumber} onClick={sendRoom}>Join!</Link>
                    <br /><br />
                    <button id='createButton' onClick={newRoom}>Create...</button>
                </div>
            )
        }
        else
        {
            return(<Link to={"/"+unit} onClick={joinRoom}>Join!</Link>)
        }
    }
    return(<div>{roomsview()}</div>)
}

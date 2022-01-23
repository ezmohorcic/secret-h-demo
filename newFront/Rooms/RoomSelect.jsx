import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { io, Socket, socketio } from 'socket.io-client';
import { SocketContext } from '../Indexjs.js';
import './RoomSelect.css';

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
                <div id='roomSelect'>
                    <div id='imgTitleShell'><img id='imgTitle' src="../img/sh_banner.png" alt="" /></div>
                    <div id='ticketWholeContainer'>
                        <div id='mainTicketPart'>
                            <p>--  You've recieved your ticket back to the Weimar Republic  --  --  date: xx/xx/193x  --</p>
                            <div id='mainJoinShell'>
                                <input type="text" name="roomNumber" placeholder='Room Id' id="idRoomInput" value={roomNumber} onChange={(e)=>setRoomNumber(e.target.value)}/>
                                <div className='joinBShell'><Link id='joinButton' className='joinB' to={"/"+roomNumber} onClick={sendRoom}>travel</Link></div>
                            </div> 
                            <p>--  Approx. Time: 50 min  --  Age: +17  -- Qty players: 5-10  --</p>
                        </div>
                        <div id='sideTicketPart'>
                            <p>Will you start this?</p>
                            <button id='createButton' onClick={newRoom}>Create a Secret Hitler</button>
                            
                        </div>
                        
                    </div>
                </div>
            )
        }
        else
        {
            return(<div className='joinBShell'><Link className='joinB' to={"/"+unit} onClick={joinRoom}>Join!</Link></div>)
        }
    }
    return(<div>{roomsview()}</div>)
}

import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { io, Socket, socketio } from 'socket.io-client';
import { SocketContext } from '../Indexjs.js';
import { CSSTransition } from 'react-transition-group';

import './RoomSelect.css';
import BirdSvg from '../img/BirdSvg.jsx';

export default function RoomSelect()
{
    const socket = useContext(SocketContext);
    const [roomNumber,setRoomNumber]=useState("");
    const [unit,setUnit]=useState('');
    //const renderHud=function(){if(alive==true){return <Hud/>}}
    const sendRoom=function(){socket.emit("join_room",roomNumber);}
    const joinRoom=function(){socket.emit("join_room",unit);}
    const newRoom=function(){socket.emit("new_room");}

    let today = new Date(),
    date =today.getDate() + '/' + (today.getMonth() + 1) + '/';
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
                            <p className='notesMain'>--  You've recieved your ticket back to the Weimar Republic  --  date: {date}193x  --</p>
                            <div id='mainJoinShell'>
                                <input type="text" name="roomNumber" placeholder='Wagon' id="idRoomInput" value={roomNumber} onChange={(e)=>setRoomNumber(e.target.value)}/>
                                <div className='joinBShell'><Link id='joinButton' className='joinB' to={"/"+roomNumber} onClick={sendRoom}>travel</Link></div>            
                            </div>
                            <div id='subrayadoClaro'></div>
              
                            <p className='notesMain'>--  Approx. Time: 50 min  --  Age: +17  -- Qty of passengers: 5-10  --</p>
                        </div>
                        <div id='sideTicketPart'>
                            <p>Will you start this?</p>
                            {/* <p>Create a</p> */}
                            <button id='createButton' onClick={newRoom}><img id='newRoomImg' src="../img/output-onlinepngtools.png" alt="" /></button>
                        </div>
                    </div>
                </div>
            )
        }
        else
        {
            return(
                <div id='roomSelect'>
                <div id='imgTitleShell'><img id='imgTitle' src="../img/sh_banner.png" alt="" /></div>
                <div id='ticketWholeContainer'>
                    <div id='mainTicketPart'>
                        <p className='notesMain'>--  You've recieved your ticket back to the Weimar Republic  --  date: {date}193x  --</p>
                        <div id='mainJoinShell'>
                            <input type="text" name="roomNumber" placeholder='Wagon' id="idRoomInput" value={unit} onChange={(e)=>setRoomNumber(e.target.value)}/>
                            <div className='joinBShell'><Link id='joinButton' className='joinB' to={"/"+unit} onClick={joinRoom}>travel</Link></div>
                        </div> 
                        <div id='subrayadoClaro'></div>
                        <p className='notesMain'>--  Approx. Time: 50 min  --  Age: +17  -- Qty of passengers: 5-10  --</p>
                    </div>
                </div>
            </div>
            )
        }
    }

    return(<React.Fragment>{roomsview()}</React.Fragment>)
}

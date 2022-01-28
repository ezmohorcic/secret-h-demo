import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { io, Socket, socketio } from 'socket.io-client';
import { SocketContext } from '../Indexjs.js';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft} from '@fortawesome/free-solid-svg-icons';

import {roomNumber,unit} from '../redux/actions.js';
import './RoomSelect.css';

export default function RoomSelect()
{
    const socket = useContext(SocketContext);
    const room=useSelector((state)=>state.room);
    const dispatch=useDispatch();
    
    const sendRoom=function()
    {
        if(room.roomNumber!=""){socket.emit("join_room",room.roomNumber);}
    }
    const joinRoom=function()
    {
        if(room.unit!=""){socket.emit("join_room",room.unit);}
    }
    const newRoom=function(){socket.emit("new_room");}

    let today = new Date(),
    date =today.getDate() + '/' + (today.getMonth() + 1) + '/';
    useEffect(()=>
    {
        socket.on("join_room",function(msg)
        {
            console.log(msg);
            dispatch(unit(msg));
            navigator.clipboard.writeText(msg).then(()=>{alert(`Wagon room copied on Clipboard! Send it to your friends!`);})
        });

        socket.on("wagon_error",function(){
            alert("This wagon was not found!");
        });
    },[socket]);

    function roomsview(){
        if(room.unit=="")
        {
            return(
                <div id='roomSelect'>
                    <div id='imgTitleShell'><img id='imgTitle' src="../img/sh_banner.png" alt="" /></div>
                    <div id='ticketWholeContainer'>
                        <div id='mainTicketPart'>
                            <p className='notesMain'>--  You've recieved your ticket back to the Weimar Republic  --  date: {date}193x  --</p>
                            <div id='mainJoinShell'>
                                <div className="arrowShell"><FontAwesomeIcon icon={faArrowRight}/></div>
                                <input type="text" name="roomNumber" placeholder='Wagon' id="idRoomInput" value={room.roomNumber} onChange={(e)=>dispatch(roomNumber(e.target.value))}/>
                                <div className='joinBShell'><Link id='joinButton' className='joinB' to={"/"+room.roomNumber} onClick={sendRoom}>travel</Link></div> 
                                <div className="arrowShell"><FontAwesomeIcon icon={faArrowLeft}/></div>      
                            </div>
                            <p className='notesMain'>--  Approx. Time: 50 min  --  Age: +17  -- Qty of passengers: 5-10  --</p>
                        </div>
                        <div id='sideTicketPart'>
                            <p>Will <span style={{fontStyle:"italic",fontWeight:"bolder"}}>you</span> start this?</p>
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
                            <div className="arrowShell"><FontAwesomeIcon icon={faArrowRight}/></div>
                            <input type="text" name="roomNumber" placeholder='Wagon' id="idRoomInput" value={room.unit}  onChange={(e)=>dispatch(roomNumber(e.target.value))}/>
                            <div className='joinBShell'><Link id='joinButton' className='joinB' to={"/"+room.unit} onClick={joinRoom}>travel</Link></div>
                            <div className="arrowShell"><FontAwesomeIcon icon={faArrowLeft}/></div> 
                        </div> 
                        <p className='notesMain'>--  Approx. Time: 50 min  --  Age: +17  -- Qty of passengers: 5-10  --</p>
                    </div>
                </div>
            </div>
            )
        }
    }

    return(<React.Fragment>{roomsview()}</React.Fragment>)
}

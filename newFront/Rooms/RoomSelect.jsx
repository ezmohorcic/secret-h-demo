import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { io, Socket, socketio } from 'socket.io-client';
import { SocketContext } from '../Indexjs.js';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft, faDemocrat, faEye, faSkull, faHandshake} from '@fortawesome/free-solid-svg-icons';

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

    return(
        <React.Fragment>
        {roomsview()}
        <div id='howToPlayContainer'>
            <h1>How To Play:</h1>
            <h2>Overview:</h2>
                <div id="overviewContainer">
                        <p>Secret Hitler is a deception game were there are two teams, liberals and fascists,the latest having hitler too.</p>
                        <p>It's a +17 game, for between 5-10 players, that takes from 25 to 50 minutes to play, depending on the number of players and strategies taken.</p>
                        <p>
                            The game starts,after all players enter and change their name, by clicking on "Sound Whistle", then, you'll be given a team,
                            and the player on position 0 (the one on the top left) becomes the first pre-elected President.
                        </p>
                        <p>
                            Each turn, a new player will be pre-selected President in order of position (starting from 0), and has to
                            choose a pre-selected <span style={{fontStyle:"italic",fontWeight:"bolder"}}>chancellor</span> (that can't be the last <span style={{fontStyle:"italic",fontWeight:"bolder"}}>president</span> or <span>chancellor</span>), then all the players vote
                            yes(Ja!) or no(Nein!). 
                        </p>
                    <h3 className='h3'>What if the duo doesn't get more that 50% of votes?...</h3>
                        <p>
                               In that case the <span style={{fontStyle:"italic",fontWeight:"bolder"}}>skipped Goverments</span> card will get an aditional perforation, to a max of 3, when
                               that happens, the first law of the stack will be played, if it's a red card and by playing it a power is unlocked
                               the last elected <span style={{fontStyle:"italic",fontWeight:"bolder"}}>president</span> will be given it to use.
                        </p>
                    <h3 className='h3'>What if the duo does get more that 50% of votes?...</h3>
                        <p>
                            Then the <span style={{fontStyle:"italic",fontWeight:"bolder"}}>president</span> will take 3 cards from the stack, and click on the one that will be discarded, then
                            it will be passed to the <span style={{fontStyle:"italic",fontWeight:"bolder"}}>chancellor</span> that'll do the same, putting into play the remaining card, that, as mentioned
                            before, if red, could trigger a new power to the president. Those powers will be showed below.
                        </p>
                    <h3 className='h3'>Powers of the President:</h3>
                        <p>there are 4 types of power that the president can get through fascist laws:</p>
                        <ul id='ulListPower'>
                            <li class='liListPower'><span style={{fontStyle:"italic",fontWeight:"bolder"}}>Examine the Stack:</span>  This will show the top 3 cards of the stack.</li>
                            <li class='liListPower'><span style={{fontStyle:"italic",fontWeight:"bolder"}}>Examine a Player ~<FontAwesomeIcon icon={faEye}/>~:</span> This will show a hud from where you can choose to see the rol of another player. </li>
                            <li class='liListPower'><span style={{fontStyle:"italic",fontWeight:"bolder"}}>Select Next President ~<FontAwesomeIcon icon={faHandshake}/>~:</span> This will show a hud from where you can choose the next candidate to <span style={{fontStyle:"italic",fontWeight:"bolder"}}>president</span>. </li>
                            <li class='liListPower'><span style={{fontStyle:"italic",fontWeight:"bolder"}}>Kill a Player ~<FontAwesomeIcon icon={faSkull}/>~:</span> This will show a hud from where you can choose someone to kill.</li>
                        </ul>
                    <h3 className='h3'>How Do I Win?...</h3>
                        <p>It depends on what team you are:</p>
                        <p><span style={{fontStyle:"italic",fontWeight:"bolder"}}>Liberal:</span> Win when they get 5 <span style={{fontStyle:"italic",fontWeight:"bolder"}}>liberal</span> laws or Hitler is killed</p>
                        <p><span style={{fontStyle:"italic",fontWeight:"bolder"}}>Fascist:</span> Win when they get 6 <span style={{fontStyle:"italic",fontWeight:"bolder"}}>fascist</span> laws or Hitler gets elected chancellor when 3 or more <span>fascist</span> laws are at play</p>
                </div>
            <h2>In-Game Queues:</h2>
                <div id="inGameQContainer">
                    <h3 className='h3'>Players Hud:</h3>
                        <p>
                            There are a few queues of whats happening in the game from the list of players, below it's shown what the
                            background of each players mean:
                            <div id="backGColorContainer">
                                
                            </div> 
                        </p>
                        <p>
                            Inside, the drawing in the center can be different and can have different colors depending on your rol and theirs 
                            (Fascist and Hitler if there are less than 7 players can see everyone rol):
                        </p>
                        <div id="stateColorContainer">

                        </div>
                    <h3 className='h3'>Stats Hud:</h3>
                        <p>the <span style={{fontStyle:"italic",fontWeight:"bolder"}}>Stack</span> card shows how many cards are left</p>
                        <p>the <span style={{fontStyle:"italic",fontWeight:"bolder"}}>Discarded</span> card shows how many cards have been discarted</p>
                        <p>the <span style={{fontStyle:"italic",fontWeight:"bolder"}}>Skipped Goverments</span> card shows how many cards have been discarted</p>
                    <h3 className='h3'>Selection Hud:</h3>
                        <p>In "normal selection" you can have two huds open up, the voting hud or the chancellor selection hud</p>
                        <div id="showNormalSelectionsContainer">
                                <div id="showVoteContainer">

                                </div>
                                <div id="singleChancellorSelectButContainer">

                                </div>
                        </div>
                        
                    <h3 className='h3'>Power Hud:</h3>
                        <p>There are, as said before, 4 types of power, below you can see a button of each to guide you </p>
                </div>
            <h2>In-Deph Rules:</h2>
        </div>
        </React.Fragment>
    )
}

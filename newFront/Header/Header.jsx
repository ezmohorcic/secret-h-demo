import React, {useState, useContext, useCallback, useEffect} from "react";
import { SocketContext } from "../Indexjs";
import { useDispatch, useSelector } from "react-redux";
import {setPlayer_username,soyCeroTrue,soyCeroFalse} from "../redux/actions.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLevelDownAlt} from '@fortawesome/free-solid-svg-icons';

import './Header.css';

function Header()
{

    const socket = useContext(SocketContext);
    const [newName,setNewName]=useState("");
    const dispatch = useDispatch();
    
    const player_data=useSelector((state)=>state.player_data);
    console.log(player_data);
    const soyCeroView=useSelector((state)=>state.soyCeroView);

    const sendNewName = function ()
    {
        socket.emit("changed_username",{username:newName});
        dispatch(setPlayer_username(newName));
        setNewName("");
    }
    const sendInit = function(){socket.emit("init_game",{})}

    const initButton = function()
    {
        
        if(soyCeroView)
        {
            return(
                <div id="initGameContainer">
                    <div id="leverCont"><FontAwesomeIcon id="leverInit" icon={faLevelDownAlt}/></div>
                    <button id="initGame"onClick={sendInit}>Sound Whistle</button>
                </div>
            )
        }
    };
    return(
        <div id="headerContainer" >
            <div id='imgHeaderShell'><img id='imgHeader' src="../img/output-onlinepngtools.png" alt="" /></div>
            <div id="nameChangeContainer">
                <div id="nameImputCont"><input type="text" name="newName" id="newNameInput" placeholder="New Name" value={newName} onChange={e =>{setNewName(e.target.value)}}/></div>
               <div id="sendCont"><button id="sendNewName" onClick={sendNewName}>Send Name</button></div> 
            </div> 
            <div id="infoContainer">
                <p><span style={{fontStyle:"italic",fontWeight:"bolder"}}>Name: </span> {player_data.username}</p>
                <p><span style={{fontStyle:"italic",fontWeight:"bolder"}}>Position: </span>{player_data.position}</p>
                <p><span style={{fontStyle:"italic",fontWeight:"bolder"}}>Rol: </span>{player_data.rol}</p>
                <p><span style={{fontStyle:"italic",fontWeight:"bolder"}}>State: </span>{player_data.estado}</p>
                <p><span style={{fontStyle:"italic",fontWeight:"bolder"}}>Wagon: </span>{player_data.sala}</p>
            </div>
            {initButton()}
        </div>
        
    )
}

export default Header;
import React, {useState, useContext, useCallback, useEffect} from "react";
import { SocketContext } from "../Indexjs";
import { useDispatch, useSelector } from "react-redux";
import {setPlayer_username,soyCeroTrue,soyCeroFalse} from "../redux/actions.js";

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
                    <button id="initGame"onClick={sendInit}>Iniciar</button>
                </div>
            )
        }
    };
    return(
        <div id="headerContainer" >
            <div id="infoContainer">
                <p>{player_data.username}</p>
                <p>{player_data.position}</p>
                <p>{player_data.rol}</p>
                <p>{player_data.estado}</p>
            </div>
            <div id="nameChangeContainer">
                <input type="text" name="newName" id="newNameInput" value={newName} onChange={e =>{setNewName(e.target.value)}}/>
                <button id="sendNewName" onClick={sendNewName}>Nuevo Nombre</button>
            </div>   
            {initButton()}
        </div>
        
    )
}

export default Header;
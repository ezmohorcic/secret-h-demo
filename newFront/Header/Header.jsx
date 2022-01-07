import React, {useState, useContext, useCallback, useEffect} from "react";
import { SocketContext } from "../app";


function Header(props)
{

    const socket = useContext(SocketContext);
    const [newName,setNewName]=useState("");

    const sendNewName = function ()
    {
        socket.emit("changed_username",{username:newName});
        setNewName("");
    }
    const sendInit = function(){socket.emit("init_game",{})}
    
    return(
        <div id="headerContainer" >
            <div id="nameChangeContainer">
                <input type="text" name="newName" id="newNameInput" value={newName} onChange={e =>{setNewName(e.target.value)}}/>
                <button id="sendNewName" onClick={sendNewName}>Nuevo Nombre</button>
            </div>
            <div id="initGameContainer" style={props.soyCeroView}>
                <button id="initGame"onClick={sendInit}>Iniciar</button>
            </div>
        </div>
        
    )
}

export default Header;
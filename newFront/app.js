import React, { useEffect, useState, useContext } from 'react';
//import { io, Socket, socketio } from 'socket.io-client';
import Header from "./Header/Header.jsx";
import Players from "./Players/Players.jsx"
import Stats from "./Stats/Stats.jsx"
import Hud from "./Hud/Hud.jsx"
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from './Indexjs.js';
import {setNext_pm, setStats_turno,setOtherPlayer_name, setAllPlayer_data,setPlayer_position,setPlayer_rol,unAlive,setOtherPlayer_Death,setAll_players,setNew_player,soyCeroFalse,soyCeroTrue,setKnownRols} from "./redux/actions.js"
import './app.css';
/*const socket = io.connect('http://localhost:3000/')
export const SocketContext = React.createContext()*/

function App() 
{
    const socket = useContext(SocketContext);
    const dispatch = useDispatch();
    const alive= useSelector((state)=>state.alive);

    useEffect(()=>
    {   
        console.log("useEffect")
        socket.on("connect_error", (err) => {console.log(`connect_error due to ${err.message}`)});

        socket.on("your_data",function(msg)
        {
            dispatch(setAllPlayer_data(msg.userData))
            dispatch(setAll_players(msg.all_players))
            msg.userData.position==0 ? dispatch(soyCeroTrue(true)) : dispatch(soyCeroFalse(false));
        });

        socket.on("new_position",function(msg)
        {
            dispatch(setPlayer_position(msg.position));
            dispatch(setAll_players(msg.players));
            msg.position==0 ? dispatch(soyCeroTrue(true)) : dispatch(soyCeroFalse(false)); 
            socket.emit("set_sv_position",msg.position)
        });

        socket.on("new_player",function(msg)
        {
            dispatch(setAll_players(msg));  
        });

        socket.on("change_username_on_position",function(msg){dispatch(setOtherPlayer_name(msg))});
  
        socket.on("your_rol",function(msg){dispatch(setPlayer_rol(msg))});

        socket.on("init_game_client",function(msg)
        {
            dispatch(setStats_turno(msg.stats));
            dispatch(soyCeroFalse(false));
            dispatch(setAll_players(msg.jugadores));
            dispatch(setNext_pm(msg.next_pm));
        });

        socket.on("assasinated",function(msg)
        {
            dispatch(unAlive()) 
            alert("Has sido asesinado por orden del Primer Ministro");
        });

        socket.on("assasination",function(msg){dispatch(setOtherPlayer_Death(msg))});

        socket.on("next_turn",function(msg)
        {
            dispatch(setStats_turno(msg.stats));
            dispatch(setNext_pm(msg.next_pm));
        });

        socket.on("blue_wins",function(msg)
        {
            alert("BLUE WINS");
            msg==0 ? dispatch(soyCeroTrue(true)) : dispatch(soyCeroFalse(false)); 
        });

        socket.on("red_wins",function(msg)
        {
            alert("RED WINS");
            msg==0 ? dispatch(soyCeroTrue(true)) : dispatch(soyCeroFalse(false)); 
        });

        socket.on("you_chancellor",function(msg)
        {
            alarm()
        });

    },[socket]);

    const renderHud=function(){if(alive==true){return <Hud/>}}
    return(
        <div id='appContainer'>
                <Header/>
                <Players/>
                <Stats/>
                {renderHud()}      
        </div>
    )
}
export default App;
import React, { useEffect, useState } from 'react';
import { io, Socket, socketio } from 'socket.io-client';
import Header from "./Header/Header.jsx";
import Players from "./Players/Players.jsx"
import Stats from "./Stats/Stats.jsx"
import Hud from "./Hud/Hud.jsx"
import { useDispatch, useSelector } from "react-redux";

//import store from "./redux/store.js"
import {setStats_turno,setOtherPlayer_name, setAllPlayer_data,setPlayer_position,setPlayer_rol,unAlive,setOtherPlayer_Death,setAll_players,setNew_player,soyCeroFalse,soyCeroTrue,setKnownRols} from "./redux/actions.js"

const socket = io.connect('http://localhost:3000/')
export const SocketContext = React.createContext()

function App() 
{
    const dispatch = useDispatch();
    const alive= useSelector((state)=>state.alive);
    //---
    //const [all_players,setAll_players]=useState([]);
    //const [player_data,setPlayer_data]=useState({});
    //---
    //const [soyCeroView,setSoyCeroView]=useState({display:"none"})
    //---
    //const [stats_turno,setStats_turno]=useState({});
    //const [knownRols,setKnownRols]=useState([]);
    //const [alive,setAlive]=useState(true);

    useEffect(()=>
    {
        socket.on("connect_error", (err) => {console.log(`connect_error due to ${err.message}`)});

        socket.on("your_data",function(msg)
        {
            console.log("your_data")
            dispatch(setAllPlayer_data(msg))
            msg.position==0 ? dispatch(soyCeroTrue(true)) : dispatch(soyCeroFalse(false));
        });

        socket.on("new_position",function(msg)
        {
            dispatch(setPlayer_position(msg.position));
            dispatch(setAll_players(msg.players));
            msg.position==0 ? dispatch(soyCeroTrue(true)) : dispatch(soyCeroFalse(false)); 
        });

        socket.on("new_player",function(msg)
        {
            console.log("new_player")
            dispatch(setAll_players(msg));
        });

        socket.on("change_username_on_position",function(msg)
        {
            dispatch(setOtherPlayer_name(msg)) //requiere msg.position y msg.username
        });
  
        socket.on("your_rol",function(msg)
        {
            dispatch(setPlayer_rol(msg)) //msg=jugadores[n].rol
        });

        socket.on("init_game_client",function(msg)
        {
            console.log("init")
            dispatch(setStats_turno(msg.stats))
            dispatch(soyCeroFalse(false))
            dispatch(setAll_players(msg.jugadores))
        });

        socket.on("assasinated",function(msg)
        {
            dispatch(unAlive()) 
            alert("Has sido asesinado por orden del Primer Ministro");
        });

        socket.on("assasination",function(msg){dispatch(setOtherPlayer_Death(msg))});
    },[socket]);

    const renderHud=function(){if(alive==true){return <Hud/>}}
    return(
        <div id='appContainer'>
            <h1>REACT</h1>
            <SocketContext.Provider value={socket}>
                <Header/>
                <Players/>
                <Stats/>
                {renderHud()}
            </SocketContext.Provider>           
        </div>
    )
}
export default App;
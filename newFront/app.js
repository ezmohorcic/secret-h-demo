import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import Header from "./Header/Header.jsx";
import Players from "./Players/Players.jsx";
import Stats from "./Stats/Stats.jsx";
import Hud from "./Hud/Hud.jsx";
import NewsBox from "./NewsBox/NewsBox.jsx";

import { SocketContext } from './Indexjs.js';
import {setNewsBox,setNext_pm, setStats_turno,setOtherPlayer_name, setAllPlayer_data,setPlayer_position,setPlayer_rol,unAlive,setOtherPlayer_Death,setAll_players,setNew_player,soyCeroFalse,soyCeroTrue,setKnownRols, roomNumber} from "./redux/actions.js"
import './app.css';

function App() 
{
    const socket = useContext(SocketContext);

    const dispatch = useDispatch();
    const alive= useSelector((state)=>state.alive);
    const room=useSelector((state)=>state.room)


    useEffect(()=>
    {   
        socket.on("connect_error", (err) => {console.log(`connect_error due to ${err.message}`)});

        socket.on("your_data",function(msg)
        {
            console.log("your_data");
            console.log(msg)
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
            console.log("new player")
            console.log(msg)
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
            //setResetEv(true);
        });

        socket.on("duo_won",function()
        {
            dispatch(setNewsBox({title:"duo_won"}));
        });

        socket.on("assasinated",function(msg)
        {
            dispatch(unAlive());
            alert("You were executed by order of the president");
            dispatch(setNewsBox({title:"assasinated"}));
        });

        socket.on("assasination",function(msg)
        {
            alert("You were not on the list, but someone else was...")
            dispatch(setOtherPlayer_Death(msg))
            dispatch(setNewsBox({title:"assasination"}));
        });

        socket.on("next_turn",function(msg)
        {
            dispatch(setStats_turno(msg.stats));
            dispatch(setNext_pm(msg.next_pm));
        });

        socket.on("blue_wins",function(msg)
        {
            console.log(msg)
            alert("BLUE WINS");
            msg==0 ? dispatch(soyCeroTrue(true)) : dispatch(soyCeroFalse(false)); 
        });

        socket.on("red_wins",function(msg)
        {
            console.log(msg)
            alert("RED WINS");
            msg==0 ? dispatch(soyCeroTrue(true)) : dispatch(soyCeroFalse(false)); 
        });

        socket.on("you_chancellor",function(msg)
        {
            dispatch(setNewsBox({title:"you_chancellor"}));
            console.log("you chancellor")
            alert("You were selected to be the Chancellor")
            
        });

        socket.on("rest_know_examine_deck",function(msg)
        {
            dispatch(setNewsBox({title:"rest_know_examine_deck",payload:msg}));
        });
    
        socket.on("rest_know_examine_player",function(msg)
        {
            dispatch(setNewsBox({title:"rest_know_examine_player",payload:msg}));
        });
    
        socket.on("rest_know_pick_candidate",function(msg)
        {
            dispatch(setNewsBox({title:"rest_know_pick_candidate",payload:msg}));
        });

        socket.on("rest_know_kill",function(msg)
        {
            dispatch(setNewsBox({title:"rest_know_kill",payload:msg}));
        });

    },[socket]);

    const fallBackRoom = ()=>
    {
        if(room.roomNumber!="" || room.unit!="")
        {
            return(
                <React.Fragment>
                    <Header/>
                    <Players/>
                    <Stats/>
                    {/* {renderHud()} */}
                    <Hud/>  
                    <NewsBox/>    
                </React.Fragment>
            )
        }
        else
        {
            return(
                <React.Fragment>
                <p>OOPSIE WOOPSIE!! UwU We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!</p>
                <Link to={"/"}>Try another ticket!</Link>
                </React.Fragment>
            )
        }
    }
    return(
        <div id='appContainer'>
            {fallBackRoom()}
        </div>
    )
}
export default App;
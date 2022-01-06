import React, { useEffect, useState } from 'react';
import Header from "./header/Header.jsx";
import Players from "./players/Players.jsx";
import LawsLayout from "./laws/LawsLayout.jsx";
import Hud from "./hud/Hud.jsx";
import { io, Socket } from 'socket.io-client';
var socket = io();

function App() 
{
    const [player_data,setPlayer_data]=useState({});
    const [all_players,setPlayers]=useState([]);
    const [stats_turno,setStats_turno]=useState({});
    const [cartastomadas,setCartasTomadas]=useState([]);


    const [cardDisp,setCardDisp]=useState("none");
    const [voteDisp,setVoteDisp]=useState("none");
    const [ViewSelectedCh,setViewSelectedCh]=useState("none");
    const [soyCero,setSoyCero]=useState(false);
    const [pm,setPm]=useState({});


    socket.on("your_data",function(msg)
    {
        setPlayer_data(msg);
        console.log(player_data);
        if(player_data.position==0){setSoyCero(true);}
        else{setSoyCero(false);}
    });

    socket.on("new_position",function(msg)
    {
        let newPosition=player_data;
        newPosition.position=msg;
        setPlayer_data(newPosition);
        if(player_data.position==0){setSoyCero(true);}
        else{setSoyCero(false);}
    });

    socket.on("change_username_on_position",function(msg)
    {
        var temp=all_players;
        temp[msg.position].username=msg.username;
        setPlayers(temp);
    });

    socket.on("new_player",setPlayers(msg));

    socket.on("player_left",setPlayers(msg));

    socket.on("your_rol",function(msg)
    {
        var temp=player_data;
        temp.rol=msg;
        setPlayer_data(temp);
    });

    socket.on("init_game_client",function(msg)
    {
        setStats_turno(temp);
    });

    socket.on("asigned_pm",function(msg)
    {
        console.log("soy pm");
        setViewSelectedCh("block");
    });
    socket.on("init_vote",);
    socket.on("pm_desition_client",);
    socket.on("chancellor_turn",);
    socket.on("next_turn",);
    socket.on("law_done",);
    socket.on("duo_lost",);
    socket.on("red_wins",);
    socket.on("blue_wins",);
    socket.on("kill",);
    socket.on("pick_candidate",);
    socket.on("examine_deck",);
    socket.on("examine_player",);
    //socket.on("",);
    
    function soyCero(){};
    return (
        <div id='appContainer'>
            <Header/>
            <Players pm_pos={props.pm_pos} players={all_players}/>
            <LawsLayout skipped_turns={skipped_turns} cant_descart={props.cant_descart} cant_left={stats_turno.cant_left} blueLaws={stats_turno.blue} redLaws={stats_turno.red}/>
            <Hud setCardDisp={setCardDisp} setVoteDisp={setVoteDisp} setViewSelectedCh={setViewSelectedCh} cartasTomadas={cartastomadas} all_players={all_players} voteDisp={voteDisp}/>
        </div>    
    )
}
export default App;
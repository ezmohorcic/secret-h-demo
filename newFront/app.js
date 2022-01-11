import React, { useEffect, useState } from 'react';
import { io, Socket, socketio } from 'socket.io-client';
import Header from "./Header/Header.jsx";
import Players from "./Players/Players.jsx"
import Stats from "./Stats/Stats.jsx"
import Hud from "./Hud/Hud.jsx"

const BLUE="blue"; //ley liberal
const RED="red"; //ley fascista
const H="hitler"; //rol hitler
const FASC="fascista"; //rol fascista
const LIB="liberal";//rol liberal

const socket = io.connect('http://localhost:3000/')
export const SocketContext = React.createContext()

function App() 
{
    //---
    const [all_players,setAll_players]=useState([]);
    const [player_data,setPlayer_data]=useState({});
    //---
    const [soyCeroView,setSoyCeroView]=useState({display:"none"})
    //---
    const [stats_turno,setStats_turno]=useState({});
    const [knownRols,setKnownRols]=useState([]);
    const [alive,setAlive]=useState(true);

    useEffect(()=>
    {
        socket.on("connect_error", (err) => {console.log(`connect_error due to ${err.message}`)});

        socket.on("your_data",function(msg)
        {
            setPlayer_data(msg);
            msg.position==0 ? setSoyCeroView({display:"block"}) :setSoyCeroView({display:"none"});
        });

        socket.on("new_position",function(msg)
        {
            setPlayer_data(msg.position);
            setAll_players(msg.players);
            msg.position.position==0 ? setSoyCeroView({display:"block"}) :setSoyCeroView({display:"none"});
        });

        socket.on("new_player",function(msg)
        {
            setAll_players(msg);
        });

        socket.on("change_username_on_position",function(msg)
        {
            setAll_players(msg);
        });
  
        socket.on("your_rol",function(msg)
        {
            setPlayer_data(msg);
        });

        socket.on("init_game_client",function(msg)
        {
            setStats_turno(msg.stats);
            setSoyCeroView({display:"none"});
            setAll_players(msg.jugadores);
        });

        socket.on("assasinated",function(msg)
        {
            console.log("assasinated")
            setPlayer_data(msg);
            setAlive(false);
            alert("Has sido asesinado por orden del Primer Ministro");
        });
        
        socket.on("assasination",function(msg)
        {setAll_players(msg)
         console.log("assasination")
        });
    },[socket]);

    const renderHud=function(){if(alive==true){return <Hud setKnownRols={setKnownRols}/>}}
    return(
        <div id='appContainer'>
            <h1>REACT</h1>
            <SocketContext.Provider value={socket}>
                <Header soyCeroView={soyCeroView} setSoyCeroView={setSoyCeroView} player_data={player_data}/>
                <Players knownRols={knownRols} player_data={player_data} all_players={all_players}/>
                <Stats stats_turno={stats_turno}/>
                {renderHud()}
            </SocketContext.Provider>           
        </div>
    )
}

export default App;

//<div className="hudShell"><Vote voteDisp={voteDisp} setVoteDisp={setVoteDisp}/></div>
// <div className="hudShell"><SelectCh last_elected={stats_turno.last_elected} viewSelectedCh={viewSelectedCh} setViewSelectedCh={setViewSelectedCh} all_players={all_players}/></div>  
//
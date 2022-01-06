import React, { useEffect, useState } from 'react';
import Header from "./header/Header.jsx";
import Players from "./players/Players.jsx";
import LawsLayout from "./laws/LawsLayout.jsx";
import Hud from "./hud/Hud.jsx";
import { io, Socket } from 'socket.io-client';
//var socket = io("http://localhost:3000/");

function App() 
{
    const [socket, setSocket] = useState(null);

    useEffect(() => {
      const newSocket = io(`http://localhost:3000`);
      setSocket(newSocket);
      return () => newSocket.close();
    }, [setSocket]);

    const [player_data,setPlayer_data]=useState({});
    const [all_players,setPlayers]=useState([]);
    const [stats_turno,setStats_turno]=useState({});
    const [cartastomadas,setCartasTomadas]=useState([]);

    //---display de huds
    const [cardDisp,setCardDisp]=useState("none");
    const [voteDisp,setVoteDisp]=useState("none");
    const [ViewSelectedCh,setViewSelectedCh]=useState("none");
    //---
    const [emitCards,setEmitCards]=useState("");
    const [soyCero,setSoyCero]=useState("none"); //boton en header para dar inicio. AGREGARLO!
    const [pm,setPm]=useState({});
    const [win,setWin]=useState("none");
    //---
    const [power,setPower]=useState("");
    const [powerPayload,setPowerPayload]=useState(null);
    //---

    useEffect(()=>
    {
        socket.on("your_data",function(msg)
        {
            setPlayer_data(msg);
            console.log(player_data);
            if(player_data.position==0){setSoyCero("block");}
            else{setSoyCero("none");}
        });
    
        socket.on("new_position",function(msg)
        {
            let newPosition=player_data;
            newPosition.position=msg;
            setPlayer_data(newPosition);
            if(player_data.position==0){setSoyCero("block");}
            else{setSoyCero("block");}
        });
    
        socket.on("change_username_on_position",function(msg)
        {
            var temp=all_players;
            temp[msg.position].username=msg.username;
            setPlayers(temp);
        });
    
        socket.on("new_player",setPlayers(msg));
    
        socket.on("player_left", function(msg)
        {
            setPlayers(msg);
            if(player_data.position==0){setSoyCero("block");}
            else{setSoyCero("block");}
        });
    
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
        socket.on("init_vote",function(msg){if(player_data.estado!="muerto"){setVoteDisp("block");}});
    
        socket.on("pm_desition_client",function(msg)
        {
            setCartasTomadas(msg.cartas);
            setEmitCards("pm_desition");
            setViewSelectedCh("block");
        });
    
        socket.on("chancellor_turn",function(msg)
        {
            setCartasTomadas(msg.cartas);
            setEmitCards("chancellor_desition");
            setViewSelectedCh("block");
        });
        socket.on("next_turn",function(msg)
        {
            let temp=stats_turno;
            temp.cant_descart=msg.cant_descart;
            temp.cant_left=msg.cant_left;
            setStats_turno(temp);
            setPm(msg.next_pm);
        });
    
        socket.on("law_done",function(msg)
        {
            var temp=stats_turno;
            if(msg.selected==BLUE){temp.blue++}
            else{temp.red++}
            setStats_turno(temp);
        });
    
        socket.on("duo_lost",function(msg)
        {
            if(msg.passed_law)
            {
                var temp=stats_turno;
                temp.skipped_turns++;
                if(msg.selected==BLUE){temp.blue++}
                else{temp.red++}
                setStats_turno(temp);
            }
        });
    
        socket.on("red_wins",setWin("red"));
    
        socket.on("blue_wins",setWin("blue"));
    
        socket.on("kill",setPower("KillSelect"));
        socket.on("pick_candidate", function(msg)
        {
            setPowerPayload(msg);
            setPower("DeckExam");
        });
        
        socket.on("examine_deck",setPower("PlayerExam"));
        socket.on("examine_player",setPower("PmSelect"));
    },[socket]);
    
    //socket.on("",);
    
    //function soyCero(){};
    return (
        <div id='appContainer'>
            <Header/>
            <h1>REACT</h1>
            <Players player_data={player_data} pm_pos={props.pm_pos} players={all_players}/>
            <LawsLayout skipped_turns={stats_turno.skipped_turns} cant_descart={props.cant_descart} cant_left={stats_turno.cant_left} blueLaws={stats_turno.blue} redLaws={stats_turno.red}/>
            <Hud powerPayload={powerPayload} power={power} tippedOff={tippedOff} emitCards={emitCards} stats_turno={stats_turno} cardDisp={cardDisp} setCardDisp={setCardDisp}  voteDisp={voteDisp} setVoteDisp={setVoteDisp} ViewSelectedCh={ViewSelectedCh} setViewSelectedCh={setViewSelectedCh} cartasTomadas={cartastomadas} all_players={all_players} />
        </div>    
    )
}
export default App;
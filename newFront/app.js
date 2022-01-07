import React, { useEffect, useState } from 'react';
import { io, Socket, socketio } from 'socket.io-client';
import Header from "./Header/Header.jsx";
import Players from "./Players/Players.jsx"


const socket = io.connect('http://localhost:3000/')
export const SocketContext = React.createContext()
function App() 
{
    /*const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(`http://${window.location.hostname}:3000`);
      setSocket(newSocket);
      return () => newSocket.close();
    }, [setSocket]);*/

    const [all_players,setAll_players]=useState([]);
    const [player_data,setPlayer_data]=useState({});
    const [soyCeroView,setSoyCeroView]=useState({display:"none"})
    useEffect(()=>
    {
        socket.on("your_data",function(msg)
        {
            setPlayer_data(msg);
            msg.position==0 ? setSoyCeroView({display:"block"}) :setSoyCeroView({display:"none"});
        });

        socket.on("new_position",function(msg)
        {
            let newPosition=player_data;
            newPosition.position=msg;
            setPlayer_data(newPosition);
            msg==0 ? setSoyCeroView({display:"block"}) :setSoyCeroView({display:"none"});
        });

        socket.on("new_player",function(msg)
        {
            console.log("new_player")
            console.log(msg)
            setAll_players(msg);
            console.log(all_players)
        });

        socket.on("change_username_on_position",function(msg)
        {
            console.log(all_players)
            console.log(msg)
            setAll_players(msg);
        });

        socket.on("player_left", function(msg)
        {
            setAll_players(msg);
            msg.position==0 ? setSoyCeroView({display:"block"}) :setSoyCeroView({display:"none"});
        });

        socket.on("your_rol",function(msg)
        {
            var temp=player_data;
            temp.rol=msg;
            setPlayer_data(temp);
        });

        socket.on("connect_error", (err) => {console.log(`connect_error due to ${err.message}`)});
    },[socket]);

    return(
        <div id='appContainer'>
            <h1>REACT</h1>
            <SocketContext.Provider value={socket}>
                <Header soyCeroView={soyCeroView} setSoyCeroView={setSoyCeroView} player_data={player_data}/>
                <Players all_players={all_players}/>
                {console.log(all_players)}
            </SocketContext.Provider>           
        </div>
    )
}

export default App;
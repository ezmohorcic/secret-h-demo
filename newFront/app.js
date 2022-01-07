import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Header from "./Header/Header.jsx";
import Players from "./Players/Players.jsx"

function App() 
{
    const [socket, setSocket] = useState(null);

    useEffect(() => {
      const newSocket = io(`http://localhost:3000`);
      setSocket(newSocket);
      return () => newSocket.close();
    }, [setSocket]);

    const [all_players,setAll_players]=useState([]);
    const [player_data,setPlayer_data]=useState({});

    return(
        <div id='appContainer'>
            <h1>REACT</h1>
            <Header player_data={player_data}/>
            <Players all_player={all_players}/>
        </div>
    )
}

export default App;
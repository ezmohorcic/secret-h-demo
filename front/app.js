import React from 'react';
import Header from "./header/Header.jsx";
import Players from "./players/Players.jsx";
import Hud from "./hud/Hud.jsx";

function App() 
{
    return (
        <div id='appContainer'>
            <Header/>
            <Players/>
            <Hud/>
        </div>    
    )
}
export default App;
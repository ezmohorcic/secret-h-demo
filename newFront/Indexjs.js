import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//import './index.css';
import App from './app';
import store from './redux/store.js'
import RoomSelect from './Rooms/RoomSelect.jsx'
import {BrowserRouter,Routes,Route} from "react-router-dom";

const socket = io.connect('https://secret-h-demo-v2-h65pv.ondigitalocean.app/')
//const socket = io.connect('http://localhost:3000/')
export const SocketContext = React.createContext()
// element={<App/>}

function Root()
{
  return(
    <SocketContext.Provider value={socket}>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<RoomSelect/>}/>   
          <Route path="/:id" element={<App/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </SocketContext.Provider>
  )
}

ReactDOM.render(
<Root/>,
  document.getElementById('root')
);
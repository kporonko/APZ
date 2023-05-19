import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ReactNotifications} from "react-notifications-component";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Team from "./pages/Team";
import Player from "./pages/Player";
import Game from "./pages/Game";
import Players from "./pages/Players";
import GameCurrent from "./pages/GameCurrent";

function App() {
  return (
      <BrowserRouter>
        <ReactNotifications/>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/team" element={<Team/>}/>
          <Route path="/players" element={<Players/>}/>
          <Route path="/player/:id" element={<Player/>}/>
          <Route path="/game/:id" element={<Game/>}/>
          <Route path="/game/current/" element={<GameCurrent/>}/>
        {/*    Game current add route    */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;

import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ReactNotifications} from "react-notifications-component";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Team from "./pages/Team";
import Player from "./pages/Player";
import Game from "./pages/Game";

function App() {
  return (
      <BrowserRouter>
        <ReactNotifications/>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/team" element={<Team/>}/>
          <Route path="/player/:id" element={<Player/>}/>
          <Route path="/game/:id" element={<Game/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;

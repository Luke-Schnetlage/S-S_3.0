import Pre from "./game_state/Pre"
import Active from "./game_state/Active"
import Post from "./game_state/Post"
import React, { useState } from "react";
import io from 'socket.io-client';

//socket connection to server
const socket = io.connect("https://SandS-replit-rebuild.luke-schnetlage.repl.co");

export default function Game() {
  const [gameState, setGameState] = useState("pre")
  if (gameState === "pre") {
    return (
      <div className="center-align">
        <Pre setGameState={setGameState} />
      </div>
    );
  }

  if (gameState === "active") {
    return (
      <div className="center-align">
        <Active setGameState={setGameState} />
      </div>
    );
  }

  if (gameState === "post") {
    return (
      <div className="center-align">
        <Post setGameState={setGameState} />
      </div>
    );
  }


  return (
    <div className="center-align">
      <h1>Please log in to play</h1>
    </div>
  )

}
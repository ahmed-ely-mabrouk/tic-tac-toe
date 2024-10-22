import React from "react";
import "./App.css";
import { GameBoard } from "./components/game-board";

function App() {
  return (
    <div className="App">
      <h1 className="text-6xl mb-10 mt-4 font-semibold">
        Tic Tac <span className="text-icon-blue">Toe</span>
      </h1>
      <GameBoard />
    </div>
  );
}

export default App;

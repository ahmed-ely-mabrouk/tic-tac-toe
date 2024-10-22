import React from "react";
import "./App.css";
import { GameBoard } from "./components/game-board";

function App() {
  return (
    <div className="App flex flex-col justify-center w-[450px]">
      <h1 className="text-6xl mb-6 mt-2 font-semibold">
        Tic Tac <span className="text-icon-blue">Toe</span>
      </h1>
      <GameBoard />
    </div>
  );
}

export default App;

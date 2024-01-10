import React, { useEffect, useState } from "react";
import Tile from "./Tile.jsx";
import {
  shuffleTiles,
  getNeighbors,
  arraysAreEqual,
} from "./PuzzleGameLogic.jsx";

let winnerText = "";

function SlidingPuzzleGame() {
  const initialTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [tiles, setTiles] = useState(initialTiles);
  const [clickedIndex, setClickedIndex] = useState(null);
  const backgrounds = [
    "tiger.jpg",
    "ladybug.jpg",
    "monalisa.jpg",
    "castle.jpg",
    "jellyfish.jpg",
  ];
  const [backgroundImage, setbackgroundImage] = useState("");
  const [stepCounter, setstepCounter] = useState(0);
  let shuffledTiles = [...tiles];

  useEffect(() => {
    setbackgroundImage(backgrounds[Math.floor(Math.random() * 5)]);

    shuffledTiles = shuffleTiles(tiles);
    setTiles(shuffledTiles);
    winnerText = "";

    return () => {};
  }, []);

  const resetGame = (e) => {
    setstepCounter(0);
    setbackgroundImage(backgrounds[Math.floor(Math.random() * 4) + 1]);
    shuffledTiles = shuffleTiles(tiles);
    setTiles(shuffledTiles);
    winnerText = "";
  };

  const handleTileClick = (e, clickedIndex) => {
    const indexOf9 = tiles.indexOf(9);
    const neighbors = getNeighbors(indexOf9);

    const newTiles = [...tiles];

    if (neighbors.includes(clickedIndex)) {
      setClickedIndex(clickedIndex);

      const temp = newTiles[clickedIndex];
      newTiles[clickedIndex] = newTiles[indexOf9];
      newTiles[indexOf9] = temp;

      if (
        (clickedIndex == 0 && indexOf9 == 1) ||
        (clickedIndex == 1 && indexOf9 == 2) ||
        (clickedIndex == 3 && indexOf9 == 4) ||
        (clickedIndex == 4 && indexOf9 == 5) ||
        (clickedIndex == 6 && indexOf9 == 7) ||
        (clickedIndex == 7 && indexOf9 == 8)
      )
        e.target.classList.toggle("animate-right");

      if (
        (clickedIndex == 2 && indexOf9 == 1) ||
        (clickedIndex == 1 && indexOf9 == 0) ||
        (clickedIndex == 4 && indexOf9 == 3) ||
        (clickedIndex == 5 && indexOf9 == 4) ||
        (clickedIndex == 8 && indexOf9 == 7) ||
        (clickedIndex == 7 && indexOf9 == 6)
      )
        e.target.classList.toggle("animate-left");

      if (
        (clickedIndex == 0 && indexOf9 == 3) ||
        (clickedIndex == 1 && indexOf9 == 4) ||
        (clickedIndex == 2 && indexOf9 == 5) ||
        (clickedIndex == 3 && indexOf9 == 6) ||
        (clickedIndex == 4 && indexOf9 == 7) ||
        (clickedIndex == 5 && indexOf9 == 8)
      )
        e.target.classList.toggle("animate-down");

      if (
        (clickedIndex == 6 && indexOf9 == 3) ||
        (clickedIndex == 7 && indexOf9 == 4) ||
        (clickedIndex == 8 && indexOf9 == 5) ||
        (clickedIndex == 3 && indexOf9 == 0) ||
        (clickedIndex == 4 && indexOf9 == 1) ||
        (clickedIndex == 5 && indexOf9 == 2)
      )
        e.target.classList.toggle("animate-up");

      setTimeout(() => {
        setTiles(newTiles);
        //e.target.style = "";
        setstepCounter(stepCounter + 1);
      }, 450);

      if (arraysAreEqual(newTiles, initialTiles) === true) {
        winnerText =
          "Congratulations! You have completed this puzzle in " +
          stepCounter +
          " steps!";
      }
    }
  };

  return (
    <>
      <h1>Sliding Puzzle Game</h1>
      <h2 style={{ color: "lightgreen" }}>{winnerText}</h2>
      <button className="button-blue" onClick={(e) => resetGame(e)}>
        New Game
      </button>
      {console.log(backgroundImage)}
      <div className="game-area">
        {tiles.map((tile, index) => (
          <Tile
            key={index}
            number={tile - 1}
            onClick={(e) => handleTileClick(e, index)}
            bgImage={backgroundImage}
          />
        ))}
      </div>
    </>
  );
}

export default SlidingPuzzleGame;

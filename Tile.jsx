import React from "react";

const Tile = ({ number, onClick, bgImage }) => {
  let backgroundPositionX, backgroundPositionY;

  const handleClick = (e) => {
    // Invoke the onClick function passed from the parent component

    onClick(e);
  };

  if (number >= 0 && number <= 2) {
    backgroundPositionX = `${number * -200}px`; // Adjust the width of each column based on your requirements
    backgroundPositionY = "0";
  } else if (number >= 3 && number <= 5) {
    backgroundPositionX = `${(number - 3) * -200}px`; // Adjust the width of each column based on your requirements
    backgroundPositionY = "-200px"; // Adjust the height of each row based on your requirements
  } else if (number >= 6 && number <= 8) {
    backgroundPositionX = `${(number - 6) * -200}px`; // Adjust the width of each column based on your requirements
    backgroundPositionY = "-400px"; // Adjust the height of each row based on your requirements
  }

  const divStyle = {
    backgroundPosition: `${backgroundPositionX} ${backgroundPositionY}`, // Adjust the X and Y positions based on the row and column
    backgroundImage: `url(../src/assets/${bgImage})`,
  };

  return (
    <div
      className={number < 8 ? "tile-item" : "tile-item-empty"}
      style={divStyle}
      onClick={handleClick}
    ></div>
  );
};

export default Tile;

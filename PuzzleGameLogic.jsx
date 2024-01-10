export function shuffleTiles(array) {
  let temp = [...array];
  let currentIndex = temp.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [temp[currentIndex], temp[randomIndex]] = [
      temp[randomIndex],
      temp[currentIndex],
    ];
  }
  return temp;
}

export const getNeighbors = (index) => {
  const row = Math.floor(index / 3);
  const col = index % 3;

  const possibleNeighbors = [
    [row - 1, col], // Top neighbor
    [row + 1, col], // Bottom neighbor
    [row, col - 1], // Left neighbor
    [row, col + 1], // Right neighbor
  ];

  // Filter out invalid neighbors
  const validNeighbors = possibleNeighbors.filter(
    ([neighborRow, neighborCol]) =>
      neighborRow >= 0 && neighborRow < 3 && neighborCol >= 0 && neighborCol < 3
  );

  // Convert 2D coordinates to 1D indices
  return validNeighbors.map(
    ([neighborRow, neighborCol]) => neighborRow * 3 + neighborCol
  );
};

export function arraysAreEqual(array1, array2) {
  // Check if the arrays have the same length
  if (array1.length !== array2.length) {
    return false;
  }

  // Iterate over the elements and compare them
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  // If no differences were found, the arrays are equal
  return true;
}

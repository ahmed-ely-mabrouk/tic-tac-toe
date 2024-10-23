export const generateWinningCombinations = (gridSize: number): number[][] => {
  const combinations: number[][] = [];

  const generateRow = (rowIndex: number) => {
    return Array.from({ length: gridSize }, (_, j) => rowIndex * gridSize + j);
  };

  const generateColumn = (colIndex: number) => {
    return Array.from({ length: gridSize }, (_, j) => colIndex + j * gridSize);
  };

  for (let i = 0; i < gridSize; i++) {
    combinations.push(generateRow(i));
    combinations.push(generateColumn(i));
  }

  const diag1 = Array.from({ length: gridSize }, (_, i) => i * gridSize + i);
  combinations.push(diag1);

  const diag2 = Array.from(
    { length: gridSize },
    (_, i) => (i + 1) * gridSize - (i + 1)
  );
  combinations.push(diag2);

  return combinations;
};

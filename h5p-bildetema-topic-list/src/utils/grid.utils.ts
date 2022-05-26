import { Position } from "../types/Position";

export const gridToPercentage = (
    gridPosition: Position,
    numberOfColumns: number,
    numberOfRows: number,
  ): Position => {
    const xPercentage = (gridPosition.x / numberOfColumns) * 100;
    const yPercentage = (gridPosition.y / numberOfRows) * 100;
  
    return {
      x: xPercentage,
      y: yPercentage,
    };
};

export const gridToPercentageScalar = (
    numGrids: number,
    totalGrids: number,
    ): number => {
    return (numGrids / totalGrids) * 100;
}
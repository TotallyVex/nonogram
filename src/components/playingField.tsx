"use client";

import { CellState } from "@/types";
import { Fragment, useState } from "react";
import Cell from "./cell";

export default function PlayingField({ puzzle }: { puzzle: string[] }) {
  const [puzzleState, setPuzzleState] = useState<CellState[][]>(
    Array.from({ length: puzzle.length }, () =>
      Array.from({ length: puzzle[0].length }, () => CellState.EMPTY)
    )
  );

  const updateCellState = (row: number, col: number, state: CellState) => {
    setPuzzleState((prevState) => {
      const newState = [...prevState];
      newState[row][col] = state;
      return newState;
    });
  };

  const handleReset = () => {
    console.log("Resetting puzzle state");
    setPuzzleState(
      Array.from({ length: puzzle.length }, () =>
        Array.from({ length: puzzle[0].length }, () => CellState.EMPTY)
      )
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-8">
      <button
        onClick={handleReset}
        className="bg-indigo-400 px-4 py-2 rounded-md cursor-pointer hover:bg-indigo-500 transition-colors duration-300"
      >
        <span className="text-lg font-semibold mb-4">Reset Puzzle</span>
      </button>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${puzzle[0].length + 2}, 1fr)`,
          gridTemplateRows: `repeat(${puzzle.length + 2}, 1fr)`,
        }}
      >
        {/* keep bottom left corner free */}
        <div className="w-auto h-auto col-span-2 row-span-2" />

        {puzzle[0].split("").map((header, idx) => (
          <div
            key={`header-${idx}`}
            className="w-auto h-auto border border-gray-300 flex items-center justify-center row-span-2 col-span-1"
          >
            test
          </div>
        ))}

        {puzzle.map((row, rowIdx) => (
          <Fragment key={`row-${rowIdx}`}>
            <div className="flex items-center justify-center h-auto col-span-2 border border-gray-300">
              test
            </div>
            {row.split("").map((cell, colIdx) => (
              <Cell
                rowIdx={rowIdx}
                colIdx={colIdx}
                correctState={
                  cell === "X" ? CellState.BLOCKED : CellState.FILLED
                }
                updateCellState={updateCellState}
                currentState={puzzleState[rowIdx][colIdx]}
                key={`cell-${rowIdx}-${colIdx}`}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

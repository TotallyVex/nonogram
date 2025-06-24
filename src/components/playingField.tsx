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

  return (
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
              correctState={cell === "X" ? CellState.BLOCKED : CellState.FILLED}
              key={`cell-${rowIdx}-${colIdx}`}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
}

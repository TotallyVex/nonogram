"use client";

import { CellState } from "@/types";
import { Fragment, useEffect, useState } from "react";
import Cell from "./cell";

export default function PlayingField({ puzzle }: { puzzle: string[] }) {
  const [puzzleState, setPuzzleState] = useState<CellState[][]>(
    Array.from({ length: puzzle.length }, () =>
      Array.from({ length: puzzle[0].length }, () => CellState.EMPTY)
    )
  );

  const [mistakeCount, setMistakeCount] = useState<number>(0);
  const [rowSequences, setRowSequences] = useState<number[][]>([]);
  const [colSequences, setColSequences] = useState<number[][]>([]);

  useEffect(() => {
    const calculateSequences = (row: string) => {
      const sequences: number[] = [];
      let count = 0;
      for (const char of row) {
        if (char === "O") {
          count++;
        } else if (count > 0) {
          sequences.push(count);
          count = 0;
        }
      }
      if (count > 0) sequences.push(count);
      return sequences;
    };

    setRowSequences(puzzle.map(calculateSequences));
    setColSequences(
      Array.from({ length: puzzle[0].length }, (_, colIdx) =>
        calculateSequences(puzzle.map((row) => row[colIdx]).join(""))
      )
    );
  }, [puzzle]);

  const updateCellState = (row: number, col: number, state: CellState) => {
    setPuzzleState((prevState) => {
      const newState = [...prevState];
      newState[row][col] = state;
      return newState;
    });
  };

  const registerMistake = () => {
    setMistakeCount((prevCount) => prevCount + 1);
  };

  const handleReset = () => {
    setMistakeCount(0);
    setPuzzleState(
      Array.from({ length: puzzle.length }, () =>
        Array.from({ length: puzzle[0].length }, () => CellState.EMPTY)
      )
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-8">
      <button
        onClick={handleReset}
        className="bg-indigo-400 px-4 py-2 rounded-md cursor-pointer hover:bg-indigo-500 transition-colors duration-300"
      >
        <span className="text-lg font-semibold mb-4">Reset Puzzle</span>
      </button>
      <div className="text-lg font-semibold">Mistakes: {mistakeCount}</div>
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
            className="w-auto h-auto border border-gray-300 bg-indigo-100 flex flex-col items-center justify-end row-span-2 col-span-1 py-2"
          >
            {colSequences[idx].map((seq, seqIdx) => (
              <span key={`col-seq-${idx}-${seqIdx}`}>{seq}</span>
            ))}
          </div>
        ))}

        {puzzle.map((row, rowIdx) => (
          <Fragment key={`row-${rowIdx}`}>
            <div className="flex items-center justify-end gap-2 px-2 h-auto col-span-2 border border-gray-300 bg-indigo-100">
              {rowSequences[rowIdx].map((seq, seqIdx) => (
                <span key={`row-seq-${rowIdx}-${seqIdx}`}>{seq}</span>
              ))}
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
                registerMistake={registerMistake}
                key={`cell-${rowIdx}-${colIdx}`}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

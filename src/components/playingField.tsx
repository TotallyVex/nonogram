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

  const [mistakeCount, setMistakeCount] = useState<number>(0);
  const [showGameOver, setShowGameOver] = useState<boolean>(false);
  const [showGameWon, setShowGameWon] = useState<boolean>(false);

  let rowSequences: number[][] = [];
  let colSequences: number[][] = [];

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

  rowSequences = puzzle.map(calculateSequences);
  colSequences = Array.from({ length: puzzle[0].length }, (_, colIdx) =>
    calculateSequences(puzzle.map((row) => row[colIdx]).join(""))
  );

  const updateCellState = (row: number, col: number, state: CellState) => {
    const newState = [...puzzleState];
    newState[row][col] = state;
    setPuzzleState(newState);

    const isSolved = puzzle.every((row, rowIdx) =>
      row.split("").every((cell, colIdx) => {
        if (cell === "O") {
          return puzzleState[rowIdx][colIdx] === CellState.FILLED;
        }
        return true;
      })
    );

    if (isSolved) {
      setShowGameWon(true);
    }
  };

  const registerMistake = () => {
    setMistakeCount((prevCount) => prevCount + 1);
    if (mistakeCount + 1 >= 3) {
      setShowGameOver(true);
    }
  };

  const handleReset = () => {
    setMistakeCount(0);
    setPuzzleState(
      Array.from({ length: puzzle.length }, () =>
        Array.from({ length: puzzle[0].length }, () => CellState.EMPTY)
      )
    );
    setShowGameWon(false);
    setShowGameOver(false);
  };

  const handleNextPuzzle = () => {
    setShowGameWon(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-8">
      {showGameWon && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white w-96 h-64 rounded-2xl flex items-center justify-center flex-col gap-8">
            <h3 className="text-4xl font-bold">Game Won!</h3>
            <button
              className="bg-indigo-400 px-4 py-2 rounded-md cursor-pointer hover:bg-indigo-500 transition-colors duration-300"
              onClick={handleNextPuzzle}
            >
              <span className="text-lg font-semibold mb-4">Next Puzzle</span>
            </button>
          </div>
        </div>
      )}
      {showGameOver && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white w-96 h-64 rounded-2xl flex items-center justify-center flex-col gap-8">
            <h3 className="text-4xl font-bold">Game over!</h3>
            <p>You made too many mistakes!</p>
            <button
              className="bg-indigo-400 px-4 py-2 rounded-md cursor-pointer hover:bg-indigo-500 transition-colors duration-300"
              onClick={handleReset}
            >
              <span className="text-lg font-semibold mb-4">Reset Puzzle</span>
            </button>
          </div>
        </div>
      )}
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

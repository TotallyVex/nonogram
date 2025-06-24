import { CellState } from "@/types";
import { cn } from "@sglara/cn";
import { useState } from "react";

export default function Cell({
  correctState,
  rowIdx,
  colIdx,
  updateCellState,
  currentState,
  registerMistake,
}: {
  correctState: CellState;
  rowIdx: number;
  colIdx: number;
  updateCellState: (row: number, col: number, state: CellState) => void;
  currentState: CellState;
  registerMistake: () => void;
}) {
  const [showError, setShowError] = useState<boolean>(false);

  const handleLeftClick = () => {
    if (currentState !== CellState.EMPTY) return;

    if (correctState === CellState.FILLED) {
      updateCellState(rowIdx, colIdx, CellState.FILLED);
      return;
    }

    setShowError(true);
    registerMistake();
    setTimeout(() => {
      setShowError(false);
    }, 950);
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentState !== CellState.EMPTY) return;

    if (correctState === CellState.BLOCKED) {
      updateCellState(rowIdx, colIdx, CellState.BLOCKED);
      return;
    }

    setShowError(true);
    registerMistake();
    setTimeout(() => {
      setShowError(false);
    }, 950);
  };

  return (
    <div
      className={cn(
        "border border-gray-300 flex items-center justify-center w-[50px] h-[50px] text-black text-5xl select-none cursor-pointer",
        currentState === CellState.FILLED ? "bg-stone-800" : "bg-white"
      )}
      onClick={handleLeftClick}
      onContextMenu={handleRightClick}
    >
      {currentState === CellState.BLOCKED ? "X" : ""}
      {showError && (
        <div className="bg-red-500 w-full h-full animate-fade-out" />
      )}
    </div>
  );
}

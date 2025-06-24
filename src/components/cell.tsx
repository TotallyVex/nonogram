import { CellState } from "@/types";
import { cn } from "@sglara/cn";

export default function Cell({
  correctState,
  rowIdx,
  colIdx,
  updateCellState,
  currentState,
}: {
  correctState: CellState;
  rowIdx: number;
  colIdx: number;
  updateCellState: (row: number, col: number, state: CellState) => void;
  currentState: CellState;
}) {
  const handleLeftClick = () => {
    if (currentState !== CellState.EMPTY) return;

    if (correctState === CellState.FILLED) {
      updateCellState(rowIdx, colIdx, CellState.FILLED);
      return;
    }

    console.log("Wrong cell clicked");
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentState !== CellState.EMPTY) return;

    if (correctState === CellState.BLOCKED) {
      updateCellState(rowIdx, colIdx, CellState.BLOCKED);
      return;
    }
    console.log("Wrong cell clicked");
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
    </div>
  );
}

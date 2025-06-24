import { CellState } from "@/types";

export default function Cell({
  correctState,
  rowIdx,
  colIdx,
}: {
  correctState: CellState;
  rowIdx: number;
  colIdx: number;
}) {
  return (
    <div className="border border-gray-300 flex items-center justify-center w-[50px] h-[50px]">
      {correctState}
    </div>
  );
}

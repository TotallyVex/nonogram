"use client";

import { Fragment } from "react";

export default function PlayingField({ data }: { data: string[] }) {
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${data[0].length + 2}, 1fr)`,
        gridTemplateRows: `repeat(${data.length + 2}, 1fr)`,
      }}
    >
      {/* keep bottom left corner free */}
      <div className="w-auto h-auto col-span-2 row-span-2" />

      {data[0].split("").map((header, idx) => (
        <div
          key={`header-${idx}`}
          className="w-auto h-auto border border-gray-300 flex items-center justify-center row-span-2 col-span-1"
        >
          test
        </div>
      ))}

      {data.map((row, rowIdx) => (
        <Fragment key={`row-${rowIdx}`}>
          <div className="flex items-center justify-center h-auto col-span-2 border border-gray-300">
            test
          </div>
          {row.split("").map((cell, colIdx) => (
            <div
              key={`cell-${rowIdx}-${colIdx}`}
              className="border border-gray-300 flex items-center justify-center w-[50px] h-[50px]"
            >
              {data[rowIdx][colIdx]}
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  );
}

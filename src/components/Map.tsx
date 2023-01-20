import React from "react";
import { extTypeToColor, TileType } from "../utils";

interface Props {
  map: TileType[][];
  size: number;
  tileSize: number;
}

export const Map = React.memo(({ map, size, tileSize }: Props) => (
  <div
    className="flex flex-col space-y-1"
    style={{
      maxWidth: size * tileSize + tileSize,
    }}
  >
    {map.map((row, i) => (
      <span key={i} className="mx-auto flex space-x-1">
        {row.map((tile, j) => (
          <div
            key={j}
            style={{
              width: tileSize,
              height: tileSize,
              backgroundColor: extTypeToColor[tile.extType!],
            }}
          ></div>
        ))}
      </span>
    ))}
  </div>
));

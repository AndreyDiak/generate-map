import { useEffect, useState } from "react";
import "./App.css";
import { extTypeToColor, MapT, TileType } from "./utils";

export const defaultMapSize = 7;

const mapT = new MapT();

function App() {
  // const size = 12;
  const [size, setSize] = useState(defaultMapSize);

  const [map, setMap] = useState<TileType[][]>([]);
  const tileSize = Number((500 / mapT.getMapSize()).toFixed(0));
  // const tileSize = 40;

  useEffect(() => {
    setMap(mapT.generate(size))
  }, [])

  console.log(mapT.getMapSize())

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <div className="flex flex-row space-x-2">
        <button
          className="my-4 bg-gray-300 py-1 px-2 rounded-md"
          onClick={() => setMap(mapT.generate(size))}
        >
          generate map
        </button>
        <div className="flex flex-row space-x-1 items-center">
          <p>Map size: </p>
          <input
            type="number"
            placeholder="map size"
            className="outline-none border-gray-400 border-2 max-w-[50px] rounded-md font-bold"
            value={size}
            onChange={e => setSize(Number(e.target.value))}
          />
        </div>
      </div>
      {
        size !== mapT.getMapSize() && (
          <p className="w-inherit text-white font-bold text-lg bg-orange-400 text-center px-10 py-2 mb-2 rounded-sm">click to update</p>
        )
      }
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
    </div>
  );
}

export default App;

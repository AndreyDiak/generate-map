import { useState } from "react";
import "./App.css";
import { extTypeToColor, MapT } from "./utils";

function App() {
  const size = 12;
  const tileSize = Number((500 / size).toFixed(0));
  const mapT = new MapT(size);

  const [map, setMap] = useState(mapT.generate());

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <button
        className="my-4 bg-gray-300 py-1 px-2 rounded-md"
        onClick={() => setMap(mapT.generate())}
      >
        generate map
      </button>
      <div
        className="flex flex-col gap-y-1"
        style={{
          maxWidth: size * tileSize + tileSize,
        }}
      >
        {map.map((row, i) => (
          <span key={i} className="mx-auto flex gap-x-1">
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

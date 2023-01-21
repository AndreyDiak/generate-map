import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { Map } from "./components/Map";
import { Menu } from "./components/menu/Menu";
import { Preview } from "./components/Preview";
import { MapT, Terrain, TileSize, tileSizeToPx, TileType } from "./utils";

export const defaultMapSize = 12;

const mapT = new MapT();

function App() {
  const [size, setSize] = useState<number>(defaultMapSize);
  const [terrain, setTerrain] = useState<Terrain>("default");
  const [tileSize, setTileSize] = useState<TileSize>("medium");
  const [tileSizeInPx, setTileSizeInPx] = useState<number>(
    Number((tileSizeToPx[tileSize] / mapT.getMapSize()).toFixed(0))
  );
  const [useAutoUpdate, setUseAutoUpdate] = useState<boolean>(false);

  const [map, setMap] = useState<TileType[][]>([]);

  const updateMap = () => {
    setMap(mapT.generate(size, terrain));
    setTileSizeInPx(
      Number((tileSizeToPx[tileSize] / mapT.getMapSize()).toFixed(0))
    );
  };

  useEffect(() => {
    setMap(mapT.generate(size, terrain));
  }, []);

  useEffect(() => {
    if (useAutoUpdate) {
      updateMap();
    }
  }, [terrain, tileSize, size]);

  return (
    <div className="flex flex-col space-y-10 items-center justify-center w-screen h-screen">
      <Preview tileSize={tileSizeInPx} />
      <div className="grid grid-cols-2 items-center content-center justify-center">
        <Menu
          terrain={terrain}
          setTerrain={setTerrain}
          mapSize={size}
          setMapSize={setSize}
          tileSize={tileSize}
          setTileSize={setTileSize}
          useAutoUpdate={useAutoUpdate}
          setUseAutoUpdate={setUseAutoUpdate}
          generate={updateMap}
        />

        <Map map={map} size={size} tileSize={tileSizeInPx} />
      </div>
    </div>
  );
}

export default App;

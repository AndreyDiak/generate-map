import React from "react";
import { options, Terrain, terrainToColor, TileSize } from "../../utils";
import { CheckBox } from "./checkbox/Checkbox";
import { Input } from "./input/Input";
import { Switcher } from "./switcher/Switcher";

interface Props {
  terrain: Terrain;
  setTerrain: (terrain: Terrain) => void;

  mapSize: number;
  setMapSize: (mapSize: number) => void;

  tileSize: TileSize;
  setTileSize: (tileSize: TileSize) => void;

  useAutoUpdate: boolean;
  setUseAutoUpdate: (useAutoUpdate: boolean) => void;

  generate: () => void;
}

export const Menu = React.memo(
  ({
    terrain,
    setTerrain,
    mapSize,
    setMapSize,
    tileSize,
    setTileSize,
    useAutoUpdate,
    setUseAutoUpdate,
    generate,
  }: Props) => {
    return (
      <div
        className="flex flex-col max-w-[350px] mx-auto p-3 rounded-lg"
        style={{
          backgroundColor: terrainToColor[terrain].bg,
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: terrainToColor[terrain].border,
        }}
      >
        <div
          className="pb-2 text-bold text-lg border-b"
          style={{
            borderColor: terrainToColor[terrain].border,
          }}
        >
          Меню настройки
        </div>

        <Switcher
          label="Тип местности"
          options={options.terrain}
          value={terrain}
          setValue={setTerrain}
        />

        <Switcher
          label="Размер клеток"
          options={options.tileSize}
          value={tileSize}
          setValue={setTileSize}
        />

        <Input
          label="Размер карты"
          value={mapSize}
          setValue={setMapSize}
          validation={{
            min: 6,
            max: 17,
          }}
        />
        <CheckBox
          label="Автогенерация при изменении настроек"
          value={useAutoUpdate}
          setValue={setUseAutoUpdate}
        />

        <div>
          <button
            className="mt-2 bg-orange-400 text-gray-800 px-3 py-1 font-bold rounded-lg text-center"
            onClick={generate}
          >
            Сгенерировать
          </button>
        </div>
      </div>
    );
  }
);

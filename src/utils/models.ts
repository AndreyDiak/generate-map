import { EarthType, Tile, WaterType } from "./enums";
import { Terrain, TileSize, WaterCount } from "./typings";

export const options = {
  terrain: [
    {
      label: "Дефолт",
      value: "default",
    },
    {
      label: "Суша",
      value: "earth",
    },
    {
      label: "Водный",
      value: "ocean",
    },
  ],
  tileSize: [
    {
      label: "Маленькая",
      value: "small",
    },
    {
      label: "Средняя",
      value: "medium",
    },
    {
      label: "Большая",
      value: "big",
    },
  ],
};

export const TileChance: Record<Tile, number> = {
  earth: 0.7,
  water: 0.3,
};

export const TileCoefficient: Record<Tile, number> = {
  earth: 0.05,
  water: 0.02,
};

export const extTypeToColor: Record<WaterType | EarthType, string> = {
  shallow: "#77d9ff", // мелководье
  medium: "#3993b6", // средняя глубина
  deep: "#0f6d91", // глубины
  sand: "#dcb694", // песок
  field: "#7fb875", // поле
  forest: "#3e8630", // лес
  montain: "#9f9f9f", // горы
};

export const terrainToColor: Record<Terrain, { bg: string; border: string }> = {
  default: {
    bg: "#fafafa",
    border: "#d0d0d0",
  },
  earth: {
    bg: "#6bc172",
    border: "#3f8045",
  },
  ocean: {
    bg: "#9de4ff",
    border: "#3e829c",
  },
};

export const tileSizeToPx: Record<TileSize, number> = {
  small: 500,
  medium: 600,
  big: 700,
};

export const countWaterToType: Record<number, WaterCount> = {
  1: "low",
  2: "small",
  3: "medium",
  4: "big",
  5: "huge",
};

export const previewTiles = [
  WaterType.DEEP,
  WaterType.MEDIUM,
  WaterType.SHALLOW,
  EarthType.FIELD,
  EarthType.FOREST,
  EarthType.MOUNTAIN,
  EarthType.SAND,
];

export const previewTilesMap: Record<WaterType | EarthType, string> = {
  shallow: "мелководье",
  medium: "средние глубины",
  deep: "морские глубины",
  field: "поле",
  forest: "лес",
  sand: "пляж",
  montain: "горы",
};

import { EarthType, Tile, WaterType } from "./enums";
import { WaterCount } from "./typings";

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
  medium: "#0f6d91", // средняя глубина
  deep: "#004d70", // глубины

  sand: "#dcb694", // песок
  field: "#7fb875", // поле
  forest: "#3e8630", // лес
  montain: "#9f9f9f", // горы
};

export const countWaterToType: Record<number, WaterCount> = {
  1: "low",
  2: "small",
  3: "medium",
  4: "big",
  5: "huge",
};

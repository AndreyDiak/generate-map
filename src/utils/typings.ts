import { EarthType, Tile, WaterType } from "./enums";

export type ExtTile = Tile | "none";

export type WaterCount = "low" | "small" | "medium" | "big" | "huge";

export type Building = "Mine" | "Lumberjack" | "Fishing" | "Farm";

export type Terrain = "default" | "earth" | "ocean";

export type TileSize = "small" | "medium" | "big";
export interface Config {
  water: {
    chance: number;

    medium: Settings;
    deep: Settings;
  };

  earth: {
    sand: Settings;
    forest: Settings;
    mountain: Settings;
  };
}

export interface Settings {
  chance: number;
  summary: number;
}

export interface FTileType {
  type: Tile;
  extType: WaterType | EarthType;
  index: number;
  x: number;
  y: number;
}

export interface TileType {
  type: Tile;
  extType: WaterType | EarthType | null;
  index: number;
  x: number;
  y: number;
  coefficients: ExtTile[];
  summary: Record<ExtTile, number>;
}

export interface GTileType extends TileType {
  isVisible: boolean;
  owner: string; // id игрока или бота
  building: Building;
}

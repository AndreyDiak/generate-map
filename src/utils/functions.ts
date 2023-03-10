import { defaultMapSize } from "../App";
import { EarthType, Tile, WaterType } from "./enums";
import { config, waters } from "./globalTerrain/config";
import { countWaterToType, TileChance, TileCoefficient } from "./models";
import { ExtTile, FTileType, Terrain, TileType } from "./typings";

export class MapT {
  private mapSize: number = defaultMapSize;
  private terrain: Terrain = "default";
  private blank: FTileType[][] = [];

  private result: TileType[][] = [];

  constructor() {}

  generateBlank() {
    let index = 0;
    for (let i = 0; i < this.mapSize; i++) {
      const line: FTileType[] = [];
      for (let j = 0; j < this.mapSize; j++) {
        const tile: FTileType = {
          type: Tile.EARTH,
          extType: EarthType.FIELD,
          index,
          x: j,
          y: i,
        };

        line.push(tile);
        index++;
      }
      this.blank.push(line);
    }
    return this;
  }

  generateWater() {
    const waterTilesCount = Math.ceil(
      config[this.terrain].water.chance * this.mapSize * this.mapSize
    );

    const generateTileCoordinates = () => {
      let x = Math.floor(Math.random() * this.mapSize);
      let y = Math.floor(Math.random() * this.mapSize);

      while (!!this.blank[y][x] && this.blank[y][x].type === Tile.WATER) {
        [x, y] = generateTileCoordinates();
      }
      return [x, y];
    };

    for (let i = 0; i < waterTilesCount; i++) {
      const [x, y] = generateTileCoordinates();
      this.blank[y][x].type = Tile.WATER;
      this.blank[y][x].extType = WaterType.SHALLOW;
    }
    return this;
  }

  generateBigWater() {
    this.blank
      .flat()
      .filter((tile) => tile.type === Tile.WATER)
      .forEach((tile) => {
        const squareSize = Math.round(Math.sqrt(this.mapSize));
        const squareType = countWaterToType[squareSize];
        const squares = waters[squareType];
        const square = squares[Math.floor(Math.random() * squares.length)];

        for (let i = 0; i < square.length; i++) {
          const s = square[i];
          const summary = Math.abs(s.x) + Math.abs(s.y);
          const chance = Math.random() < 1 - summary / squareSize;
          if (chance) {
            if (
              !!this.blank[tile.y + s.y] &&
              !!this.blank[tile.y + s.y][tile.x + s.x]
            ) {
              this.blank[tile.y + s.y][tile.x + s.x].type = Tile.WATER;
              this.blank[tile.y + s.y][tile.x + s.x].extType =
                WaterType.SHALLOW;
            }
          }
        }
      });
    return this;
  }

  fillWaterTiles() {
    for (let i = 0; i < this.mapSize; i++) {
      const line: TileType[] = [];
      for (let j = 0; j < this.mapSize; j++) {
        const coefficients = checkNearestTiles(j, i, this.blank.slice());
        const summary = calculateCoefficient(coefficients);

        const summaryWater = summary.water || 0;
        const summaryEarth = summary.earth || 0;

        let tile: TileType = {
          ...this.blank[i][j],
          coefficients,
          summary,
        };

        if (
          tile.type === Tile.WATER &&
          summaryWater > config[this.terrain].water.medium.summary &&
          summaryEarth <= 2 &&
          Math.random() < config[this.terrain].water.medium.chance
        ) {
          tile.extType = WaterType.MEDIUM;
        }
        if (
          tile.type === Tile.WATER &&
          summaryWater > config[this.terrain].water.deep.summary &&
          Math.random() < config[this.terrain].water.deep.chance
        ) {
          tile.extType = WaterType.DEEP;
        }
        line.push(tile);
      }
      this.result.push(line);
    }
    return this;
  }

  fillEarthTiles() {
    for (let i = 0; i < this.mapSize; i++) {
      for (let j = 0; j < this.mapSize; j++) {
        const tile = this.result[i][j];

        const summaryEarth = tile.summary.earth || 0;
        const summaryWater = tile.summary.water || 0;

        if (tile.type === Tile.EARTH) {
          if (
            summaryWater > config[this.terrain].earth.sand.summary &&
            Math.random() < config[this.terrain].earth.sand.chance
          ) {
            this.result[i][j].extType = EarthType.SAND;
          }
          if (
            summaryEarth > config[this.terrain].earth.mountain.summary &&
            Math.random() < config[this.terrain].earth.mountain.chance &&
            summaryWater === 0
          ) {
            this.result[i][j].extType = EarthType.MOUNTAIN;
          } else {
            if (
              summaryEarth > config[this.terrain].earth.forest.summary &&
              Math.random() < config[this.terrain].earth.forest.chance &&
              summaryWater === 0
            ) {
              this.result[i][j].extType = EarthType.FOREST;
            }
          }
        }
      }
    }

    return this;
  }

  setOptions(size: number, terrain: Terrain) {
    this.mapSize = size;
    this.terrain = terrain;
    return this;
  }

  zero() {
    this.mapSize = defaultMapSize;
    this.blank = [];
    this.result = [];
    return this;
  }

  getBlank() {
    return this.blank;
  }

  getResult() {
    return this.result;
  }

  getMapSize() {
    return this.mapSize;
  }

  generate(size: number, terrain: Terrain) {
    return this.zero()
      .setOptions(size, terrain)
      .generateBlank()
      .generateWater()
      .generateBigWater()
      .fillWaterTiles()
      .fillEarthTiles()
      .getResult();
  }
}

function checkNearestTiles(x: number, y: number, map: FTileType[][]) {
  // [x,x,x] Coordinates of this cells
  // [x,o,x]
  // [x,x,x]
  let coefficients: ExtTile[] = [];
  const tiles: (FTileType | null | undefined)[] = [];

  // ?????????????? 3 ????????????
  tiles.push(!!map[y - 1] ? map[y - 1][x - 1] : null);
  tiles.push(!!map[y - 1] ? map[y - 1][x] : null);
  tiles.push(!!map[y - 1] ? map[y - 1][x + 1] : null);

  // ?????????????? ?????? ????????????
  tiles.push(map[y][x - 1]);
  tiles.push(map[y][x + 1]);

  // ???????????? 3 ????????????
  tiles.push(!!map[y + 1] ? map[y + 1][x - 1] : null);
  tiles.push(!!map[y + 1] ? map[y + 1][x] : null);
  tiles.push(!!map[y + 1] ? map[y + 1][x + 1] : null);

  tiles.forEach((tile) => {
    if (!tile) {
      coefficients.push("none");
    } else {
      if (tile.type === Tile.EARTH) {
        coefficients.push(Tile.EARTH);
      } else {
        coefficients.push(Tile.WATER);
      }
    }
  });
  return coefficients;
}

function calculateCoefficient(coefficient: ExtTile[]) {
  return coefficient
    .filter((item) => item !== "none")
    .reduce((total, item) => {
      total[item] = !!total[item] ? total[item] + 1 : 1;
      return total;
    }, {} as Record<ExtTile, number>);
}

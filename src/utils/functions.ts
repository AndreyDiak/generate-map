import { EarthType, Tile, WaterType } from "./enums";
import { config, waters } from "./globalTerrain/defaultConfig";
import { countWaterToType, TileChance, TileCoefficient } from "./models";
import { ExtTile, FTileType, TileType } from "./typings";

export class MapT {
  private mapSize: number;
  private blank: FTileType[][] = [];

  private result: TileType[][] = [];

  constructor(size: number) {
    this.mapSize = size;
  }

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
      config.water.chance * this.mapSize * this.mapSize
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
          summaryWater > config.water.medium.summary &&
          summaryEarth <= 2 &&
          Math.random() < config.water.medium.chance
        ) {
          tile.extType = WaterType.MEDIUM;
        }
        if (
          tile.type === Tile.WATER &&
          summaryWater > config.water.deep.summary &&
          Math.random() < config.water.deep.chance
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
            summaryWater > config.earth.sand.summary &&
            Math.random() < config.earth.sand.chance
          ) {
            this.result[i][j].extType = EarthType.SAND;
          }
          if (
            summaryEarth > config.earth.mountain.summary &&
            Math.random() < config.earth.mountain.chance &&
            summaryWater === 0
          ) {
            this.result[i][j].extType = EarthType.MOUNTAIN;
          } else {
            if (
              summaryEarth > config.earth.forest.summary &&
              Math.random() < config.earth.forest.chance &&
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

  zero() {
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

  generate() {
    return this.zero()
      .generateBlank()
      .generateWater()
      .generateBigWater()
      .fillWaterTiles()
      .fillEarthTiles()
      .getResult();
  }
}

// const result: FTileType[][] = [];
// let map: TileType[][] | null[][] = Array(mapSize)
//   .fill(null)
//   .map((_) => Array(mapSize).fill(null));
// const coefficients = checkNearestTiles(j, i, map.slice());
// const summary = calculateCoefficient(coefficients);

// const summaryWater = summary.water * TileCoefficient[Tile.WATER] || 0;
// const summaryEarth = summary.earth * TileCoefficient[Tile.EARTH] || 0;
// const chance = Math.random();
//     if (chance > chanceBorder) {
//       if (!summary.water || summary.water === 0) {
//         const deepEarthChance = Math.random();

//         tile.extType =
//           deepEarthChance > 0.8
//             ? EarthType.MOUNTAIN
//             : deepEarthChance > 0.4
//             ? EarthType.FOREST
//             : EarthType.FIELD;
//       } else {
//         if (!!summary.water && summary.water >= 2) {
//           tile.extType = EarthType.SAND;
//         } else {
//           tile.extType =
//             Math.random() > 0.5 ? EarthType.FIELD : EarthType.FOREST;
//         }
//       }
//       tile.type = Tile.EARTH;
//     } else {
//       // water
//       tile.type = Tile.WATER;
//       if (!summary.earth || summary.earth === 0) {
//         tile.extType = WaterType.DEEP;
//       } else {
//         if (!!summary.earth && summary.earth >= 2) {
//           tile.extType = WaterType.SHALLOW;
//         } else {
//           tile.extType = WaterType.MEDIUM;
//         }
//       }
//     }

export function generateWaterMap(blank: FTileType[][]) {}

function checkNearestTiles(x: number, y: number, map: FTileType[][]) {
  // [x,x,x] Coordinates of this cells
  // [x,o,x]
  // [x,x,x]
  let coefficients: ExtTile[] = [];
  const tiles: (FTileType | null | undefined)[] = [];

  // верхние 3 клетки
  tiles.push(!!map[y - 1] ? map[y - 1][x - 1] : null);
  tiles.push(!!map[y - 1] ? map[y - 1][x] : null);
  tiles.push(!!map[y - 1] ? map[y - 1][x + 1] : null);

  // боковые две клетки
  tiles.push(map[y][x - 1]);
  tiles.push(map[y][x + 1]);

  // нижние 3 клетки
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

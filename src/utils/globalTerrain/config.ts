import { Config, Terrain, WaterCount } from "../typings";

export const config: Record<Terrain, Config> = {
  default: {
    water: {
      chance: 0.1,

      //  shallow: 0, генерится автоматом
      medium: {
        chance: 0.9,
        summary: 5,
      },
      deep: {
        chance: 0.8,
        summary: 7,
      },
    },
    earth: {
      sand: {
        chance: 0.9,
        summary: 2,
      },
      forest: {
        chance: 0.4,
        summary: 4,
      },
      mountain: {
        chance: 0.2,
        summary: 6,
      },
    },
  },
  earth: {
    water: {
      chance: 0.05,

      //  shallow: 0, генерится автоматом
      medium: {
        chance: 0.9,
        summary: 5,
      },
      deep: {
        chance: 0.8,
        summary: 7,
      },
    },
    earth: {
      sand: {
        chance: 0.9,
        summary: 2,
      },
      forest: {
        chance: 0.4,
        summary: 4,
      },
      mountain: {
        chance: 0.2,
        summary: 6,
      },
    },
  },
  ocean: {
    water: {
      chance: 0.15,

      //  shallow: 0, генерится автоматом
      medium: {
        chance: 0.9,
        summary: 5,
      },
      deep: {
        chance: 0.8,
        summary: 7,
      },
    },
    earth: {
      sand: {
        chance: 0.7,
        summary: 2,
      },
      forest: {
        chance: 0.4,
        summary: 4,
      },
      mountain: {
        chance: 0.2,
        summary: 6,
      },
    },
  },
};

export const waters: Record<WaterCount, { x: number; y: number }[][]> = {
  low: [[{ x: 0, y: 0 }]], // x | y
  small: [
    [
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: -1, y: 0 },
      { x: 0, y: 0 },
    ],
    [
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
    [
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: -1 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ],
  ],
  medium: [
    [
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },

      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },

      { x: -1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ],
  ],
  big: [
    [
      { x: -2, y: -2 },
      { x: -1, y: -2 },
      { x: 0, y: -2 },
      { x: 1, y: -2 },

      { x: -2, y: -1 },
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },

      { x: -2, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },

      { x: -2, y: 1 },
      { x: -1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ],
    [
      { x: -1, y: -2 },
      { x: 0, y: -2 },
      { x: 1, y: -2 },
      { x: 2, y: -2 },

      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: 2, y: -1 },

      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },

      { x: -1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ],
    [
      { x: -2, y: -1 },
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },

      { x: -2, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },

      { x: -2, y: 1 },
      { x: -1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },

      { x: -2, y: 2 },
      { x: -1, y: 2 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
    ],
    [
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: 2, y: -1 },

      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },

      { x: -1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },

      { x: -1, y: 2 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ],
  ],
  huge: [
    [
      { x: -2, y: -2 },
      { x: -1, y: -2 },
      { x: 0, y: -2 },
      { x: 1, y: -2 },
      { x: 2, y: -2 },

      { x: -2, y: -1 },
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: 2, y: -1 },

      { x: -2, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },

      { x: -2, y: 1 },
      { x: -1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },

      { x: -2, y: 2 },
      { x: -1, y: 2 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ],
  ],
};

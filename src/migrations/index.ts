import * as migration_20261005_215616_inicial from './20261005_215616_inicial';

export const migrations = [
  {
    up: migration_20261005_215616_inicial.up,
    down: migration_20261005_215616_inicial.down,
    name: '20261005_215616_inicial'
  },
];

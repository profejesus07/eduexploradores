import * as migration_20261005_223324_inicial from './20261005_223324_inicial';

export const migrations = [
  {
    up: migration_20261005_223324_inicial.up,
    down: migration_20261005_223324_inicial.down,
    name: '20261005_223324_inicial'
  },
];

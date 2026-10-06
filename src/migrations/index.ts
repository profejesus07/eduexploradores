import * as migration_20261005_223324_inicial from './20261005_223324_inicial';
import * as migration_20261006_111005_niveles from './20261006_111005_niveles';

export const migrations = [
  {
    up: migration_20261005_223324_inicial.up,
    down: migration_20261005_223324_inicial.down,
    name: '20261005_223324_inicial',
  },
  {
    up: migration_20261006_111005_niveles.up,
    down: migration_20261006_111005_niveles.down,
    name: '20261006_111005_niveles'
  },
];

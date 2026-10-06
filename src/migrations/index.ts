import * as migration_20261005_223324_inicial from './20261005_223324_inicial';
import * as migration_20261006_111005_niveles from './20261006_111005_niveles';
import * as migration_20261006_145025_galeria from './20261006_145025_galeria';

export const migrations = [
  {
    up: migration_20261005_223324_inicial.up,
    down: migration_20261005_223324_inicial.down,
    name: '20261005_223324_inicial',
  },
  {
    up: migration_20261006_111005_niveles.up,
    down: migration_20261006_111005_niveles.down,
    name: '20261006_111005_niveles',
  },
  {
    up: migration_20261006_145025_galeria.up,
    down: migration_20261006_145025_galeria.down,
    name: '20261006_145025_galeria'
  },
];

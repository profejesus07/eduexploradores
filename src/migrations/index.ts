import * as migration_20261005_223324_inicial from './20261005_223324_inicial';
import * as migration_20261006_111005_niveles from './20261006_111005_niveles';
import * as migration_20261006_145025_galeria from './20261006_145025_galeria';
import * as migration_20261006_160000_media_objectkey from './20261006_160000_media_objectkey';
import * as migration_20261006_184500_popup_mostrar_titulo from './20261006_184500_popup_mostrar_titulo';

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
name: '20261006_145025_galeria',
},
{
up: migration_20261006_160000_media_objectkey.up,
down: migration_20261006_160000_media_objectkey.down,
name: '20261006_160000_media_objectkey',
},
{
up: migration_20261006_184500_popup_mostrar_titulo.up,
down: migration_20261006_184500_popup_mostrar_titulo.down,
name: '20261006_184500_popup_mostrar_titulo'
},
];

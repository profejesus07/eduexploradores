# Exploradores del Saber — Sistema de diseño (maestro)

Dirección: **editorial-académica**, sobria y sofisticada. Lema: *Crecer, Explorar y Aprender*. Tokens en `design-system/tokens.css`.

## Paleta (derivada del logotipo, en tonos sobrios)
| Rol | Valor | Origen en el logotipo |
|---|---|---|
| Azul institucional `primary` | `#0E2A63` | Disco exterior |
| Azul profundo `primary-dark` | `#091B45` | Hero y pie |
| Dorado antiguo `secondary` | `#A97F24` | Aro y lema (solo filetes y detalles) |
| Dorado suave `gold-soft` | `#D8C48A` | Detalles sobre fondo oscuro |
| Dorado texto `gold-text` | `#7A5A12` | Texto pequeño sobre claro (6.0:1) |
| Verde bosque `science` | `#2E6B57` | Microscopio / hoja |
| Azul acero `sky` | `#3E6E9C` | Libro / órbitas |
| Vino `spark` | `#8E3B46` | Núcleo atómico |
| Marfil `background` / `paper` | `#FAF8F3` / `#F3EFE4` | Superficies |
| Tinta `foreground` | `#141C2E` | Texto (16:1 sobre marfil) |

Los colores saturados del logotipo quedan solo en el escudo; la interfaz usa tonos apagados. El dorado nunca va como texto pequeño ni como relleno de botones.

## Tipografía
- Títulos: **Crimson Pro** (600, cursiva para énfasis). Texto: **Atkinson Hyperlegible** 17px / 1.7.
- Pequeñas mayúsculas espaciadas (`.eyebrow`) para etiquetas de sección.

## Forma y composición
- Esquinas casi rectas, filetes de 1px, mucho aire, rejillas tipo revista; círculos finos que evocan el escudo.
- Botones: `.btn-primary`, `.btn-light`, `.btn-outline`, `.btn-ghost-light` (sin píldoras).
- Colores por nivel (filete superior): Párvulos azul · Pre-Jardín vino · Jardín dorado · Transición verde.

## Movimiento (sutil)
- Entrada escalonada del hero (`.rise`), aparición al hacer scroll (`<Reveal>`), subrayado que crece en enlaces, elevación de 3px en tarjetas, flotación lenta del escudo.
- Todo se desactiva con `prefers-reduced-motion`; sin JavaScript el contenido se ve completo.

## Accesibilidad
Contraste ≥ 4.5:1 en texto, foco visible, objetivos táctiles ≥ 44px, color nunca como único indicador.

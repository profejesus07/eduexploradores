# Exploradores del Saber — Sistema de diseño (maestro)

Dirección: **editorial-académica**, sobria y sofisticada. Lema: *Crecer, Explorar y Aprender*. Tokens en `design-system/tokens.css`.

## Paleta — colores reales del logotipo, con una regla de uso
Regla **60 / 30 / 10**: blanco y azul pálido ≈ 60 % · azul real ≈ 30 % · dorado real ≤ 10 %. Verde, celeste y rojo solo como señales pequeñas con significado (p. ej. carpetas por grado, estados); nunca como decoración ni fondos grandes.

| Rol | Valor | Origen / uso |
|---|---|---|
| Azul `primary` | `#0A33AD` | Disco del escudo. Botones, títulos, secciones de color |
| Azul profundo `primary-dark` | `#061A5E` | Mismo matiz, más oscuro. Hero, barra superior, pie |
| Dorado `secondary` | `#FFCB02` | Aro del escudo. CTA sobre fondo oscuro, filetes, numerales |
| Dorado suave `gold-soft` | `#FFD84D` | Detalles sobre fondo oscuro |
| Dorado texto `gold-text` | `#7A5A00` | Texto pequeño dorado sobre claro (6.4:1) |
| Azul pálido `paper` | `#F3F6FD` | Secciones alternas, derivado del azul real |
| Verde / Celeste / Rojo | `#00A849` / `#1AB0F9` / `#FB3042` | Solo carpetas y estados; variantes `-dark` para texto con contraste |
| Texto `foreground` / `muted` | `#0B1640` / `#4B5878` | 17:1 y 7:1 sobre blanco |

Contrastes verificados: blanco/azul 10:1 · azul profundo/dorado 10.5:1 · dorado/azul 6.6:1.

## Tipografía
- Títulos: **Crimson Pro** (600, cursiva para énfasis). Texto: **Atkinson Hyperlegible** 17px / 1.7.
- Pequeñas mayúsculas espaciadas (`.eyebrow`) para etiquetas de sección.

## Forma y composición
- Esquinas casi rectas, filetes de 1px, mucho aire, rejillas tipo revista; círculos finos que evocan el escudo.
- Botones: `.btn-primary`, `.btn-light`, `.btn-outline`, `.btn-ghost-light` (sin píldoras).
- Sliders de Preescolar y Primaria (Embla): arrastre, flechas, teclado, contador y barra de progreso. Contenido editable en el admin ("Niveles y grados").

## Movimiento (sutil)
- Entrada escalonada del hero (`.rise`), aparición al hacer scroll (`<Reveal>`), subrayado que crece en enlaces, elevación de 3px en tarjetas, flotación lenta del escudo.
- Todo se desactiva con `prefers-reduced-motion`; sin JavaScript el contenido se ve completo.

## Accesibilidad
Contraste ≥ 4.5:1 en texto, foco visible, objetivos táctiles ≥ 44px, color nunca como único indicador.

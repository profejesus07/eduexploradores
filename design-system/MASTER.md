# Exploradores del Saber — Sistema de diseño (maestro)

Lema: *Crecer, Explorar y Aprender*. Tokens en `design-system/tokens.css`.

## Análisis del logotipo
| Elemento | Color muestreado | Rol en la web |
|---|---|---|
| Disco exterior | Azul real `#0A33AD` | Primario: cabecera, botones, enlaces |
| Aro y textos del lema | Dorado `#FFCB02` | Secundario: destacados, insignias, subrayados |
| Microscopio / hoja | Verde `#00A849` | Ciencias naturales, éxito |
| Libro / órbitas | Celeste `#1AB0F9` | Información, foco (`--color-ring`), ilustraciones |
| Núcleo del átomo | Rojo `#FB3042` | Acento mínimo, alertas |
| Fondo interior | Blanco / `#F5F8FF` | Superficies |

## Contraste (WCAG, medido)
- Texto `#0B1640` sobre fondo `#F5F8FF`: 16.4:1 ✔
- Blanco sobre azul primario: 10.1:1 ✔ · Dorado sobre azul profundo: 9.7:1 ✔
- Texto oscuro sobre dorado: 11.5:1 ✔ · Texto oscuro sobre celeste: 7.2:1 ✔
- Blanco sobre verde `#00A849`: 3.1:1 ✘ → usar `science-dark` (5.5:1) o texto oscuro (5.6:1)
- Blanco sobre celeste `#1AB0F9`: 2.4:1 ✘ → usar `sky-dark` (5.3:1) o texto oscuro
- Blanco sobre rojo `#FB3042`: 3.8:1 ✘ → usar `spark-dark` (5.0:1)
- Dorado nunca como texto sobre fondo claro.

## Reglas
- Proporción: ~60 % neutros, 25 % azul, 10 % dorado, 5 % verde/celeste/rojo.
- Tipografía: títulos Baloo 2 (700), cuerpo Nunito 16px/1.6 (Google Fonts).
- Estilo: amigable y redondeado (radios 16–24px, sombras suaves), iconos SVG (Lucide), sin emojis.
- Foco visible con `--color-ring`; respetar `prefers-reduced-motion`; objetivos táctiles ≥ 44px.
- Color nunca como único indicador de significado.

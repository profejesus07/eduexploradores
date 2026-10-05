#!/usr/bin/env bash
# Genera el sitio público como HTML estático en ./out (para GitHub Pages).
# Requiere: BASE_PATH (ej. /eduexploradores). Modifica el árbol de trabajo: úsalo solo en CI o en una copia.
set -euo pipefail
export STATIC_EXPORT=1
export BASE_PATH="${BASE_PATH:-}"

# 1) El panel /admin y la API necesitan servidor: no existen en la versión estática.
rm -rf "src/app/(payload)"
# 2) Páginas pre-generadas: sin renderizado bajo demanda.
grep -rl "export const dynamic = 'force-dynamic'" "src/app/(site)" | xargs sed -i "/export const dynamic = 'force-dynamic'/d"
for f in "src/app/(site)/[slug]/page.tsx" "src/app/(site)/entradas/[slug]/page.tsx"; do
  echo "export const dynamicParams = false" >> "$f"
done

npx cross-env NODE_OPTIONS=--no-deprecation next build
touch out/.nojekyll

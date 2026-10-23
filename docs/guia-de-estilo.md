# Guía de estilo

Identidad visual de Altos del Uco, según la sección 10 del Brief. Los valores están definidos en [`frontend/src/app/globals.css`](../frontend/src/app/globals.css) y las fuentes en [`frontend/src/app/layout.jsx`](../frontend/src/app/layout.jsx).

El sitio usa **un único tema oscuro** (la clase `dark` está fija en `<html>`), inspirado en el interior de una bodega: maderas, barricas y cobre.

## Paleta de colores

| Uso | Variable CSS | Color |
|---|---|---|
| Fondo principal | `--background` | `#1A130F` |
| Texto principal | `--foreground` | `#F0E6D8` |
| Dorado / acento (logo, enlaces, llamados a la acción) | `--gold` | `#C1793F` |
| Dorado secundario (degradados, hover) | `--primary` | `#B8703F` |
| Tarjetas y superficies elevadas | `--card` | `#241C15` |
| Secundario (fondos de sección) | `--secondary` | `#2C231A` |
| Texto atenuado | `--muted-foreground` | `#A89882` |
| Alerta / destructivo | `--destructive` | `#A8482F` |
| Bordes y campos | `--border`, `--input` | `#C1793F` al 15 % de opacidad |

En los componentes se usan las clases de Tailwind que apuntan a esas variables (`bg-background`, `text-foreground`, `text-gold`, `border-border`, etc.). **No se escriben colores a mano**: así un cambio de paleta se hace en un solo archivo.

## Tipografía

| Fuente | Variable | Clase Tailwind | Uso |
|---|---|---|---|
| Playfair Display (serif) | `--font-serif` | `font-serif` | Títulos, logo y nombres de producto |
| Inter (sans-serif) | `--font-sans` | `font-sans` | Cuerpo de texto, navegación e interfaz |
| Parisienne (manuscrita) | `--font-script` | `font-script` | Detalles decorativos puntuales |

Las tres se cargan con `next/font/google`, que las descarga en el build y las sirve desde el propio sitio.

## Imágenes

- **Hero:** paisajes reales del Valle de Uco (viñedos con la Cordillera de los Andes y barricas de bodega), en `frontend/public/hero/`.
- **Productos:** fotografía en formato retrato, con la botella y su etiqueta como protagonistas sobre fondo neutro.

## Diseño responsive

El diseño es **mobile-first**: los estilos base son los del celular y se amplían con los prefijos de Tailwind.

| Prefijo | Ancho mínimo | Qué cambia |
|---|---|---|
| (ninguno) | 0 px | Diseño de celular: márgenes de `px-8`, títulos más chicos. |
| `sm:` | 640 px | Márgenes de `px-16` y títulos más grandes. |
| `md:` / `lg:` | 768 / 1024 px | Se usan en las pantallas con grilla (el catálogo, a partir del módulo 4) para sumar columnas. |

### Verificación en celular

Se revisó la home en un viewport de **375 × 812 px** (tamaño de un celular chico):

- No hay desplazamiento horizontal (el ancho del documento es igual al del viewport).
- Ningún elemento se sale de la pantalla.
- El texto más chico es de 12 px.
- El encabezado se mantiene fijo arriba y el hero se lee bien sobre la foto.
- El pie de página muestra la leyenda legal «Beber con moderación. Venta exclusiva para mayores de 18 años.».

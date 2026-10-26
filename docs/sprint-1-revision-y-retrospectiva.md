# Sprint 1 — Revisión y retrospectiva

**Sprint 1 — Cimientos** · 22/10 al 26/10/2026 · Equipo Código Crítico

**Objetivo del sprint:** tener el repositorio, la base de datos, los usuarios y el catálogo funcionando en `main`.

## Resultado

**Objetivo cumplido:** los 15 issues del sprint (ALT-01 a ALT-15) se cerraron dentro de las fechas, con 58 puntos entregados sobre 58 planificados.

| Módulo | Responsable | Issues | Puntos | Pull Request | Merge |
|---|---|---|---|---|---|
| 1. Base | Mazara Ariel | ALT-01 a 05 | 18 | #38 | 23/10 |
| 2. Autenticación y recuperación de contraseña | Foglia Maximiliano | ALT-06 a 11 | 24 | #39 | 26/10 |
| 3. Catálogo y ficha de producto | Zuniga Agustina | ALT-12 a 15 | 16 | #41 | 26/10 |

### Métricas

| Métrica | Valor |
|---|---|
| Issues cerrados / planificados | 15 / 15 |
| Puntos entregados / planificados | 58 / 58 |
| Pull Requests mergeados | 3 módulos (#38, #39 y #41) |
| Commits en `main` (sin contar merges) | 13 (Mazara Ariel 5, Foglia Maximiliano 4, Zuniga Agustina 4) |
| Integrantes con aporte al sprint | 3 de 6 (los otros 3 módulos entran en el Sprint 2, según el orden de integración) |

## Revisión del sprint

Lo que se puede mostrar funcionando en `main`:

- **Base:** estructura en `frontend`, `backend` y `prisma`; modelo de datos con 5 migraciones; tema oscuro y hero. Documentación en `docs/modelo-de-datos.md` y `docs/guia-de-estilo.md`.
- **Autenticación:** registro con verificación de mayoría de edad, login con JWT, sesión en el frontend, rol ADMIN por lista de emails y recuperación de contraseña por email.
- **Catálogo:** API con filtros, tarjetas en la home, ficha de producto y 8 vinos cargados con sus imágenes.

**Verificación:** el código de cada Pull Request se comparó con el módulo previsto, sin diferencias, y el build del frontend sobre `main` compila sin errores.

## Eventos del sprint

| Evento | Cómo se llevó a cabo | Evidencia |
|---|---|---|
| Planificación | El backlog y el reparto los definió el Product Owner y se publicaron como issues y tablero el 22/10 | Issues, milestones y tablero |
| Reunión de seguimiento (daily) | Por el grupo de WhatsApp «Código Crítico», los martes, miércoles y jueves (20, 21 y 22/10) de 16:00 a 16:30, antes de empezar a trabajar. La del 22/10 coincide con el primer día del sprint | Historial del grupo de WhatsApp, tablero y PRs |
| Revisión de trabajo | Cada módulo entró por un Pull Request con un compañero como revisor, y lo mergeó un integrante distinto de su autor | PRs #38, #39 y #41 |
| Revisión del sprint | Este documento | — |
| Retrospectiva | Este documento | — |

### Qué se trató en las reuniones

En las reuniones se repartieron las partes de cada integrante y se explicó qué debía hacer cada uno. La asignación resultante quedó registrada en los issues y en el tablero:

| Integrante | Parte asignada | Qué debía hacer |
|---|---|---|
| Mazara Ariel | Base | Crear el repositorio y subir la estructura, el modelo de datos, el diseño y la documentación (ALT-01 a 05) |
| Foglia Maximiliano | Autenticación y recuperación de contraseña | Registro con mayoría de edad, login con JWT, sesión, rol ADMIN y recuperación por email (ALT-06 a 11) |
| Zuniga Agustina | Catálogo y ficha de producto | API con filtros, catálogo con tarjetas, ficha de producto y carga de los 8 vinos (ALT-12 a 15) |
| Gonzalez Joel | Carrito y checkout con Mercado Pago | Carrito persistente, dirección y costo de envío, pago con Mercado Pago y confirmación (ALT-16 a 23) |
| Mamani Santino | Panel de administración de productos | CRUD protegido para el administrador y panel `/admin` (ALT-24 a 27) |
| Silva Daniel | Pedidos y envíos | Historial de pedidos, panel de pedidos del administrador y carga del envío (ALT-28 a 33) |

## Retrospectiva

### Qué salió bien

- El flujo de rama, Pull Request y `Closes #n` funcionó: los 15 issues se cerraron solos al mergear.
- Cada módulo se integró sin conflictos y quedó idéntico a lo previsto.
- Al tener más margen hasta la presentación (05/11), se reordenó el calendario sin apuro.

### Qué mejorar

| Situación | Qué pasó | Impacto |
|---|---|---|
| Rama con material ajeno al proyecto | El 24/10 se subió una rama con un repositorio personal completo en lugar del módulo | Se borró la rama y se volvió a subir el módulo correcto el 26/10 |
| Merge antes de la revisión | Un Pull Request se mergeó antes de ser revisado, y se corrigió con un `force push` sobre `main` | Riesgo de perder trabajo ajeno; el historial quedó correcto |
| Commits con otro email | Los primeros commits de un módulo estaban asociados a otra cuenta | Se corrigió y hoy figuran con la cuenta del equipo |
| Reuniones sin acta escrita | Las reuniones por WhatsApp se hicieron solo de martes a jueves y no quedó un resumen escrito de lo acordado | Poca evidencia del avance y de los acuerdos |
| Estimaciones de una sola persona | Los puntos los definió el Product Owner | Pueden no reflejar la dificultad percibida por cada uno |

### Acciones para el Sprint 2

| Acción | Responsable | Cuándo |
|---|---|---|
| Proteger `main`: exigir Pull Request con aprobación y bloquear el `force push` | Mazara Ariel | Antes del 27/10 |
| Regla del equipo: no mergear un Pull Request sin una aprobación explícita | Todos | Desde el 27/10 |
| Configurar `git config user.email` con el email de la cuenta de GitHub antes de commitear | Todos | Desde el 27/10 |
| Mantener la reunión de seguimiento (16:00 a 16:30 por WhatsApp) y dejar al final un resumen de tres líneas por persona: qué hice, qué haré y qué me bloquea | Scrum Master | Martes 27, miércoles 28 y jueves 29/10 |
| Planificación conjunta del Sprint 2, para revisar los puntos de cada issue | Todos | 27/10 |
| Revisión del sprint con demo de cada módulo | Todos | 30/10 |

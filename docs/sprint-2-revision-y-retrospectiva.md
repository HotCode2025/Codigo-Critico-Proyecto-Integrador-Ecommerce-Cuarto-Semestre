# Sprint 2 — Revisión y retrospectiva

**Sprint 2 — Venta y gestión** · 27/10 al 02/11/2026 (extendido desde el 30/10) · Equipo Código Crítico

**Objetivo del sprint:** tener la compra completa funcionando (carrito y checkout con Mercado Pago, administración de productos, pedidos y envíos) y la infraestructura de deploy lista.

## Resultado

**Objetivo cumplido:** los tres módulos restantes se integraron a `main` y la aplicación quedó desplegada y verificada en producción. De los 22 issues del sprint se cerraron 21; queda abierto el ALT-41, que depende de un Pull Request de documentación (#50) en revisión. Se entregaron 86 de 88 puntos.

| Módulo | Responsable | Issues | Puntos | Pull Request | Merge |
|---|---|---|---|---|---|
| 4. Carrito y checkout con Mercado Pago | Gonzalez Joel | ALT-16 a 23 | 37 | #47 | 30/10 |
| 5. Panel de administración de productos | Mamani Santino | ALT-24 a 27 | 18 | #48 | 30/10 |
| 6. Pedidos y envíos | Silva Daniel | ALT-28 a 33 | 24 | #51 | 01/11 |
| Infraestructura de deploy | Mazara Ariel | ALT-35 | 3 | — | 02/11 |
| Documentación Scrum y retrospectiva del Sprint 1 | Mazara Ariel | ALT-39 y ALT-40 | 4 | #44 y #46 | 26/10 |
| Calendario del Sprint 2 en la guía | Mazara Ariel | ALT-41 | 2 | #50 | En revisión |

Con este sprint, los **seis módulos del proyecto están en `main`**.

### Métricas

| Métrica | Valor |
|---|---|
| Issues cerrados / planificados | 21 / 22 |
| Puntos entregados / planificados | 86 / 88 |
| Pull Requests mergeados | 5 (#44, #46, #47, #48 y #51); el #50 sigue abierto |
| Pull Requests de módulos con aprobación registrada en GitHub | 3 de 3 (#47, #48 y #51) |
| Tiempo desde que se abrió el Pull Request hasta el merge | #47: 4 días · #48: menos de 1 día · #51: casi 2 días |
| Conflictos al integrar los módulos | Ninguno |

## Revisión del sprint

Lo que se puede mostrar funcionando en producción (https://altos-del-uco-equipo.vercel.app):

- **Carrito y checkout:** carrito persistente por usuario, costo de envío configurable ($3.000, gratis desde $50.000), dirección de envío, pago con Mercado Pago y confirmación del pago desde el servidor con descuento de stock.
- **Administración de productos:** alta, edición y baja de productos, con permisos de administrador verificados en el servidor.
- **Pedidos y envíos:** historial del cliente, detalle con seguimiento, panel de pedidos del administrador con filtro por estado y carga del envío, y «Volver a comprar».
- **Deploy:** base de datos en Neon, backend en Render y frontend en Vercel, con despliegue automático al mergear a `main`.

**Verificación:** el 02/11 se hizo el QA sobre el sitio desplegado (registro y login, catálogo y filtros, carrito, checkout, pedidos y permisos) sin encontrar errores. En producción se completó el recorrido de punta a punta: una compra de prueba con Mercado Pago (pedido en PAGADO y stock descontado), su envío marcado desde el panel de administración y el seguimiento visible para el cliente.

## Eventos del sprint

| Evento | Cómo se llevó a cabo | Evidencia |
|---|---|---|
| Planificación | No quedó registro escrito en el repositorio; el alcance del sprint estaba definido en los issues y en el tablero | Issues, milestones y tablero |
| Reunión de seguimiento | Hubo reuniones durante el sprint, con la participación de Ariel, Agustina, Joel y Daniel | Reuniones del equipo (sin acta escrita en el repositorio) |
| Revisión de trabajo | Cada Pull Request de módulo recibió una aprobación registrada y lo mergeó un integrante distinto de su autor | PRs #47, #48 y #51 |
| Revisión del sprint | Este documento y la verificación del sitio en producción | — |
| Retrospectiva | Este documento | — |

## Seguimiento de las acciones del Sprint 1

| Acción acordada | Estado |
|---|---|
| Regla de no mergear sin una aprobación explícita | **Cumplida** en los tres módulos de este sprint. |
| No hacer `force push` sobre `main` | **Cumplida:** no hubo reescrituras del historial de `main` durante el sprint. |
| Configurar el email de Git con el de la cuenta de GitHub | **Cumplida:** los commits de los tres módulos están asociados a la cuenta de cada autor. |
| Resumen escrito de las reuniones de seguimiento | **Pendiente:** no hay resúmenes registrados en el repositorio. |
| Planificación conjunta del Sprint 2 | **Sin registro:** no quedó constancia escrita de una planificación conjunta. |
| Proteger `main` en GitHub (exigir Pull Request con aprobación) | **Pendiente:** la rama sigue sin protección. |

## Retrospectiva

### Qué salió bien

- Los tres módulos se integraron a `main` **sin conflictos**, incluso llegando en momentos distintos.
- Cada módulo se **adaptó al código que ya estaba en `main`**: por ejemplo, el módulo de pedidos reutilizó el middleware de administrador y los componentes del panel que había agregado el módulo anterior.
- El módulo de administración mejoró el enfoque previsto: el servidor **vuelve a leer el rol del usuario desde la base** en cada pedido, en lugar de confiar en el token.
- Todos los Pull Requests de módulos tuvieron **una aprobación registrada** y los issues se cerraron solos con `Closes #n`.
- El QA sobre el sitio desplegado no encontró errores, y el **recorrido completo con Mercado Pago funcionó en producción**.
- Se resolvieron las dificultades del deploy en el mismo día: acceso de Render y Vercel al repositorio, variables de entorno y carga inicial de datos.

### Qué mejorar

| Situación | Qué pasó | Impacto |
|---|---|---|
| Entregas concentradas al final | Dos de los tres módulos se integraron el último día previsto del sprint y el tercero después | El sprint se extendió del 30/10 al 02/11 y el Sprint 3 quedó con dos días |
| Espera de revisión | El Pull Request del carrito y checkout estuvo 4 días abierto antes de mergearse | La integración de los módulos siguientes quedó demorada |
| Revisión concentrada | La mayor parte de las revisiones y merges de módulos las hizo una sola persona | Cuello de botella y menos intercambio entre compañeros |
| Reuniones sin acta | Hubo reuniones durante el sprint, pero no quedó un resumen escrito de lo acordado | Poca evidencia de los acuerdos |
| `main` sin protección | Todavía no se exige Pull Request con aprobación a nivel de GitHub | Depende solo de la disciplina del equipo |
| Ventana de pago del carrito | En un navegador (Firefox) la ventana de Mercado Pago no se abrió y el pago se hizo desde «Volver a comprar» | Riesgo para la demostración |
| Mail de recuperación | Falta configurar la clave de Resend en producción | No se puede mostrar el envío real en la defensa |
| Pruebas en otros navegadores | Solo se probó en Firefox de escritorio y en un celular simulado | Falta confirmar Chrome, Edge y un celular real |

### Acciones para el Sprint 3

| Acción | Responsable | Cuándo |
|---|---|---|
| Probar el sitio en Chrome, Edge y un celular real (ALT-38) | Mazara Ariel | 03/11 |
| Cargar la clave de Resend en Render y probar el mail de recuperación (ALT-36) | Mazara Ariel | 03/11 |
| Hacer que el carrito redirija siempre al link de pago de Mercado Pago, como «Volver a comprar» (ALT-43, Pull Request #55, revisado y mergeado por Zuniga Agustina el 02/11) | Mazara Ariel | 03/11 |
| Rotar las credenciales de Mercado Pago, Neon y Vercel (ALT-36) | Mazara Ariel | 03/11 |
| Proteger `main` exigiendo Pull Request con aprobación | Mazara Ariel | 03/11 |
| Dejar un resumen escrito de cada reunión (qué se acordó y quién hace qué) | Scrum Master | Desde el 03/11 |
| Que los Pull Requests de cada módulo se revisen entre compañeros, repartiendo las revisiones | Todos | Desde el 03/11 |
| Ensayo de la presentación, con cada integrante explicando su módulo (ALT-37) | Todos | 04/11 |

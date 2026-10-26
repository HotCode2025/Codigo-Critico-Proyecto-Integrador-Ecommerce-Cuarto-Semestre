# Organización del trabajo (marco Scrum)

El equipo **Código Crítico** trabaja con un marco Scrum simplificado: un backlog de issues, tres sprints cortos y un tablero en GitHub. La presentación final es el **05/11/2026**.

- **Tablero:** [Altos del Uco — Sprints](https://github.com/orgs/HotCode2025/projects/149)
- **Issues y milestones:** pestañas *Issues* y *Milestones* del repositorio.

## Roles

| Rol | Quién | Qué hace |
|---|---|---|
| Product Owner | Mazara Ariel | Es el dueño del Brief: ordena el backlog y decide si un issue cumple lo pedido. |
| Scrum Master | Mazara Ariel | Facilita la reunión diaria, destraba bloqueos y cuida el orden de integración. |
| Equipo de desarrollo | Los 6 integrantes | Cada uno toma los issues de su módulo. |

## Sprints

| Sprint | Fechas | Objetivo | Issues | Estado |
|---|---|---|---|---|
| Sprint 1 — Cimientos | 22/10 al 26/10 | Repositorio, base de datos, usuarios y catálogo en `main` | ALT-01 a ALT-15 | Terminado |
| Sprint 2 — Venta y gestión | 27/10 al 31/10 | Carrito y checkout, admin de productos, pedidos y envíos; infraestructura de deploy | ALT-16 a ALT-33, ALT-35 y ALT-39 | Arranca el 27/10 |
| Sprint 3 — Cierre | 02/11 al 04/11 | QA completo, verificación del deploy, credenciales y ensayo | ALT-34, 36, 37 y 38 | Pendiente |
| Presentación | 05/11 | Defensa con demo | — | — |

### Orden de integración de los módulos

Cada módulo usa el código del anterior, así que **entran a `main` en orden**:

| Módulo | Responsable | Fecha límite de merge |
|---|---|---|
| 1. Base | Mazara Ariel | Hecho |
| 2. Autenticación y recuperación de contraseña | Foglia Maximiliano | Hecho |
| 3. Catálogo y ficha de producto | Zuniga Agustina | Hecho |
| 4. Carrito y checkout con Mercado Pago | Gonzalez Joel | 29/10 |
| 5. Panel de administración de productos | Mamani Santino | 30/10 |
| 6. Pedidos y envíos | Silva Daniel | 31/10 |

Mientras espera su turno, cada integrante puede preparar su rama y las cuentas que necesite (por ejemplo, Mercado Pago de prueba o Resend).

## Eventos

- **Reunión diaria** (15 minutos, o por chat): qué hice, qué voy a hacer y qué me bloquea.
- **Planificación del sprint:** al empezar, se elige qué issues entran.
- **Revisión del sprint:** cada uno muestra su módulo funcionando. Sirve de ensayo para la defensa.
- **Retrospectiva** (10 minutos): qué salió bien, qué mejorar y qué cambiamos.

## Tablero

Las tarjetas se mueven por estas columnas:

`Backlog` → `Sprint` → `En curso` → `En revisión` (Pull Request abierto) → `Hecho`

## Issues

### Nombres

Cada issue tiene un código del proyecto en el título (`[ALT-16] API del carrito persistente`). **ALT** viene de *Altos del Uco* y el número es el orden dentro del backlog. GitHub le asigna además su propio número (`#16`), que comparte con los Pull Requests y puede no coincidir con el del título. En los Pull Requests se usa el número de GitHub.

### Etiquetas

| Tipo | Etiquetas |
|---|---|
| Módulo | `epic:base`, `epic:auth`, `epic:catalogo`, `epic:checkout`, `epic:admin`, `epic:pedidos`, `epic:equipo` |
| Capa | `backend`, `frontend`, `base-de-datos` |
| Estimación | `puntos:2`, `puntos:3`, `puntos:5`, `puntos:8` |
| Errores | `bug` |

### Estimación

Se estima en puntos de historia: **2** es trivial, **3** chico, **5** mediano y **8** grande o riesgoso. El backlog tiene 39 issues y 155 puntos.

### Formato

Cada issue incluye una historia de usuario («Como ..., quiero ..., para ...»), el requerimiento del Brief que cubre (RF-xx), los criterios de aceptación en casillas de verificación y las tareas.

## Definición de «Hecho»

Un issue se cierra solo cuando:

- [ ] Está implementado en una rama propia y probado a mano.
- [ ] Hay un **Pull Request** hacia `main` que lo menciona con `Closes #n`.
- [ ] **Otro integrante lo revisó** y lo aprobó.
- [ ] No hay `.env` ni claves en el cambio.
- [ ] Su autor puede explicarlo en la defensa.

## Flujo de un cambio

1. Elegir un issue del sprint y mover su tarjeta a `En curso`.
2. Crear una rama propia desde `main` actualizado (por ejemplo, `feature/catalogo`).
3. Hacer commits con el usuario de GitHub propio, y terminar el mensaje con `Refs #n`.
4. Abrir el Pull Request hacia `main` con `Closes #n` en la descripción y pedir la revisión de un compañero.
5. Con la aprobación, mergear con **«Create a merge commit»** o **«Rebase and merge»**. No se usa «Squash», para conservar un commit por cambio.
6. Al mergear, el issue se cierra solo y la tarjeta pasa a `Hecho`.

**Nadie sube directo a `main` ni reescribe su historial (`force push`).**

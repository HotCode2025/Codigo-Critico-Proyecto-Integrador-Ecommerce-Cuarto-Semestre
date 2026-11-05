# Anexo al brief del proyecto — Altos del Uco

Este anexo complementa el **Brief de proyecto** de septiembre de 2026 (grupo Código Crítico, Programación IV). El brief describe el producto que se planificó; este documento registra lo que cambió durante el desarrollo y el estado final del proyecto. Todo lo que no se menciona acá sigue vigente tal como está en el brief.

**Sitio en producción:** https://www.altosdeluco.com.ar · **Repositorio:** https://github.com/HotCode2025/Codigo-Critico-Proyecto-Integrador-Ecommerce-Cuarto-Semestre

## 1. Integrantes

El brief lista siete integrantes. El proyecto lo desarrolló un equipo de **seis**:

| Integrante | Módulo |
|---|---|
| Mazara Ariel | Base: estructura, modelo de datos, diseño y documentación. Product Owner y Scrum Master. Infraestructura de despliegue y mejoras del Sprint 3 |
| Foglia Maximiliano | Autenticación y recuperación de contraseña |
| Zuniga Agustina | Catálogo y ficha de producto. Revisión de los Pull Requests |
| Gonzalez Joel | Carrito y checkout con Mercado Pago |
| Mamani Santino | Panel de administración de productos |
| Silva Daniel | Pedidos y envíos |

**Morales Maximiliano**, que figura en el brief con la tarea de modelo de datos y migración inicial (etapa 4 de la planificación), dejó de participar del proyecto: no respondió a los mensajes del equipo y no hay commits, issues ni Pull Requests a su nombre en el repositorio. Su tarea la asumió Mazara Ariel (ALT-03, modelo de datos y migraciones), y el resto del trabajo se repartió entre los seis módulos de la tabla anterior.

## 2. Organización del trabajo

La planificación por etapas del brief (sección 16) se reemplazó por un marco **Scrum de tres sprints**, con cada tarea registrada como issue en el tablero del proyecto y cada cambio integrado a `main` mediante un Pull Request revisado:

| Sprint | Fechas | Resultado |
|---|---|---|
| Sprint 1 — Cimientos | 22/10 al 26/10 | Repositorio, base de datos, autenticación y catálogo en `main` |
| Sprint 2 — Venta y gestión | 27/10 al 02/11 | Carrito y checkout, administración de productos, pedidos y envíos; infraestructura de despliegue |
| Sprint 3 — Cierre | 03/11 al 04/11 | QA en producción, mejoras que surgieron del QA, documentación y ensayo |

El detalle está en [`organizacion-scrum.md`](organizacion-scrum.md) y las revisiones y retrospectivas de cada sprint en los documentos `sprint-N-revision-y-retrospectiva.md`. El proyecto cuenta con releases publicadas en GitHub y una wiki.

## 3. Alcance: qué se agregó

El brief define como alcance de la etapa el circuito de compra y el panel de administración. Todo eso se cumplió. Además, el QA en producción y la comparación con otros comercios llevaron a sumar:

| Mejora | Descripción |
|---|---|
| Comprobante de compra | Mail al aprobarse el pago, con el detalle de la compra, y versión imprimible en el detalle del pedido. Aclara que no es una factura fiscal |
| Factura adjunta al pedido | El administrador sube el PDF de la factura emitida en ARCA y el cliente lo descarga desde su pedido. La carga es manual: no hay conexión con ARCA |
| Información legal | Política de privacidad, términos y condiciones, medios de pago y envío, y pie de página con el correo de atención y los logos de Mercado Pago, Correo Argentino y Andreani |
| Botón de arrepentimiento | Formulario que envía la solicitud a la tienda y una copia al cliente |
| Pago de pedidos cancelados | Un pago aprobado sobre un pedido cancelado lo reactiva, en lugar de dejarlo cancelado |
| Gestión de usuarios | El administrador da o quita el rol de administrador desde el panel |
| Dominio propio | `altosdeluco.com.ar` (NIC Argentina, con DNS en Cloudflare). Los correos salen de `vinoteca@altosdeluco.com.ar` y lo que llega a esa dirección se reenvía a la casilla del equipo |
| Ajustes de interfaz | Encabezado en celular, pantallas de acceso y carrito solo con sesión iniciada |

También se corrigieron dos fallas que apareció el QA: la ventana de pago de Mercado Pago que no se abría desde el carrito en Firefox y el stock que se descontaba dos veces.

## 4. Requerimientos: actualización

A los requerimientos funcionales RF-01 a RF-10 del brief se suman:

| # | Requerimiento |
|---|---|
| RF-11 | El sistema debe enviar al cliente un comprobante de compra por correo al aprobarse el pago y mostrarlo en versión imprimible. |
| RF-12 | El sistema debe permitir a un usuario ADMIN adjuntar a un pedido pagado o enviado el PDF de su factura, y al cliente descargarlo. |
| RF-13 | El sistema debe ofrecer al cliente un botón de arrepentimiento de compra. |
| RF-14 | El sistema debe permitir a un usuario ADMIN dar y quitar el rol de administrador a otras cuentas, sin que pueda cambiar el propio. |
| RF-15 | El sistema debe reactivar un pedido cancelado cuando recibe un pago aprobado, sin duplicar el descuento de stock. |

## 5. Roles y permisos

La sección 14 del brief indica que el rol de administrador solo se asigna en la base de datos o por una lista de correos definida por variable de entorno. Se mantiene que **nadie puede promoverse a sí mismo**, y ahora hay tres formas de asignar el rol:

1. Desde el panel, en **Usuarios**: un administrador da o quita el rol a otra cuenta ya registrada.
2. La variable `ADMIN_EMAILS`: los correos de esa lista quedan como administradores al registrarse.
3. Directamente en la base de datos.

## 6. Arquitectura y tecnologías

Se mantienen las tecnologías del brief. El despliegue quedó así:

| Capa | Servicio |
|---|---|
| Frontend | Vercel |
| Backend | Render (plan gratuito: la primera consulta tras un rato sin uso puede tardar cerca de un minuto) |
| Base de datos | PostgreSQL en Neon |
| Correo | Resend, con el dominio propio verificado |
| DNS y reenvío de correo | Cloudflare |
| Pagos | Mercado Pago, Checkout Pro, en modo de prueba |

La rama `main` está protegida: exige un Pull Request con una aprobación y no admite `force push`.

## 7. Qué quedó fuera

Se mantiene lo que el brief deja fuera del alcance: reseñas, lista de deseos, múltiples métodos y couriers de envío, newsletter y migración a TypeScript. Además:

- **No hay facturación electrónica integrada:** la factura se emite fuera del sistema y se adjunta a mano.
- **Los pagos funcionan en modo de prueba** de Mercado Pago; pasar a pagos reales requiere credenciales de producción.
- **Mercado Pago y la contraseña de la base de datos no se rotaron** antes de la presentación, por decisión del equipo, para no arriesgar un corte del sitio; el riesgo quedó registrado en el issue correspondiente.

# Sprint 3 — Revisión y retrospectiva

**Sprint 3 — Cierre** · 03/11 al 04/11/2026 (el trabajo técnico se hizo entre el 02/11 y el 05/11) · Equipo Código Crítico

**Objetivo del sprint:** dejar el producto verificado en producción y listo para la presentación: QA completo, credenciales revisadas, mejoras que surgieron del QA y ensayo final.

> Los datos de issues, Pull Requests y verificaciones salen de GitHub y de pruebas hechas en producción. Lo que el equipo coordinó por el grupo de WhatsApp no deja registro en el repositorio y se indica como tal.

## Resultado

**Objetivo cumplido en lo técnico:** la aplicación quedó verificada de punta a punta en producción, las fallas que mostró el QA se corrigieron y el sitio pasó a una dirección propia (`www.altosdeluco.com.ar`) con mails que salen de un dominio propio. El **ALT-37 (ensayo y presentación final)**, que dependía de todo el equipo, se cerró el 05/11 con parte de sus casillas sin tildar (ver más abajo).

Se cerraron los **17 issues** del sprint. Se completaron **49 de 52 puntos**: los 3 puntos del ALT-37 se cerraron de forma parcial, porque solo 3 de los 6 integrantes registraron su prueba.

| Issue | Qué se hizo | Puntos | Pull Request | Fecha |
|---|---|---|---|---|
| ALT-34 | QA del flujo completo en sandbox | 5 | — | 02/11 |
| ALT-36 | Revisión de secretos y rotación de credenciales | 2 | — | 02/11 |
| ALT-38 | Verificación del deploy completo en producción | 3 | — | 02/11 |
| ALT-42 | Documentación de la revisión y retrospectiva del Sprint 2 | 2 | #53 | 02/11 |
| ALT-43 | El carrito redirige siempre al link de pago de Mercado Pago | 2 | #55 | 02/11 |
| ALT-44 | El stock se descontaba dos veces si el aviso de pago y la confirmación llegaban juntos | 3 | #58 | 02/11 |
| ALT-45 | Footer, páginas legales y botón de arrepentimiento de compra | 5 | #60 | 02/11 |
| ALT-46 | Comprobante de compra por email y versión imprimible | 5 | #62 | 02/11 |
| ALT-47 | Textos legales y totales de la guía | 2 | #64 | 02/11 |
| ALT-48 | Subir la factura de ARCA a un pedido (carga manual del PDF por el administrador) | 5 | #67 | 02/11 |
| ALT-49 | Un pago aprobado sobre un pedido cancelado ahora lo reactiva | 3 | #70 | 02/11 |
| ALT-50 | Ajustes de interfaz: encabezado en celular, pantalla de acceso y carrito sin sesión | 2 | #73 | 02/11 |
| ALT-51 | Pie de página compacto en las pantallas de acceso | 2 | #76 | 02/11 |
| ALT-52 | Correo de la tienda y logos de pago y envío en el pie | 2 | #78 | 02/11 |
| ALT-53 | Dar y quitar el rol de administrador desde el panel | 3 | #80 | 03/11 |
| ALT-54 | Manual de uso y anexo del brief | 3 | #82 | 05/11 |
| **ALT-37** | **Ensayo y presentación final** (cerrado con casillas sin tildar) | **3** | — | **05/11** |

Además se mergearon otros Pull Requests de documentación: #50 (calendario del Sprint 2 en la guía), #56 (corrección de la retrospectiva del Sprint 2), #65 (comprobante sin mención al proyecto académico), #68 (enlace a la wiki), #71 (README) y #74 (totales de la guía y del README hasta el ALT-52). El #80 (ALT-53) también actualizó los totales. El #82 (ALT-54) sumó el manual de uso y el anexo del brief.

### Métricas

| Métrica | Valor |
|---|---|
| Issues cerrados / planificados | 17 / 17 (el ALT-37 se cerró con casillas sin tildar) |
| Puntos entregados / planificados | 49 / 52 completos (los 3 puntos del ALT-37 quedaron parciales) |
| Alcance inicial del sprint | 4 issues y 13 puntos (ALT-34, ALT-36, ALT-37 y ALT-38) |
| Issues agregados durante el sprint (surgidos del QA y de pedidos del equipo) | 13 issues y 39 puntos (ALT-42 a ALT-54) |
| Pull Requests mergeados | 19 (#50, #53, #55, #56, #58, #60, #62, #64, #65, #67, #68, #70, #71, #73, #74, #76, #78, #80 y #82) |
| Pull Requests con aprobación registrada en GitHub | 19 de 19 |
| Pull Requests con cambios pedidos antes de aprobar | 2 (#74 y #82) |
| Conflictos al integrar | Ninguno |
| Fallas y casos no cubiertos detectados y corregidos | 3 (ALT-43, ALT-44 y ALT-49) |

## Revisión del sprint

Lo que se puede mostrar funcionando en producción (https://www.altosdeluco.com.ar; la dirección anterior, https://altos-del-uco-equipo.vercel.app, sigue disponible):

- **Recorrido completo de compra:** registro, catálogo, carrito, pago con Mercado Pago de prueba, pedido en «Pagado», stock descontado una sola unidad por botella, envío marcado desde el panel de administración y seguimiento visible para el cliente.
- **Pago aprobado sobre un pedido cancelado:** si llega un pago aprobado para un pedido que ya estaba cancelado, ese mismo pedido pasa a «Pagado» y descuenta el stock una sola vez, en lugar de quedar cancelado con el dinero cobrado. Un pedido ya pagado o enviado no se modifica.
- **Comprobante de compra:** llega por email al aprobarse el pago y se puede ver e imprimir desde el detalle del pedido. Aclara que no es una factura fiscal.
- **Factura de ARCA:** el administrador adjunta el PDF de la factura a un pedido pagado o enviado y el cliente lo descarga desde su pedido (carga manual; no se conecta con ARCA). La tabla nueva se creó en producción con el deploy, y la carga del PDF se verificó en producción con un pedido real y la descarga desde la cuenta del cliente (pedido #14, el 03/11) entrega el archivo con su nombre original. Para la demostración se usa una factura de ejemplo, marcada como sin validez fiscal.
- **Usuario administrador para el profesor:** el correo institucional del profesor figura en la lista de administradores, de modo que al registrarse con ese correo queda con acceso al panel de administración.
- **Dirección propia:** `www.altosdeluco.com.ar` sirve el sitio directamente, con certificado válido, y `altosdeluco.com.ar` redirige a la versión con `www`. El backend, los retornos de Mercado Pago y los links de los mails usan esa dirección. Se verificó con una compra de prueba el 03/11 (pedido #15): el pago quedó en «Pagado», se descontó una sola unidad de stock y el comprobante llegó por mail con el link a `www.altosdeluco.com.ar`. Los links de los mails y el retorno de Mercado Pago salen de la misma variable de configuración del servidor (`FRONTEND_URL`).
- **Mails desde un dominio propio:** el dominio `altosdeluco.com.ar` (registrado en NIC Argentina, con DNS en Cloudflare) quedó verificado en Resend el 02/11 y los mails salen desde `vinoteca@altosdeluco.com.ar`. Lo que llegue a esa dirección se reenvía a la casilla del equipo; el reenvío se comprobó con un mensaje de prueba. La prueba con la casilla de un compañero todavía no se hizo.
- **Recuperación de contraseña:** el mail llega, la contraseña se cambia desde el link y el mismo link, usado de nuevo, ya no sirve.
- **Footer y páginas informativas:** política de privacidad, términos y condiciones, medios de pago y envío, y el botón de arrepentimiento de compra (con mail a la tienda y copia al cliente). El pie muestra el correo de atención de la tienda y los logos de Mercado Pago, Correo Argentino y Andreani; en las pantallas de acceso se muestra una versión compacta.
- **Administradores desde el panel:** en `/admin/usuarios` un administrador da o quita el rol de administrador a otra cuenta (no puede cambiar el propio). Para quien todavía no se registró se sigue usando la lista `ADMIN_EMAILS`. Se probó en producción el 03/11: una cuenta de prueba recibió el rol desde el panel y vio el acceso al panel de administración al volver a iniciar sesión.
- **Interfaz en celular y escritorio:** el encabezado ya no se desborda en pantallas angostas, el texto de la pantalla de acceso no se corta en escritorio y el enlace al carrito solo aparece con la sesión iniciada.
- **Documentación pública:** README reescrito, wiki del repositorio, releases v0.1.0 y v0.2.0 publicadas, y descripción y temas del repositorio. La release **v1.0.0**, la primera versión completa, se publicó el 05/11.
- **Pruebas de navegadores:** Firefox, Chrome, Edge y un celular real.

### Qué reveló el QA en producción

| Hallazgo | Cómo se detectó | Resolución |
|---|---|---|
| En Firefox, la ventana de pago de Mercado Pago no se abría desde el carrito | Prueba manual en producción | ALT-43 (#55): el carrito redirige siempre al link de pago |
| Comprar 1 botella descontaba 2 del stock | Compra de prueba y revisión del stock | ALT-44 (#58): el cambio de estado del pedido es atómico y solo una de las dos llamadas descuenta el stock |
| Faltaba entregar al cliente una constancia de compra | Observación del equipo al comparar con otro comercio | ALT-46 (#62): comprobante por email y versión imprimible |
| Faltaba información legal y de contacto visible | Observación del equipo al comparar con otro comercio | ALT-45 (#60): footer, páginas legales y arrepentimiento |
| Faltaba una forma de entregar la factura fiscal al cliente | Pedido del equipo | ALT-48 (#67): carga manual del PDF de ARCA por el administrador |
| Un pago aprobado sobre un pedido que ya estaba cancelado lo dejaba cancelado | Pregunta durante la prueba de pagos | ALT-49 (#70): el pago aprobado reactiva el pedido cancelado |
| El encabezado se desbordaba en celular, el texto de la pantalla de acceso se cortaba en escritorio y el carrito aparecía sin sesión | Capturas en celular y escritorio | ALT-50 (#73) y ALT-51 (#76) |
| Faltaban el correo de atención y los logos de pago y envío en el pie | Observación del equipo | ALT-52 (#78) |
| Agregar a un administrador exigía tocar la base de datos o las variables del servidor | Consulta de Ariel durante la preparación del sprint | ALT-53 (#80): pantalla de usuarios para dar y quitar el rol de administrador |

## Eventos del sprint

| Evento | Cómo se llevó a cabo | Evidencia |
|---|---|---|
| Planificación | El alcance se definió en la guía de organización y en los issues del milestone | Guía, issues y tablero |
| Reuniones de seguimiento | Se coordinaron por el grupo de WhatsApp del equipo. No quedó un resumen escrito en el repositorio | Grupo de WhatsApp (sin registro en el repositorio) |
| Revisión de trabajo | Cada Pull Request tuvo una aprobación registrada en GitHub; el #74 se aprobó después de una revisión con cambios pedidos | 19 Pull Requests, de #50 a #82 |
| Ensayo de la presentación | Se coordinó por el grupo de WhatsApp. En el ALT-37 registraron su prueba Mazara Ariel, Zuniga Agustina y Gonzalez Joel | ALT-37 (cerrado el 05/11) |
| Revisión del sprint | Este documento | — |
| Retrospectiva | Este documento | — |

## Seguimiento de las acciones del Sprint 2

| Acción acordada | Estado |
|---|---|
| Probar el sitio en Chrome, Edge y un celular real (ALT-38) | **Cumplida** (02/11). |
| Cargar la clave de Resend en Render y probar el mail de recuperación (ALT-36) | **Cumplida** (02/11): llegan el mail de recuperación, el de arrepentimiento y el comprobante. |
| Que el carrito redirija siempre al link de pago de Mercado Pago (ALT-43) | **Cumplida** (#55). |
| Rotar las credenciales de Mercado Pago, Neon y Vercel (ALT-36) | **Parcial, por decisión de Ariel:** se regeneraron el `JWT_SECRET`, la clave de Resend y los códigos de recuperación de Vercel. Mercado Pago (credenciales de prueba) y la contraseña de Neon **no se rotaron**, para no arriesgar un corte del sitio días antes de la presentación; el riesgo quedó aceptado y registrado en el issue. |
| Proteger `main` exigiendo Pull Request con aprobación | **Cumplida** (02/11): exige un Pull Request con una aprobación y no permite `force push` ni borrar la rama. |
| Resumen escrito de cada reunión | **No cumplida:** las reuniones se coordinaron por WhatsApp y no quedó resumen escrito en el repositorio. |
| Que los Pull Requests se revisen entre compañeros, repartiendo las revisiones | **No cumplida:** 18 de los 19 Pull Requests del sprint los revisó la misma persona (ver abajo). |
| Ensayo de la presentación (ALT-37) | **Parcial:** el issue se cerró el 05/11 con 3 de los 6 integrantes con la prueba registrada y sin orden de exposición definido en el issue. |

## Retrospectiva

### Qué salió bien

- El QA en producción **encontró fallas reales** (la ventana de pago, el doble descuento de stock y el pago de un pedido cancelado) y se corrigieron el mismo día, cada una con su Pull Request y su issue.
- El doble descuento se **reprodujo con una simulación antes de corregirlo** y se verificó con una compra real después del arreglo: la compra de 1 botella descontó 1 unidad.
- Todos los Pull Requests tuvieron **aprobación registrada**, no hubo **conflictos** y los issues se cerraron solos con `Closes #n`.
- **La revisión funcionó:** en el #74 se pidieron cambios y se detectó un total mal sumado en la guía (189 puntos en lugar de 188), que se verificó contra GitHub y se corrigió antes del merge. En el #82, la revisora contrastó el manual de uso con el código y encontró que «Volver a comprar» crea un pedido nuevo, algo que el manual describía mal. Se corrigió antes del merge.
- Se agregaron mejoras que acercan el sitio a una tienda real (comprobante, factura de ARCA, información legal, arrepentimiento, logos y correo de atención) sin romper lo que ya funcionaba.
- Se **protegió `main`** y se hizo una revisión de secretos sobre todo el historial: no hay claves ni archivos `.env` versionados.
- Los mails se verificaron con envío real en producción y, al descubrir que con el remitente de prueba solo llegaban a una casilla, se resolvió el mismo día con un **dominio propio**: registro en NIC, DNS en Cloudflare, verificación en Resend y reenvío de la casilla de la tienda, sin cambios de código en el envío.
- La delegación del dominio en NIC tardó unos 25 minutos en publicarse; las pruebas con consultas DNS directas sirvieron para saber en qué punto estaba cada paso.
- El sitio pasó a servirse desde `www.altosdeluco.com.ar` manteniendo disponible la dirección anterior durante el cambio.
- Se dejó la documentación pública ordenada: README, wiki y releases.

### Qué mejorar

| Situación | Qué pasó | Impacto |
|---|---|---|
| Un error llegó a producción | El doble descuento de stock se detectó recién en una compra de prueba en producción | Si hubiera sido un cliente real, habría perdido stock sin vender |
| Alcance que creció durante el sprint | El sprint empezó con 4 issues (13 puntos) y terminó con 17 (52 puntos): se agregaron 13 issues, el último a pocos días de la presentación | Más trabajo del previsto en pocos días |
| Trabajo concentrado en una persona | De los 17 issues del sprint, 16 tuvieron a Ariel como responsable; el ALT-37 era de todo el equipo | Cuello de botella y poca participación del resto en esta etapa |
| Revisión concentrada | 18 de los 19 Pull Requests los aprobó y mergeó la misma persona (Zuniga Agustina); el restante (#56) lo aprobó y mergeó Mazara Ariel. Cuatro integrantes no revisaron ningún Pull Request | Se repite la acción del Sprint 2 sin cumplir |
| Totales mal sumados | El total de puntos de la guía se escribió a mano y tuvo un error que detectó la revisión | Conviene verificar los totales contra GitHub antes de abrir el Pull Request |
| Tablero desactualizado | Al 03/11, 46 de los 51 issues cerrados no figuraban como «Hecho» (había issues cerrados en Backlog, Sprint y En revisión, y 13 sin estado) porque las automatizaciones del proyecto no estaban activadas | El tablero no reflejaba el avance real. Se corrigió el 03/11; las automatizaciones se activan desde la web del proyecto y no hay confirmación de que lo estén, por lo que los estados se siguen actualizando a mano |
| Credenciales visibles en capturas | Durante el deploy y el QA se compartieron capturas con credenciales a la vista | Se regeneraron las que importaban; Mercado Pago y Neon quedaron sin rotar por decisión consciente |
| Mails solo al dueño de la cuenta | Con el remitente de prueba de Resend, los mails solo se entregaban a la casilla del dueño de la cuenta | Un cliente real no recibía el comprobante ni el mail de recuperación. **Se resolvió el 02/11** con un dominio propio verificado; falta confirmarlo con la casilla de un compañero, que todavía no se probó |
| Plan gratuito del servidor | El backend en Render tarda casi un minuto en responder tras un rato sin uso | Conviene «despertarlo» antes de la demostración |
| Un integrante dejó de participar | Morales Maximiliano, que figura en el brief con la tarea del modelo de datos, no respondió a los mensajes del equipo y no registró aportes en el repositorio | Su tarea la asumió Mazara Ariel (ALT-03) y el equipo final fue de seis personas. Conviene detectar antes la falta de respuesta y reasignar a tiempo |
| ALT-37 cerrado con casillas sin tildar | Foglia Maximiliano, Mamani Santino y Silva Daniel no registraron su prueba ni su commit y Pull Request, y el equipo no registró el orden de exposición | No hay evidencia en el issue de que los tres hayan probado la app con su cuenta; la coordinación quedó solo en WhatsApp. Conviene registrar la evidencia donde queda el historial |
| Datos de prueba en producción | La base de producción tiene usuarios y pedidos creados durante el QA | Pueden aparecer en la demostración. El equipo decidió dejarlos en producción |

### Acciones pendientes

| Acción | Responsable | Cuándo |
|---|---|---|
| Confirmar que el comprobante y el mail de recuperación llegan a la casilla de un compañero (no solo a la del dueño de la cuenta) | Todos | Sin fecha definida |
| Activar las automatizaciones del tablero (cierre de issue y merge de PR pasan a «Hecho») | Scrum Master | Sin fecha definida |
| Despertar el backend con `/api/health` unos minutos antes de la demostración | Mazara Ariel | Antes de la demostración |

## Cierre del proyecto

- **ALT-37:** cerrado el 05/11 con un comentario que detalla quién completó cada casilla. **Milestone del Sprint 3:** sin issues abiertos al cierre.
- **Versión final:** `v1.0.0`, publicada el 05/11 sobre `main`, con la aplicación en producción en https://www.altosdeluco.com.ar y el manual de uso y el anexo del brief en el repositorio.

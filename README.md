# Altos del Uco

Altos del Uco es una tienda en línea de vinos de bodegas boutique del Valle de Uco, Mendoza. La desarrollamos como proyecto integrador de la materia Programación IV, en el equipo Código Crítico.

- Sitio en producción: https://www.altosdeluco.com.ar
- [Wiki del proyecto](https://github.com/HotCode2025/Codigo-Critico-Proyecto-Integrador-Ecommerce-Cuarto-Semestre/wiki): equipo, marco Scrum, sprints y releases, arquitectura y modelo de datos.
- [Tablero de trabajo](https://github.com/orgs/HotCode2025/projects/149) y [releases](https://github.com/HotCode2025/Codigo-Critico-Proyecto-Integrador-Ecommerce-Cuarto-Semestre/releases).

## Contenido

1. [Funcionalidades](#funcionalidades)
2. [Tecnologías](#tecnologías)
3. [Estructura del repositorio](#estructura-del-repositorio)
4. [Modelo de datos](#modelo-de-datos)
5. [Instalación y ejecución local](#instalación-y-ejecución-local)
6. [Integraciones](#integraciones)
7. [Administración](#administración)
8. [Despliegue](#despliegue)
9. [Equipo y organización del trabajo](#equipo-y-organización-del-trabajo)
10. [Decisiones técnicas](#decisiones-técnicas)

## Funcionalidades

**Cuentas**
- Registro e inicio de sesión con verificación de mayoría de edad (18 años) y autenticación con JWT.
- Recuperación de contraseña por correo electrónico, mediante un enlace que vence a la hora.

**Catálogo y compra**
- Catálogo con filtros por varietal, bodega, añada y precio, y ficha de producto con región, notas de cata y maridaje.
- Carrito persistente por usuario.
- Dirección de envío y costo de envío configurable: una tarifa fija, gratuita a partir de cierto subtotal.
- Pago con Mercado Pago (Checkout Pro, en modo de prueba). El servidor confirma cada pago y descuenta el stock.

**Pedidos**
- Historial de pedidos con detalle y seguimiento del envío, y posibilidad de volver a pagar un pedido pendiente o cancelado.
- Comprobante de compra enviado por correo y disponible en versión imprimible. El comprobante no es una factura fiscal.
- Factura emitida en ARCA: el administrador adjunta el PDF a un pedido y el cliente lo descarga desde el detalle.
- Botón de arrepentimiento de compra, política de privacidad, términos y condiciones, y medios de pago y envío.

**Administración**
- Alta, edición y baja de productos, con manejo de stock.
- Gestión de pedidos y envíos: transportista, número de seguimiento y factura.

## Tecnologías

| Capa | Tecnología |
|---|---|
| Frontend | Next.js 15 (App Router), JavaScript y Tailwind CSS v4 |
| Componentes | [cult-ui](https://cult-ui.com) (`TextureCard` en las tarjetas de producto) y [shadcn/ui](https://ui.shadcn.com) para el resto |
| Backend | Node.js y Express 5, API REST |
| Base de datos | PostgreSQL con Prisma 6 |
| Autenticación | JWT y bcrypt |
| Pagos | SDK oficial de Mercado Pago, Checkout Pro (modo de prueba) |
| Correo | Resend |

## Estructura del repositorio

```
/frontend    Next.js
/backend     Express: controladores, rutas y middleware
/prisma      Esquema y migraciones (compartido, fuera de /backend)
/docs        Manual de uso, anexo del brief, modelo de datos, guía de estilo y organización del trabajo
```

`backend/prisma.config.js` dirige la CLI de Prisma a `../prisma/schema.prisma`, por lo que todos los comandos `npx prisma ...` se ejecutan desde `/backend`.

## Modelo de datos

El esquema (`prisma/schema.prisma`) tiene cinco entidades principales: `Usuario`, `Producto`, `Pedido`, `PedidoItem` y `CarritoItem`, más `FacturaPedido` para el PDF de la factura. El carrito persistente (`CarritoItem`) se mantiene separado de `PedidoItem` porque representa un pedido que todavía no se confirmó.

Los modelos usan PascalCase, por convención de Prisma, y se mapean a tablas en snake_case (`usuarios`, `productos`, etc.) mediante `@@map`. El diagrama entidad-relación y los estados de un pedido están en [`docs/modelo-de-datos.md`](docs/modelo-de-datos.md); la paleta, la tipografía y el diseño responsive, en [`docs/guia-de-estilo.md`](docs/guia-de-estilo.md).

## Instalación y ejecución local

### 1. Base de datos

Crear un rol y una base en el PostgreSQL local:

```sql
CREATE ROLE altos_uco WITH LOGIN PASSWORD 'tu_clave' CREATEDB;
CREATE DATABASE altos_del_uco OWNER altos_uco;
```

### 2. Variables de entorno

Se copian las plantillas `backend/.env.example` y `frontend/.env.example` como `backend/.env` y `frontend/.env.local`. Ninguno de los dos archivos se sube al repositorio.

Backend (`backend/.env`):

| Variable | Uso |
|---|---|
| `DATABASE_URL` | Conexión a PostgreSQL. |
| `PORT` | Puerto del servidor (por defecto, 4000). |
| `JWT_SECRET` | Secreto con el que se firman los tokens. |
| `FRONTEND_URL` | Dirección pública del frontend, sin barra final. El backend solo acepta pedidos desde esa dirección y la usa en los enlaces de Mercado Pago y de los correos. |
| `BACKEND_URL` | Dirección pública del backend. Solo en producción: Mercado Pago la usa para avisar los pagos (webhook). |
| `ADMIN_EMAILS` | Correos, separados por coma, que se registran directamente como administradores. |
| `MP_ACCESS_TOKEN`, `MP_PUBLIC_KEY` | Credenciales de prueba de Mercado Pago. |
| `RESEND_API_KEY` | Clave de Resend. Sin ella no se envían correos y el enlace de recuperación se imprime en la consola del backend. |
| `RESEND_FROM_EMAIL` | Remitente de los correos, por ejemplo `Altos del Uco <correo@tudominio.com>`. |
| `EMAIL_TIENDA` | Casilla de la tienda que recibe las solicitudes de arrepentimiento (opcional). |
| `COSTO_ENVIO`, `ENVIO_GRATIS_DESDE` | Tarifa fija de envío y subtotal desde el cual el envío es gratuito, en pesos. |

Frontend (`frontend/.env.local`): `NEXT_PUBLIC_API_URL`, la dirección de la API del backend (en local, `http://localhost:4000/api`).

### 3. Instalación y migraciones

```bash
cd backend && npm install
npx prisma migrate dev   # crea las tablas
npm run prisma:seed      # carga los 8 vinos de ejemplo
```

```bash
cd frontend && npm install
```

### 4. Ejecución

```bash
cd backend && npm run dev    # http://localhost:4000
cd frontend && npm run dev   # http://localhost:3000
```

## Integraciones

### Mercado Pago (modo de prueba)

1. Ingresar en [mercadopago.com.ar/developers/panel](https://www.mercadopago.com.ar/developers/panel) con una cuenta de Mercado Pago existente; no hace falta crear una cuenta aparte.
2. Crear una aplicación, con integración «Pagos online» y producto «Checkout Pro».
3. En la pestaña «Credenciales de prueba», copiar la Public Key y el Access Token (empiezan con `TEST-`) a `backend/.env`.
4. Opcionalmente, crear una cuenta de prueba como comprador: no se puede pagar con la propia cuenta vendedora.

La integración usa Checkout Pro. El backend crea una preferencia y redirige al comprador a la página de pago de Mercado Pago, por lo que la aplicación nunca recibe ni almacena datos de tarjeta. La confirmación de un pago (`POST /api/checkout/confirmar` y el webhook) siempre revalida el estado contra la API de Mercado Pago desde el servidor antes de marcar un pedido como pagado, y nunca confía en los parámetros que vuelven por el navegador.

### Correo electrónico (Resend)

1. Crear una cuenta en [resend.com](https://resend.com).
2. En «API Keys», crear una clave y copiarla a `RESEND_API_KEY`.
3. Sin un dominio verificado, Resend solo entrega los correos a la dirección con la que se registró la cuenta. Alcanza para probar los flujos en desarrollo. Para que lleguen a cualquier usuario hay que verificar un dominio propio y usarlo en `RESEND_FROM_EMAIL`. En producción usamos `altosdeluco.com.ar`.

El sitio envía por correo la recuperación de contraseña, el comprobante de compra y las constancias de arrepentimiento. En la recuperación, `POST /api/auth/solicitar-recuperacion` genera un token aleatorio con vencimiento de una hora y envía el enlace. Responde con el mismo mensaje exista o no la cuenta, para no revelar qué correos están registrados. Luego, `POST /api/auth/resetear-contrasena` valida el token y actualiza la contraseña.

## Administración

La guía de uso completa, para clientes y administradores, está en el [manual de uso](docs/manual-de-uso.md), también [en PDF con capturas](docs/manual-de-uso.pdf). Los cambios respecto del brief de septiembre están en el [anexo del brief](docs/anexo-brief.md), también [en PDF](docs/anexo-brief.pdf).

El panel `/admin` solo está disponible para usuarios con `rol = ADMIN`. Por seguridad, la aplicación no permite que un usuario se promueva a sí mismo. Hay tres formas de crear un administrador.

- Desde el panel, en `/admin/usuarios`: un administrador ve las cuentas registradas y da o quita el rol de administrador a otra cuenta. No puede cambiar su propio rol, para que la tienda nunca se quede sin administradores.
- Definir `ADMIN_EMAILS` en `backend/.env`: quien se registre con uno de esos correos queda como administrador. Solo se aplica al registrarse, no a cuentas que ya existen.
- Modificar el rol directamente en la base, con Prisma Studio (`npm run prisma:studio` desde `/backend`) o con SQL:

```sql
UPDATE usuarios SET rol = 'ADMIN' WHERE email = 'tu-email@ejemplo.com';
```

Con cualquiera de las tres formas, la persona tiene que volver a iniciar sesión para que la interfaz le muestre el panel.

Desde el panel se pueden crear, editar y borrar productos, con su stock. En `/admin/pedidos` se ven todos los pedidos con su dirección de envío. Para los pedidos pagados, el administrador carga el transportista y el número de seguimiento y los marca como enviados; el cliente ve esos datos en el detalle de su pedido. En los pedidos pagados o enviados también puede adjuntar el PDF de la factura emitida en ARCA (hasta 2 MB), que el cliente descarga desde el detalle. La carga es manual: el sitio no se conecta con ARCA.

El costo de envío es una tarifa fija (`COSTO_ENVIO`) con envío gratuito a partir de cierto subtotal (`ENVIO_GRATIS_DESDE`). Se cobra como un ítem separado en la preferencia de Mercado Pago y se guarda en `Pedido.costoEnvio`, para mostrar el desglose entre subtotal, envío y total en el carrito y en el historial.

## Despliegue

Cada servicio cumple una función distinta:

| Servicio | Qué hace | En este proyecto |
|---|---|---|
| NIC Argentina | Registro oficial de los dominios `.ar`. | Registra `altosdeluco.com.ar` e indica que su administración está en Cloudflare. |
| Cloudflare | Administra el DNS (la «agenda» que indica a qué servidor corresponde cada nombre), las redirecciones y el reenvío de correo. | `www.altosdeluco.com.ar` apunta a Vercel y `altosdeluco.com.ar` redirige a `www`. Los correos que llegan a `vinoteca@altosdeluco.com.ar` se reenvían a la casilla del equipo, y los registros que verifican el dominio en Resend están cargados ahí. |
| Vercel | Aloja el frontend y lo publica con HTTPS. | Despliegue automático al integrar a `main`. |
| Render | Ejecuta el backend. | Despliegue automático al integrar a `main`. Comando de compilación: `npm install && npx prisma generate && npx prisma migrate deploy`, por lo que las migraciones se aplican en cada despliegue. |
| Neon | Base de datos PostgreSQL administrada en la nube. | Base de datos de producción. |
| Resend | Envío de correos transaccionales. | Comprobante, recuperación de contraseña y arrepentimiento, desde `vinoteca@altosdeluco.com.ar`, con el dominio verificado. |
| Mercado Pago | Pasarela de pagos. | Checkout Pro, en modo de prueba. |

Quien escribe `www.altosdeluco.com.ar` llega por Cloudflare a Vercel; la página le pide los datos a la API en Render, y Render los consulta en Neon.

El backend corre en el plan gratuito de Render, que lo suspende tras un período sin uso: la primera solicitud puede demorar cerca de un minuto. Conviene consultar `/api/health` antes de una demostración. Cada sprint cerrado tiene su [release](https://github.com/HotCode2025/Codigo-Critico-Proyecto-Integrador-Ecommerce-Cuarto-Semestre/releases) en GitHub.

## Equipo y organización del trabajo

Somos el grupo Código Crítico, de Programación IV. El proyecto se organiza en módulos, cada uno a cargo de un integrante, con sus tareas registradas como issues en el [tablero del proyecto](https://github.com/orgs/HotCode2025/projects/149). Trabajamos con un marco Scrum de tres sprints, del 22/10 al 04/11, y la presentación es el 05/11. El detalle de roles, sprints, etiquetas y definición de «Hecho» está en [`docs/organizacion-scrum.md`](docs/organizacion-scrum.md).

| N.º | Módulo | Responsable | Issues |
|---|---|---|---|
| 1 | Base: estructura, modelo de datos, diseño y documentación | Mazara Ariel | ALT-01 a 05, ALT-39, ALT-40 y ALT-41 |
| 2 | Autenticación y recuperación de contraseña | Foglia Maximiliano | ALT-06 a 11 |
| 3 | Catálogo y ficha de producto | Zuniga Agustina | ALT-12 a 15 |
| 4 | Carrito y checkout con Mercado Pago | Gonzalez Joel | ALT-16 a 23 |
| 5 | Panel de administración de productos | Mamani Santino | ALT-24 a 27 |
| 6 | Pedidos y envíos | Silva Daniel | ALT-28 a 33 |
| — | QA, despliegue, credenciales y ensayo final | Todo el equipo (infraestructura de despliegue: Mazara Ariel) | ALT-34 a 38 |
| — | Mejoras y correcciones surgidas del QA: pago del carrito, stock, footer, comprobante, factura de ARCA, pago de pedidos cancelados, ajustes de interfaz, gestión de administradores desde el panel y documentación final | Mazara Ariel | ALT-42 a ALT-54 |

Los módulos se integran en orden, del 1 al 6, porque cada uno utiliza código de los anteriores.

### Flujo de trabajo con Git

1. Partir de `main` actualizado: `git checkout main && git pull`.
2. Crear una rama propia desde `main` (por ejemplo, `feature/catalogo`) y trabajar en ella. Nadie sube directamente a `main`.
3. Confirmar los cambios con el usuario de GitHub propio, con mensajes que indiquen qué se hizo y terminen en `Refs #n`, el número del issue.
4. Abrir un Pull Request hacia `main` con `Closes #n` en la descripción: al integrarlo, el issue se cierra solo y la tarjeta pasa a «Hecho».
5. Otro integrante revisa y aprueba el Pull Request antes de integrarlo. Se usa «Create a merge commit» o «Rebase and merge», nunca «Squash».
6. No se suben archivos `.env` ni claves: se usan las plantillas `backend/.env.example` y `frontend/.env.example`.

La rama `main` está protegida: exige un Pull Request con una aprobación y no admite `force push` ni su eliminación. Un issue se considera terminado cuando está probado manualmente, su Pull Request fue revisado e integrado, y su autor puede explicarlo en la defensa.

## Decisiones técnicas

- **Node 18.** El entorno de desarrollo usa Node 18.19.1, mientras que las últimas versiones de varias herramientas (Next.js 16, Prisma 7, la CLI de shadcn) exigen Node 20 o superior. Por eso fijamos versiones compatibles: Next.js 15, Prisma 6 y shadcn CLI 3.8.5.
- **JavaScript en el frontend.** El proyecto comenzó en TypeScript y lo migramos por completo a JavaScript (`.js` y `.jsx`, sin `tsconfig.json` ni paquetes `@types/*`) para mantener coherencia con el backend. El alias `@/*` se resuelve con `jsconfig.json`.
- **Ruta de salida explícita del cliente de Prisma.** Como `schema.prisma` está en `/prisma`, fuera de `/backend`, el generador resolvía de forma ambigua dónde escribir el cliente: en Render lo dejaba en un `node_modules` distinto del que usa el servidor, y el cliente quedaba desactualizado en cada despliegue aunque `prisma generate` no fallara. Fijamos `output = "../backend/generated/prisma-client"` en el generador, y `backend/src/lib/prisma.js` importa desde esa ruta en lugar de `@prisma/client`.
- **cult-ui.** Su CLI queda detrás de un control anti-bot de Vercel que bloquea con un error 429 a los clientes que no son navegadores. Instalamos el componente `TextureCard` copiando su código fuente desde el navegador, la vía de «instalación manual» que cult-ui documenta como alternativa.
- **Precios con `Decimal`.** Usamos el tipo `Decimal` de Prisma, y no `Float`, para evitar errores de redondeo con dinero.
- **Compensación en el checkout.** Si la creación de la preferencia en Mercado Pago falla, se elimina el pedido recién creado, para no dejar al usuario con un pedido fantasma y el carrito vacío.
- **Confirmación de pagos sin duplicados.** El aviso de Mercado Pago y la confirmación del navegador pueden llegar casi a la vez. El cambio de estado del pedido es atómico, de modo que solo una de las dos llamadas descuenta el stock y envía el comprobante. Un pago aprobado también reactiva un pedido que ya figuraba como cancelado, por ejemplo si el cliente pagó en una pestaña de pago que había dejado abierta.
- **Factura en una tabla aparte.** El PDF de la factura se guarda en `facturas_pedido` y no como columna de `pedidos`, para que no viaje dentro de cada listado de pedidos.
- **Fotos del encabezado.** No contamos con fotografía propia de la bodega, por lo que usamos fotos de stock de licencia gratuita de [Pexels](https://www.pexels.com/license/) (uso comercial permitido, sin atribución obligatoria): `frontend/public/hero/valle-de-uco-andes.jpg` (Mariana La Regina) y `frontend/public/hero/barricas-bodega.jpg` (Lisa Dol). Para un proyecto real habría que reemplazarlas por fotos propias.
- **Fotos de producto.** Cada uno de los 8 vinos tiene su propia foto de botella con etiqueta (nombre, varietal y añada del producto), generada con IA (Gemini) y recortada en formato vertical para el catálogo. El varietal y la añada de dos productos (Corazón de Piedra y Trece Hileras) se ajustaron para coincidir con lo impreso en la etiqueta. El selector de fotos del panel de administración ofrece además cinco fotos de stock de Pexels con etiqueta en blanco (Christopher Welsch Leveroni), para productos nuevos que aún no tengan etiqueta propia.

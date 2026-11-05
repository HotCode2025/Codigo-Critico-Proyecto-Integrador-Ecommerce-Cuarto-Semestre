# Manual de uso — Altos del Uco

Altos del Uco es una tienda en línea de vinos de bodegas boutique del Valle de Uco, Mendoza. Este manual explica cómo usarla, primero como **cliente** y después como **administrador**.

**Dirección del sitio:** https://www.altosdeluco.com.ar

**Versión con capturas de pantalla:** [manual-de-uso.pdf](manual-de-uso.pdf). Las imágenes usan datos de ejemplo (nombres, correos y pedidos ficticios) y las pantallas de Mercado Pago son del entorno de pruebas.

> **Aviso para quien prueba el sitio.** Los pagos usan el entorno de pruebas de Mercado Pago: no se cobra dinero real. Para pagar se usan las tarjetas y la cuenta de prueba que da Mercado Pago. No hay que ingresar datos de una tarjeta real.

---

## 1. Para el cliente

### 1.1 Crear una cuenta

1. Entrá a la tienda y tocá **Crear cuenta** (en la portada) o **Iniciar sesión** en el menú y después el enlace de registro.
2. Completá nombre, correo, contraseña (mínimo 6 caracteres) y fecha de nacimiento.
3. La venta es **solo para mayores de 18 años**: si la fecha indica que sos menor, el sitio no te deja registrarte.
4. Al terminar, el sitio te lleva a la portada y el menú muestra «Hola» con tu nombre.

### 1.2 Iniciar y cerrar sesión

- **Iniciar sesión:** correo y contraseña en la pantalla de acceso.
- **Cerrar sesión:** botón **Cerrar sesión**, arriba a la derecha.

### 1.3 Recuperar la contraseña

1. En la pantalla de acceso tocá **¿Olvidaste tu contraseña?**
2. Escribí el correo con el que te registraste. Te llega un mail con un enlace.
3. Abrí el enlace y elegí una contraseña nueva. **El enlace sirve una sola vez**: si lo usás de nuevo, el sitio avisa que ya no es válido.

### 1.4 Ver el catálogo

1. Tocá **Ver catálogo** en la portada.
2. Cada vino aparece en una tarjeta con su foto, nombre, varietal, añada, bodega, región y precio.
3. Para acotar la lista usá los filtros: **Varietal**, **Bodega**, **Añada**, **Precio mín.** y **Precio máx.** Se pueden combinar, y **Limpiar filtros** los borra. Cada tarjeta indica si el vino está «En stock» o «Sin stock»; un vino sin stock no se puede agregar al carrito.
4. Tocá un vino para ver su ficha: descripción, notas de cata y maridaje.

### 1.5 Comprar

1. En la ficha del vino tocá **Agregar al carrito**. Tenés que haber iniciado sesión.
2. Abrí **Carrito** en el menú. Ahí podés cambiar las cantidades o quitar productos. El carrito se guarda en tu cuenta: está igual si cerrás sesión y volvés.
3. Completá la **dirección de envío**: calle y número, ciudad, provincia y código postal.
4. Revisá el resumen: **subtotal**, **envío** y **total**.
   - El envío cuesta **$3.000**.
   - El envío es **gratis desde $50.000** de compra.
5. Tocá **Finalizar compra**. El sitio te lleva a Mercado Pago.
6. En Mercado Pago elegí el medio de pago y completá el pago.
7. Al terminar, Mercado Pago te devuelve a la tienda y una pantalla te dice si el pago se aprobó, quedó pendiente o fue rechazado.

El pago lo procesa Mercado Pago: **los datos de tu tarjeta nunca pasan por la tienda ni se guardan en ella.**

### 1.6 Después de pagar

- **Mail de comprobante.** Cuando se aprueba el pago te llega un correo con el detalle de la compra, la dirección de envío y un enlace a **Mis pedidos**. El comprobante **no es una factura fiscal**: es la constancia de tu compra.
- **Mis pedidos.** En el menú, **Mis pedidos** muestra todos tus pedidos con su estado:

| Estado | Qué significa |
|---|---|
| Pendiente de pago | El pedido se creó pero todavía no se pagó. |
| Pagado | El pago se aprobó. La tienda prepara el envío. |
| Enviado | El pedido salió. Se ve el transportista y el número de seguimiento. |
| Cancelado | El pago se rechazó o no se completó, o el pedido se reemplazó por uno nuevo con **Volver a comprar**. |

- **Detalle de un pedido.** Al abrir un pedido ves los productos, el subtotal, el envío, el total, la dirección y el seguimiento del envío.
- **Comprobante imprimible.** Desde el detalle, **Ver comprobante de compra** abre una versión para imprimir o guardar como PDF.
- **Factura.** Si la tienda cargó la factura de ese pedido, aparece **Descargar factura (PDF)**. Se carga a mano cuando el comercio la emite: el sitio no emite facturas por su cuenta.

### 1.7 Pagar de nuevo un pedido pendiente o cancelado

Si el pago no se completó, abrí el pedido en **Mis pedidos** y tocá **Volver a comprar**. El sitio **crea un pedido nuevo** con los mismos productos y la misma dirección de envío, pasa el pedido anterior a «Cancelado» y te lleva a Mercado Pago para pagar el nuevo. Si el pago se aprueba, el pedido nuevo pasa a «Pagado». Si algún producto ya no tiene stock suficiente, el sitio lo avisa y no crea el pedido nuevo.

### 1.8 Arrepentimiento de compra

Podés arrepentirte de una compra desde **Arrepentimiento de compra**, en el pie de página. Tenés **10 días corridos desde que recibís el producto**, sin necesidad de explicar el motivo. Completás el **número de pedido** (lo encontrás en **Mis pedidos**), el **correo** con el que compraste y, si querés, el **motivo** (es opcional). La tienda recibe la solicitud por mail y vos recibís una copia.

### 1.9 Información y contacto

En el pie de página están la **política de privacidad**, los **términos y condiciones**, los **medios de pago y envío** y el correo de atención: **vinoteca@altosdeluco.com.ar**.

---

## 2. Para el administrador

El menú del administrador incluye **Panel admin**. Solo lo ven las cuentas con rol de administrador, y el servidor rechaza cualquier acción de administración que no venga de una de ellas.

### 2.1 Productos

En **Panel admin** se ve la lista de productos con su stock.

- **Nuevo producto:** completá nombre, bodega, varietal, región, añada, precio y stock. La descripción, las notas de cata y el maridaje son opcionales.
- **Editar:** cambia cualquier dato, incluido el stock.
- **Borrar:** pide confirmación antes de quitar el producto.

### 2.2 Pedidos y envíos

En **Panel admin → Ver pedidos y envíos** aparecen todos los pedidos con la dirección de envío. Se pueden filtrar por estado.

- **Marcar como enviado:** en un pedido pagado, cargá el **transportista** (por ejemplo Andreani o Correo Argentino) y el **número de seguimiento**. El pedido pasa a «Enviado» y el cliente ve esos datos. Para corregirlos, usá **Actualizar seguimiento**.
- **Adjuntar la factura:** en un pedido pagado o enviado, elegí el **PDF de la factura** emitida en ARCA (hasta 2 MB) y subilo. El cliente la descarga desde su pedido. Si subís otro PDF, **reemplaza** al anterior.

### 2.3 Usuarios y administradores

En **Panel admin → Usuarios** se ven todas las cuentas registradas.

- Buscá por nombre o correo.
- **Hacer administrador** da el rol a una cuenta. **Quitar rol de administrador** lo retira. Siempre pide confirmación.
- No podés cambiar tu propio rol, para que la tienda nunca se quede sin administradores.
- La persona tiene que **volver a iniciar sesión** para ver el panel.
- Para alguien que todavía no se registró, el correo se agrega en la variable `ADMIN_EMAILS` del servidor: cuando se registre con ese correo, queda como administrador.

---

## 3. Preguntas frecuentes

**El sitio tarda en responder la primera vez.** El servidor gratuito se «duerme» cuando no se usa. Esperá hasta un minuto y recargá.

**No me llegó el mail.** Revisá la carpeta de spam. Los correos salen de `vinoteca@altosdeluco.com.ar`.

**Me aparece un pedido en «Cancelado» pero quiero comprarlo igual.** Abrilo desde **Mis pedidos** y tocá **Volver a comprar**: se crea un pedido nuevo con los mismos productos.

**¿Se descuenta el stock al agregar al carrito?** No: se descuenta cuando el pago se aprueba, y una sola vez por compra.

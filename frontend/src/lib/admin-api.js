const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

function headersAuth(token) {
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}

async function procesarRespuesta(res) {
  const datos = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(datos.error || "Ocurrió un error");
  return datos;
}

export async function listarProductosAdmin(token) {
  const res = await fetch(`${API_URL}/admin/productos`, { headers: headersAuth(token) });
  return procesarRespuesta(res);
}

export async function crearProducto(token, datos) {
  const res = await fetch(`${API_URL}/admin/productos`, {
    method: "POST",
    headers: headersAuth(token),
    body: JSON.stringify(datos),
  });
  return procesarRespuesta(res);
}

export async function actualizarProducto(token, id, datos) {
  const res = await fetch(`${API_URL}/admin/productos/${id}`, {
    method: "PUT",
    headers: headersAuth(token),
    body: JSON.stringify(datos),
  });
  return procesarRespuesta(res);
}

export async function eliminarProducto(token, id) {
  const res = await fetch(`${API_URL}/admin/productos/${id}`, {
    method: "DELETE",
    headers: headersAuth(token),
  });
  if (!res.ok) await procesarRespuesta(res);
}

export async function listarPedidosAdmin(token, estado) {
  const query = estado ? `?estado=${estado}` : "";
  const res = await fetch(`${API_URL}/pedidos/admin/todos${query}`, { headers: headersAuth(token) });
  return procesarRespuesta(res);
}

export async function marcarPedidoEnviado(token, id, datos) {
  const res = await fetch(`${API_URL}/pedidos/admin/${id}/enviar`, {
    method: "PATCH",
    headers: headersAuth(token),
    body: JSON.stringify(datos),
  });
  return procesarRespuesta(res);
}

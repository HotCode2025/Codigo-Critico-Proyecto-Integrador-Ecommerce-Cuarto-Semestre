const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

async function procesarRespuesta(res) {
  const datos = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(datos.error || "Ocurrió un error");
  return datos;
}

export async function registrarUsuario(datos) {
  const res = await fetch(`${API_URL}/auth/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  return procesarRespuesta(res);
}

export async function iniciarSesion(datos) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  return procesarRespuesta(res);
}

function headersAuth(token) {
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}

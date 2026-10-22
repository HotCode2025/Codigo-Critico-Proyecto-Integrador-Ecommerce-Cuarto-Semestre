const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

async function procesarRespuesta(res) {
  const datos = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(datos.error || "Ocurrió un error");
  return datos;
}

function headersAuth(token) {
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}

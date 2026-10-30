import { obtenerConfigCheckout } from "@/lib/api";

const SDK_URL = "https://sdk.mercadopago.com/js/v2";

let sdkPromise = null;
let publicKeyPromise = null;

function cargarSdk() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("El SDK de Mercado Pago sólo funciona en el navegador"));
  }
  if (window.MercadoPago) return Promise.resolve();
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SDK_URL;
    script.onload = () => resolve();
    script.onerror = () => {
      sdkPromise = null;
      reject(new Error("No se pudo cargar el SDK de Mercado Pago"));
    };
    document.head.appendChild(script);
  });
  return sdkPromise;
}

function obtenerPublicKey() {
  if (!publicKeyPromise) {
    publicKeyPromise = obtenerConfigCheckout()
      .then(({ publicKey }) => {
        if (!publicKey) throw new Error("Falta configurar MP_PUBLIC_KEY en el backend");
        return publicKey;
      })
      .catch((err) => {
        publicKeyPromise = null;
        throw err;
      });
  }
  return publicKeyPromise;
}

// Abre el Checkout Pro de Mercado Pago como modal encima de la página actual,
// sin redireccionar. Al terminar (o cancelar) el pago, Mercado Pago manda la
// pestaña a las back_urls del backend (/checkout/resultado), así que el flujo
// de confirmación posterior no cambia.
export async function abrirCheckoutMercadoPago(preferenceId) {
  const [, publicKey] = await Promise.all([cargarSdk(), obtenerPublicKey()]);
  const mp = new window.MercadoPago(publicKey, { locale: "es-AR" });
  mp.checkout({ preference: { id: preferenceId }, autoOpen: true });
}

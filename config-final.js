window.ORDER_API_URL = "https://elbambinodaniel-pedidos.onrender.com";
window.EL_BAMBINO_WHATSAPP = "";

/* Actualización visible del aviso de entrega */
(function () {
  const NUEVO_AVISO_HTML = `
    <strong>Precio estimado</strong><br>
    El importe final se confirma cuando el pedido es preparado en el almacén.<br><br>
    <strong>Entrega a domicilio sin costo en pedidos desde $1,000.00 en la Zona Metropolitana y desde $1,200.00 en envíos foráneos.</strong><br><br>
    En pedidos de menor importe se aplicará un cargo de entrega de <strong>$250.00</strong>.
  `;

  const TEXTOS_ANTERIORES = [
    "El importe final se confirma cuando el producto llega desde almacén.",
    "El precio final puede variar y se confirma al recibir el producto desde almacén.",
    "El precio final se confirma cuando el producto llega a nuestras instalaciones desde el almacén."
  ];

  function actualizarAvisos() {
    const candidatos = document.querySelectorAll(
      "div, p, section, aside, span, small"
    );

    candidatos.forEach((elemento) => {
      const texto = (elemento.textContent || "").replace(/\s+/g, " ").trim();

      if (
        TEXTOS_ANTERIORES.some((anterior) => texto.includes(anterior)) ||
        (
          texto.includes("Precio estimado") &&
          texto.includes("producto llega desde almacén")
        )
      ) {
        const contenedor =
          elemento.closest(".final-price-notice, .price-notice, .notice, .alert") ||
          elemento;

        contenedor.innerHTML = NUEVO_AVISO_HTML;
        contenedor.setAttribute("data-aviso-entrega-actualizado", "si");
      }
    });
  }

  function iniciar() {
    actualizarAvisos();

    const observador = new MutationObserver(actualizarAvisos);
    observador.observe(document.documentElement, {
      childList: true,
      subtree: true
    });

    [250, 750, 1500, 3000, 5000].forEach((tiempo) => {
      setTimeout(actualizarAvisos, tiempo);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar, { once: true });
  } else {
    iniciar();
  }
})();

window.ORDER_API_URL = "https://elbambinodaniel-pedidos.onrender.com";
window.EL_BAMBINO_WHATSAPP = "";

/*
  Corrección segura del aviso de entrega.
  Esta versión NO reemplaza contenedores ni el carrito.
  Solo cambia el texto exacto del aviso anterior.
*/
(function () {
  const oldTexts = [
    "El importe final se confirma cuando el producto llega desde almacén.",
    "El importe final se confirma cuando el producto llega desde el almacén.",
    "El precio final puede variar y se confirma al recibir el producto desde almacén.",
    "El precio final se confirma cuando el producto llega a nuestras instalaciones desde el almacén."
  ];

  const newText =
    "El importe final se confirma cuando el pedido es preparado en el almacén. " +
    "Entrega a domicilio sin costo en pedidos desde $1,000.00 en la Zona Metropolitana " +
    "y desde $1,200.00 en envíos foráneos. " +
    "En pedidos de menor importe se aplicará un cargo de entrega de $250.00.";

  function normalize(value) {
    return String(value || "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function replaceExactTextNodes() {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT
    );

    const textNodes = [];
    let node;

    while ((node = walker.nextNode())) {
      textNodes.push(node);
    }

    textNodes.forEach((textNode) => {
      const current = normalize(textNode.nodeValue);

      for (const oldText of oldTexts) {
        if (current === oldText || current.includes(oldText)) {
          textNode.nodeValue = textNode.nodeValue.replace(oldText, newText);
          break;
        }
      }
    });
  }

  function start() {
    replaceExactTextNodes();

    const observer = new MutationObserver(() => {
      replaceExactTextNodes();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });

    [300, 800, 1500, 3000].forEach((delay) => {
      setTimeout(replaceExactTextNodes, delay);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();

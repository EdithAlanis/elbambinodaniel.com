import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import PDFDocument from "pdfkit";
import FormData from "form-data";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3000);
const ORIGIN = process.env.FRONTEND_ORIGIN || "https://elbambinodaniel.com";

app.use(cors({ origin: ORIGIN }));
app.use(express.json({ limit: "1mb" }));

function validateOrder(order) {
  const required = ["folio", "fecha", "cliente", "productos", "subtotalEstimado"];
  for (const key of required) {
    if (order?.[key] === undefined || order?.[key] === null) {
      throw new Error(`Falta el campo obligatorio: ${key}`);
    }
  }
  if (!Array.isArray(order.productos) || order.productos.length === 0) {
    throw new Error("El pedido no contiene productos.");
  }
}

function createPdfBuffer(order) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 45 });
    const chunks = [];
    doc.on("data", chunk => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.fontSize(20).text("EL BAMBINO DANIEL", { align: "center" });
    doc.fontSize(11).text("Pedido generado desde elbambinodaniel.com", { align: "center" });
    doc.moveDown();

    const line = (label, value) => {
      doc.font("Helvetica-Bold").text(`${label}: `, { continued: true });
      doc.font("Helvetica").text(String(value ?? ""));
    };

    line("Folio", order.folio);
    line("Fecha", new Date(order.fecha).toLocaleString("es-MX"));
    line("Cliente", order.cliente.nombre);
    line("Teléfono", order.cliente.telefono);
    line("Domicilio", order.cliente.domicilio);
    line("Colonia", order.cliente.colonia);
    line("Ciudad", `${order.cliente.ciudad}, ${order.cliente.estado}, C.P. ${order.cliente.cp}`);
    line("Horario", order.cliente.horario);
    line("Cierra al mediodía", order.cliente.cierra);
    line("Forma de pago", order.cliente.pago);
    line("Observaciones", order.cliente.observaciones || "Sin observaciones");

    doc.moveDown();
    doc.font("Helvetica-Bold").fontSize(13).text("Productos");
    doc.moveDown(0.4);

    order.productos.forEach((p, index) => {
      const importe = Number(p.precioEstimado) * Number(p.cantidad);
      doc.font("Helvetica").fontSize(10).text(
        `${index + 1}. ${p.nombre} | Cantidad: ${p.cantidad} | Precio estimado: $${Number(p.precioEstimado).toFixed(2)} | Importe: $${importe.toFixed(2)}`
      );
      doc.moveDown(0.35);
    });

    doc.moveDown();
    doc.font("Helvetica-Bold").fontSize(14)
      .text(`Total estimado: $${Number(order.subtotalEstimado).toFixed(2)}`);
    doc.moveDown();
    doc.font("Helvetica").fontSize(9).text(order.avisoPrecio || "");

    doc.end();
  });
}

async function uploadPdfToWhatsApp(pdfBuffer, filename) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const apiVersion = process.env.WHATSAPP_API_VERSION || "v22.0";

  if (!token || !phoneNumberId) {
    throw new Error("Faltan credenciales privadas de WhatsApp.");
  }

  const form = new FormData();
  form.append("messaging_product", "whatsapp");
  form.append("type", "application/pdf");
  form.append("file", pdfBuffer, { filename, contentType: "application/pdf" });

  const response = await fetch(
    `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/media`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, ...form.getHeaders() },
      body: form
    }
  );

  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message || "No se pudo cargar el PDF.");
  return data.id;
}

async function sendDocument(mediaId, order) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const apiVersion = process.env.WHATSAPP_API_VERSION || "v22.0";
  const recipient = process.env.ORDER_RECIPIENT_PHONE;

  if (!recipient) throw new Error("Falta el número receptor de pedidos.");

  const response = await fetch(
    `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: recipient,
        type: "document",
        document: {
          id: mediaId,
          filename: `${order.folio}.pdf`,
          caption: `Nuevo pedido ${order.folio} de ${order.cliente.nombre}`
        }
      })
    }
  );

  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message || "No se pudo enviar el PDF por WhatsApp.");
  return data;
}

app.get("/health", (_req, res) => res.json({ ok: true }));

app.post("/api/orders", async (req, res) => {
  try {
    const order = req.body;
    validateOrder(order);
    const pdf = await createPdfBuffer(order);
    const mediaId = await uploadPdfToWhatsApp(pdf, `${order.folio}.pdf`);
    const result = await sendDocument(mediaId, order);
    res.json({ sent: true, folio: order.folio, messageId: result?.messages?.[0]?.id || null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ sent: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor de pedidos activo en el puerto ${PORT}`);
});

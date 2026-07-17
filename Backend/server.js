const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const path = require("path");

const app = express();

const PORT = Number(process.env.PORT || 10000);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || process.env.ADMIN_PIN || "2222";
const JWT_SECRET = process.env.JWT_SECRET || "CAMBIA_ESTA_CLAVE_EN_RENDER";

const ALLOWED_ORIGINS = (
  process.env.ALLOWED_ORIGINS ||
  process.env.ALLOWED_ORIGIN ||
  "https://elbambinodaniel.com,https://www.elbambinodaniel.com"
)
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

if (!process.env.DATABASE_URL) {
  console.error("Falta DATABASE_URL. Conecta PostgreSQL en Render.");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes("localhost")
    ? false
    : { rejectUnauthorized: false }
});

app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origen no permitido"));
    },
    methods: ["GET", "POST", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(express.static(path.join(__dirname, "public")));

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id BIGSERIAL PRIMARY KEY,
      order_number TEXT UNIQUE NOT NULL,
      customer_name TEXT NOT NULL,
      phone TEXT DEFAULT '',
      address TEXT NOT NULL,
      neighborhood TEXT DEFAULT '',
      city TEXT DEFAULT '',
      state TEXT DEFAULT '',
      business_hours TEXT DEFAULT '',
      closes_midday BOOLEAN DEFAULT FALSE,
      payment_method TEXT DEFAULT 'Pagar al recibir',
      items JSONB NOT NULL,
      total NUMERIC(12,2) NOT NULL DEFAULT 0,
      notes TEXT DEFAULT '',
      status TEXT NOT NULL DEFAULT 'pendiente',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      attended_at TIMESTAMPTZ
    );
  `);
}

function createOrderNumber() {
  const now = new Date();
  const datePart = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0")
  ].join("");
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `EBD-${datePart}-${randomPart}`;
}

function requireAdmin(req, res, next) {
  const authorization = req.headers.authorization || "";
  const token = authorization.startsWith("Bearer ")
    ? authorization.slice(7)
    : "";

  try {
    req.admin = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ ok: false, error: "Acceso no autorizado" });
  }
}

async function sendWhatsAppNotification(order) {
  const token = process.env.WHATSAPP_TOKEN || process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const adminPhone = process.env.ADMIN_WHATSAPP || process.env.ORDER_RECIPIENT_PHONE;

  if (!token || !phoneNumberId || !adminPhone) {
    console.error(
      "WhatsApp no configurado. Revisa WHATSAPP_TOKEN, " +
      "WHATSAPP_PHONE_NUMBER_ID y ADMIN_WHATSAPP en Render."
    );
    return;
  }

  const recipient = String(adminPhone).replace(/\D/g, "");
  const message =
    `Tienes el pedido ${order.order_number} en elbambinodaniel.com. ` +
    "Ingresa al panel privado para revisarlo.";

  console.log(`Intentando enviar WhatsApp del pedido ${order.order_number}...`);

  const response = await fetch(
    `https://graph.facebook.com/v23.0/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: recipient,
        type: "text",
        text: {
          preview_url: false,
          body: message
        }
      })
    }
  );

  const detail = await response.text();

  if (!response.ok) {
    console.error(
      `No se pudo enviar WhatsApp para ${order.order_number}. ` +
      `HTTP ${response.status}: ${detail}`
    );
    return;
  }

  console.log(
    `WhatsApp enviado correctamente para ${order.order_number}: ${detail}`
  );
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "elbambinodaniel-pedidos" });
});

app.get("/api/salud", (_req, res) => {
  res.json({ ok: true, servicio: "elbambinodaniel-pedidos" });
});

app.post("/api/admin/login", (req, res) => {
  const password = String(
    req.body?.password ??
    req.body?.pin ??
    req.body?.clave ??
    ""
  );

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ ok: false, error: "Clave incorrecta" });
  }

  const token = jwt.sign({ role: "admin" }, JWT_SECRET, {
    expiresIn: "12h"
  });

  res.json({ ok: true, token });
});

app.post("/api/orders", async (req, res) => {
  try {
    const body = req.body || {};
    const customerName = String(body.customerName || body.nombre || "").trim();
    const address = String(body.address || body.domicilio || body.ubicacion || "").trim();
    const items = Array.isArray(body.items || body.productos)
      ? (body.items || body.productos)
      : [];

    if (!customerName || !address || items.length === 0) {
      return res.status(400).json({
        ok: false,
        error: "Faltan nombre, domicilio o productos."
      });
    }

    const total = Number(body.total || 0);
    const orderNumber = createOrderNumber();

    const values = [
      orderNumber,
      customerName,
      String(body.phone || body.telefono || ""),
      address,
      String(body.neighborhood || body.colonia || ""),
      String(body.city || body.ciudad || ""),
      String(body.state || body.estado || ""),
      String(body.businessHours || body.horario || ""),
      Boolean(body.closesMidday || body.cierraMediodia),
      String(body.paymentMethod || body.formaPago || "Pagar al recibir"),
      JSON.stringify(items),
      Number.isFinite(total) ? total : 0,
      String(body.notes || body.notas || "")
    ];

    const result = await pool.query(
      `INSERT INTO orders (
        order_number, customer_name, phone, address, neighborhood,
        city, state, business_hours, closes_midday, payment_method,
        items, total, notes
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11::jsonb,$12,$13
      ) RETURNING *`,
      values
    );

    const order = result.rows[0];

    sendWhatsAppNotification(order).catch((error) => {
      console.error(
        `Error inesperado al enviar WhatsApp para ${order.order_number}:`,
        error
      );
    });

    res.status(201).json({
      ok: true,
      orderNumber: order.order_number,
      message: `Pedido ${order.order_number} recibido correctamente.`
    });
  } catch (error) {
    console.error("Error al guardar pedido:", error);
    res.status(500).json({
      ok: false,
      error: "No fue posible guardar el pedido."
    });
  }
});

app.get("/api/admin/orders", requireAdmin, async (req, res) => {
  try {
    const requestedStatus = String(req.query.status || "pendiente");
    const statusMap = {
      pending: "pendiente",
      attended: "atendido",
      all: "todos",
      pendiente: "pendiente",
      atendido: "atendido",
      todos: "todos"
    };

    const status = statusMap[requestedStatus];

    if (!status) {
      return res.status(400).json({ ok: false, error: "Estado inválido" });
    }

    const result = status === "todos"
      ? await pool.query("SELECT * FROM orders ORDER BY created_at DESC")
      : await pool.query(
          "SELECT * FROM orders WHERE status=$1 ORDER BY created_at DESC",
          [status]
        );

    res.json({ ok: true, orders: result.rows });
  } catch (error) {
    console.error("Error al consultar pedidos:", error);
    res.status(500).json({
      ok: false,
      error: "No fue posible consultar pedidos."
    });
  }
});

app.patch("/api/admin/orders/:id/attend", requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      `UPDATE orders
       SET status='atendido', attended_at=NOW()
       WHERE id=$1
       RETURNING *`,
      [req.params.id]
    );

    if (!result.rowCount) {
      return res.status(404).json({ ok: false, error: "Pedido no encontrado" });
    }

    res.json({ ok: true, order: result.rows[0] });
  } catch (error) {
    console.error("Error al atender pedido:", error);
    res.status(500).json({
      ok: false,
      error: "No fue posible actualizar el pedido."
    });
  }
});

app.patch("/api/admin/orders/:id/reopen", requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      `UPDATE orders
       SET status='pendiente', attended_at=NULL
       WHERE id=$1
       RETURNING *`,
      [req.params.id]
    );

    if (!result.rowCount) {
      return res.status(404).json({ ok: false, error: "Pedido no encontrado" });
    }

    res.json({ ok: true, order: result.rows[0] });
  } catch (error) {
    console.error("Error al reabrir pedido:", error);
    res.status(500).json({
      ok: false,
      error: "No fue posible actualizar el pedido."
    });
  }
});

app.get("/admin", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

initDb()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Servidor activo en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al iniciar la base de datos:", error);
    process.exit(1);
  });

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = Number(process.env.PORT || 10000);
const ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD ||
  process.env.ADMIN_PIN ||
  "2222";
const JWT_SECRET =
  process.env.JWT_SECRET ||
  "CAMBIA_ESTA_CLAVE_EN_RENDER";

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
app.use(cors({
  origin(origin, callback) {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Origen no permitido"));
  },
  methods: ["GET", "POST", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
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


function formatMoney(value) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN"
  }).format(Number(value || 0));
}

function formatOrderItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return "Sin productos";
  }

  return items
    .map((item, index) => {
      const name =
        item.name ||
        item.nombre ||
        item.product ||
        item.producto ||
        "Producto";
      const quantity = Number(item.quantity || item.cantidad || 1);
      const price = Number(item.price || item.precio || 0);
      const subtotal = Number(
        item.subtotal ||
        item.total ||
        quantity * price
      );

      return [
        `${index + 1}. ${name}`,
        `Cantidad: ${quantity}`,
        `Precio: ${formatMoney(price)}`,
        `Subtotal: ${formatMoney(subtotal)}`
      ].join(" | ");
    })
    .join("\n");
}

async function sendOrderEmail(order) {
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_APP_PASSWORD;
  const emailTo =
    process.env.EMAIL_TO ||
    "prosecogdl@gmail.com";

  if (!emailUser || !emailPassword) {
    console.error(
      "Correo automático no configurado. Revisa EMAIL_USER y " +
      "EMAIL_APP_PASSWORD en Render."
    );
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPassword
    }
  });

  const items = Array.isArray(order.items)
    ? order.items
    : [];

  const text = [
    `Nuevo pedido: ${order.order_number}`,
    "",
    `Cliente: ${order.customer_name}`,
    `Teléfono: ${order.phone || "No indicado"}`,
    `Domicilio: ${order.address}`,
    `Colonia: ${order.neighborhood || "No indicada"}`,
    `Ciudad: ${order.city || "No indicada"}`,
    `Estado: ${order.state || "No indicado"}`,
    `Horario: ${order.business_hours || "No indicado"}`,
    `Cierra al mediodía: ${order.closes_midday ? "Sí" : "No"}`,
    `Forma de pago: ${order.payment_method || "Pagar al recibir"}`,
    "",
    "PRODUCTOS",
    formatOrderItems(items),
    "",
    `TOTAL ESTIMADO: ${formatMoney(order.total)}`,
    "",
    `Observaciones: ${order.notes || "Sin observaciones"}`,
    "",
    "Revise el pedido en el panel privado de elbambinodaniel.com."
  ].join("\n");

  const htmlItems = items.length
    ? items
        .map((item) => {
          const name =
            item.name ||
            item.nombre ||
            item.product ||
            item.producto ||
            "Producto";
          const quantity = Number(item.quantity || item.cantidad || 1);
          const price = Number(item.price || item.precio || 0);
          const subtotal = Number(
            item.subtotal ||
            item.total ||
            quantity * price
          );

          return `
            <tr>
              <td style="padding:8px;border:1px solid #ddd;">${name}</td>
              <td style="padding:8px;border:1px solid #ddd;text-align:center;">${quantity}</td>
              <td style="padding:8px;border:1px solid #ddd;text-align:right;">${formatMoney(price)}</td>
              <td style="padding:8px;border:1px solid #ddd;text-align:right;">${formatMoney(subtotal)}</td>
            </tr>
          `;
        })
        .join("")
    : `
      <tr>
        <td colspan="4" style="padding:8px;border:1px solid #ddd;">
          Sin productos
        </td>
      </tr>
    `;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:760px;margin:auto;">
      <h1 style="color:#0b4da2;">Nuevo pedido ${order.order_number}</h1>
      <p><strong>Cliente:</strong> ${order.customer_name}</p>
      <p><strong>Teléfono:</strong> ${order.phone || "No indicado"}</p>
      <p><strong>Domicilio:</strong> ${order.address}</p>
      <p><strong>Colonia:</strong> ${order.neighborhood || "No indicada"}</p>
      <p><strong>Ciudad:</strong> ${order.city || "No indicada"}</p>
      <p><strong>Estado:</strong> ${order.state || "No indicado"}</p>
      <p><strong>Horario:</strong> ${order.business_hours || "No indicado"}</p>
      <p><strong>Cierra al mediodía:</strong> ${order.closes_midday ? "Sí" : "No"}</p>
      <p><strong>Forma de pago:</strong> ${order.payment_method || "Pagar al recibir"}</p>

      <h2>Productos</h2>
      <table style="border-collapse:collapse;width:100%;">
        <thead>
          <tr>
            <th style="padding:8px;border:1px solid #ddd;text-align:left;">Producto</th>
            <th style="padding:8px;border:1px solid #ddd;">Cantidad</th>
            <th style="padding:8px;border:1px solid #ddd;text-align:right;">Precio</th>
            <th style="padding:8px;border:1px solid #ddd;text-align:right;">Subtotal</th>
          </tr>
        </thead>
        <tbody>${htmlItems}</tbody>
      </table>

      <h2 style="text-align:right;">Total estimado: ${formatMoney(order.total)}</h2>
      <p><strong>Observaciones:</strong> ${order.notes || "Sin observaciones"}</p>
      <p style="margin-top:30px;">
        Revise este pedido en el panel privado de
        <strong>elbambinodaniel.com</strong>.
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: `"El Bambino Daniel" <${emailUser}>`,
    to: emailTo,
    subject: `Nuevo pedido ${order.order_number}`,
    text,
    html
  });

  console.log(
    `Correo enviado correctamente para ${order.order_number} a ${emailTo}`
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
    const address = String(
      body.address || body.domicilio || body.ubicacion || ""
    ).trim();
    const items = Array.isArray(body.items || body.productos)
      ? (body.items || body.productos)
      : [];

    if (!customerName || !address || items.length === 0) {
      return res.status(400).json({
        ok: false,
        error: "Faltan nombre, domicilio o productos."
      });
    }

    const orderNumber = createOrderNumber();
    const total = Number(body.total || 0);

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
    console.log(`Pedido registrado correctamente: ${order.order_number}`);

    sendOrderEmail(order).catch((error) => {
      console.error(
        `No se pudo enviar el correo del pedido ${order.order_number}:`,
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
      return res.status(404).json({
        ok: false,
        error: "Pedido no encontrado"
      });
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
      return res.status(404).json({
        ok: false,
        error: "Pedido no encontrado"
      });
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

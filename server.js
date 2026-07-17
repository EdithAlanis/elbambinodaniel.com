const expreso = requerir("expreso");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "2222";
const JWT_SECRET = process.env.JWT_SECRET || "CAMBIA_ESTA_CLAVE_EN_RENDER";
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ||
  "https://elbambinodaniel.com,https://www.elbambinodaniel.com")
  .split(",")
  .map(v => v.trim())
  .filter(Boolean);

if (!process.env.DATABASE_URL) {
  console.error("Falta DATABASE_URL. Conecta una base PostgreSQL de Render.");
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
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
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

función crearNúmero de pedido() {
  constante d = nuevo Fecha();
  constante fecha = [
    d.obtener año completo(),
    Cadena(d.obtener mes() + 1).caminoInicio(2, "0"),
    Cadena(d.obtener fecha()).caminoInicio(2, "0")
  ].unirse("");
  constante aleatorio = Matemáticas.piso(1000 + Matemáticas.aleatorio() * 9000);
  devolver `EBD-${fecha}-${aleatorio}`;
}

función requerirAdmin(req, res, próximo) {
  constante encabezamiento = req.encabezados.autorización || "";
  constante simbólico = encabezamiento.comienza con("portador") ? encabezamiento.rebanada(7) : "";
  intentar {
    req.administración = jwt.verificar(simbólico, JWT_SECRET);
    próximo();
  } atrapar {
    res.estado(401).json({ OK: FALSO, error: "Acceso no autorizado" });
  }
}

asíncrono función enviarWhatsAppNotificación(orden) {
 constante adminTeléfono = proceso.ambiente.ADMIN_WHATSAPP;
  constante número de teléfonoId = proceso.ambiente.WHATSAPP_PHONE_NUMBER_ID;
  constante adminTeléfono = proceso.ambiente.ADMIN_WHATAPP;

  si (!simbólico || !número de teléfonoId || !adminTeléfono) devolver;

  constante mensaje =
    `Tienes el pedido ${orden.número de orden} en elbambinodaniel.com. ` +
    `Ingresa al panel privado para revisarlo.`;

  constante respuesta = esperar buscar(
    `https://graph.facebook.com/v23.0/${número de teléfonoId}/mensajes`,
    {
      método: "CORREO",
      encabezados: {
        Autorización: `Portador ${simbólico}`,
        "Tipo de contenido": "aplicación/json"
      },
      cuerpo: JSON.encadenar({
        producto_mensajería: "whatsapp",
        a: adminTeléfono,
        tipo: "texto",
        texto: { cuerpo: mensaje }
      })
    }
  );

  si (!respuesta.OK) {
    constante detalle = esperar respuesta.texto();
    consola.error("No se pudo enviar WhatsApp:", detalle);
  }
}

aplicación.conseguir("/api/salud", (_req, res) => {
  res.json({ OK: verdadero, servicio: "elbambinodaniel-pedidos" });
});

aplicación.correo("/api/admin/iniciar sesión", (req, res) => {
  constante contraseña = Cadena(req.cuerpo?.contraseña || "");
  si (contraseña !== ADMIN_PASSWORD) {
    devolver res.estado(401).json({ OK: FALSO, error: "Clave incorrecta" });
  }
  constante simbólico = jwt.firmar({ role: "administración" }, JWT_SECRET, { caduca en: "12h" });
  res.json({ OK: verdadero, simbólico });
});

aplicación.correo("/api/órdenes", asíncrono (req, res) => {
  intentar {
    constante cuerpo = req.cuerpo || {};
    constante nombre del cliente = Cadena(cuerpo.nombre del cliente || cuerpo.nombre || "").recortar();
    constante DIRECCIÓN = Cadena(cuerpo.DIRECCIÓN || cuerpo.domicilio || cuerpo.ubicacion || "").recortar();
    constante elementos = Formación.esmatriz(cuerpo.elementos || cuerpo.productos)
      ? (cuerpo.elementos || cuerpo.productos)
      : [];

    si (!nombre del cliente || !DIRECCIÓN || elementos.longitud === 0) {
      devolver res.estado(400).json({
        OK: FALSO,
        error: "Faltan nombre, domicilio o productos."
      });
    }

    constante total = Número(cuerpo.total || 0);
    constante número de orden = crearNúmero de pedido();

    constante valores = [
      número de orden,
      nombre del cliente,
      Cadena(cuerpo.teléfono || cuerpo.teléfono || ""),
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
        order_number, customer_name, phone, address, neighborhood, city, state,
        business_hours, closes_midday, payment_method, items, total, notes
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11::jsonb,$12,$13
      ) RETURNING *`,
      values
    );

    const order = result.rows[0];
    sendWhatsAppNotification(order).catch(console.error);

    res.status(201).json({
      ok: true,
      orderNumber: order.order_number,
      message: `Pedido ${order.order_number} recibido correctamente.`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: "No fue posible guardar el pedido." });
  }
});

app.get("/api/admin/orders", requireAdmin, async (req, res) => {
  try {
    const status = String(req.query.status || "pendiente");
    const allowed = ["pendiente", "atendido", "todos"];
    if (!allowed.includes(status)) {
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
    console.error(error);
    res.status(500).json({ ok: false, error: "No fue posible consultar pedidos." });
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
    console.error(error);
    res.status(500).json({ ok: false, error: "No fue posible actualizar el pedido." });
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
    console.error(error);
    res.status(500).json({ ok: false, error: "No fue posible actualizar el pedido." });
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
  .catch(error => {
    console.error("Error al iniciar la base de datos:", error);
    process.exit(1);
  });

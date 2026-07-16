EL BAMBINO DANIEL — PANEL PRIVADO DE PEDIDOS

INCLUYE
- Botón “Revisar pedidos”.
- Acceso protegido por la clave 2222.
- Pedidos pendientes.
- Histórico.
- Botón “Marcar como atendido”.
- Impresión del pedido.
- Aviso simple por WhatsApp con el número de folio.
- Los datos de los clientes se consultan únicamente desde el servidor privado.

ACTIVACIÓN
1. Suba a GitHub Pages todos los archivos de la raíz, excepto la carpeta backend.
2. Publique la carpeta backend en un servidor privado Node.js.
3. Copie backend/.env.example como .env y complete las credenciales de WhatsApp.
4. En config.js escriba la dirección pública del servidor, sin /api al final.
5. No suba .env, orders.json ni la carpeta backend al repositorio público.

CLAVE INICIAL
2222

Por seguridad, la clave se valida en el servidor privado y no está escrita en admin.html ni admin.js.

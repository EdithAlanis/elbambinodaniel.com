EL BAMBINO DANIEL — VERSIÓN PREPARADA PARA ENVÍO AUTOMÁTICO POR WHATSAPP

CONTENIDO
- Sitio completo listo para GitHub Pages.
- Logotipo e imágenes en la ruta correcta.
- Catálogo final.
- Generación de PDF del pedido.
- Frontend preparado para enviar automáticamente el pedido.
- Servidor privado de ejemplo en la carpeta backend.

IMPORTANTE
El envío automático no se activa solamente subiendo estos archivos a GitHub Pages.
Se requiere desplegar la carpeta backend en un servidor privado y colocar las
credenciales de WhatsApp Business Platform Cloud API en un archivo .env privado.

PASOS PARA ACTIVARLO
1. Publique en GitHub Pages los archivos de la carpeta principal.
2. Despliegue la carpeta backend en Render, Railway, Cloud Run u otro servidor Node.js.
3. Copie backend/.env.example como .env y complete:
   WHATSAPP_ACCESS_TOKEN
   WHATSAPP_PHONE_NUMBER_ID
   ORDER_RECIPIENT_PHONE=523331191167
4. En config.js coloque la dirección pública del servidor:
   window.ORDER_API_URL = "https://SU-SERVIDOR/api/orders";
5. Nunca suba el archivo .env ni el token a GitHub.

El número receptor configurado es +52 33 3119 1167.

EL BAMBINO DANIEL — SISTEMA COMPLETO

INCLUYE
- Tienda pública en GitHub Pages.
- Ruta privada: https://elbambinodaniel.com/revisarpedidos
- Panel con clave privada.
- Pedidos pendientes.
- Histórico.
- Marcar como atendido.
- Base de datos simple persistente en el servidor.
- Contador global.
- Aviso por correo.
- Aviso automático por WhatsApp Business Cloud API, cuando se configuren las credenciales.
- WhatsApp directo del cliente como respaldo.

PASO 1 — GITHUB
Suba a la raíz del repositorio todos los archivos y carpetas, EXCEPTO la carpeta backend.
La carpeta revisarpedidos debe conservarse completa.
No debe aparecer ningún botón de administración en la tienda.

PASO 2 — PUBLICAR EL SERVIDOR EN RENDER
1. Entre a Render.
2. Cree un Blueprint desde el mismo repositorio.
3. Render leerá render.yaml.
4. Configure ADMIN_PIN.
5. Configure correo o WhatsApp, según el método de aviso elegido.
6. Copie la dirección pública del servidor, por ejemplo:
   https://elbambino-pedidos.onrender.com

PASO 3 — CONECTAR LA TIENDA
Abra config-final.js y sustituya:
https://TU-SERVIDOR.onrender.com
por la dirección real de Render.
Suba nuevamente config-final.js a GitHub.

RUTA PRIVADA
https://elbambinodaniel.com/revisarpedidos

IMPORTANTE
Sin publicar el backend, la tienda seguirá enviando el pedido por WhatsApp como respaldo, pero no podrá reunir todos los pedidos de diferentes clientes en el panel.

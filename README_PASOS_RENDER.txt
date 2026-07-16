ARCHIVOS DEL SERVIDOR DE PEDIDOS — EL BAMBINO DANIEL

1. Sube estos archivos a la RAÍZ del repositorio elbambinodaniel.com:
   package.json
   server.js
   render.yaml
   carpeta public completa

2. En Render:
   Nombre: elbambinodaniel-pedidos
   Lenguaje: Node
   Rama: main
   Directorio raíz: dejar vacío
   Comando de construcción: npm install
   Comando de inicio: npm start
   Tipo de instancia: Gratis

3. La forma más sencilla es cancelar la creación manual y usar el archivo
   render.yaml como Blueprint. Render creará el servicio y la base PostgreSQL.

4. Variables:
   ADMIN_PASSWORD = 2222
   JWT_SECRET = generada por Render
   ALLOWED_ORIGINS = https://elbambinodaniel.com,https://www.elbambinodaniel.com
   ADMIN_WHATSAPP = 523331191167

5. WHATSAPP_TOKEN y WHATSAPP_PHONE_NUMBER_ID son opcionales.
   Solo se llenan cuando se configure oficialmente WhatsApp Cloud API.
   El número del administrador no aparece en el sitio público.

6. Cuando Render muestre la dirección terminada en onrender.com, abre:
   https://DIRECCION-DEL-SERVICIO.onrender.com/api/health
   Debe mostrar: {"ok":true,...}

7. Panel privado:
   https://DIRECCION-DEL-SERVICIO.onrender.com/admin
   Clave inicial: 2222

8. Abre config-final.js y cambia:
   https://LA-DIRECCION-RENDER.onrender.com
   por la dirección exacta que te entregue Render.

IMPORTANTE:
La base PostgreSQL conserva los pedidos y el historial.
El panel permite marcar pedidos como atendidos y regresarlos a pendientes.

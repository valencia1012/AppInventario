
INVENTARIO MIRAFLORES — PWA PACKAGE
==================================

Contenido del paquete:
- index.html         -> PWA shell / splash + redirect to your Apps Script URL
- install.html       -> User-facing install instructions
- manifest.json      -> Web App manifest
- service-worker.js  -> Basic service worker for offline caching
- icon-192.png       -> App icon 192x192
- icon-512.png       -> App icon 512x512
- README.md          -> Este archivo
- zip: inventario_miraflores_pwa.zip (este paquete)

== PASO 1 — Personaliza index.html ==
Abre `index.html` y reemplaza la constante SCRIPT_URL (línea marcada)
    const SCRIPT_URL = "__SCRIPT_URL__";
por la URL de tu Apps Script publicada (la URL /exec que obtienes en "Implementar → Nueva implementación").

Si activas un token en tu Code.gs, añade `?token=TU_TOKEN` a la URL en los fetchs/llamadas cuando lo necesites.

== PASO 2 — Opciones de hosting ==

OPCIÓN A — GitHub Pages (recomendado, gratis)
1. Crea un nuevo repo en GitHub (ej: inventario-pwa).
2. Sube todos los archivos de este paquete (arrastra y suelta en la interfaz web o usa git).
3. En el repo: Settings → Pages → Branch: main (root) → Save.
4. Espera 1-2 minutos y abre: https://TU_USUARIO.github.io/inventario-pwa/
5. Verifica que index.html carga y que el Service Worker se registra (abre DevTools → Application → Service Workers).

OPCIÓN B — Netlify (drag-and-drop)
1. Ve a https://app.netlify.com/drop y arrastra el .zip (inventario_miraflores_pwa.zip).
2. Netlify publicará el sitio y te dará una URL. Rápido y sencillo.

OPCIÓN C — Hosting propio (Nginx, Firebase Hosting, etc.)
1. Sube los archivos al directorio público de tu hosting.
2. Asegura que `/manifest.json` y `/service-worker.js` estén accesibles en la raíz.

== PASO 3 — Pruebas locales ==
Puedes probar localmente (para desarrollo) con un servidor simple:
  python -m http.server 8000
Abre http://localhost:8000 y revisa la consola y Application → Service Workers.

== PASO 4 — Instalar en Android/iOS ==
- Android (Chrome): abrir la URL pública → menú → "Agregar a pantalla de inicio".
- iOS (Safari): abrir la URL → compartir → "Agregar a pantalla de inicio". (iOS no usa beforeinstallprompt)

== NOTAS IMPORTANTES sobre Apps Script y CORS ==
- Si tu PWA hará llamadas `fetch()` a la API de Google Apps Script (/exec), asegúrate de:
  * Haber desplegado tu Apps Script con acceso: "Cualquiera, incluso anónimo" (si quieres sin login).
  * Si recibes errores CORS, puedes usar JSONP (añadir &callback=func) o usar un proxy en tu dominio.
  * Alternativa segura: mantener la UI dentro de Apps Script (google.script.run) o exponer endpoints con token.

== Ajuste recomendado en Code.gs para soporte JSONP ==
Si quieres que la API funcione con JSONP (evita problemas CORS), adapta `manejarAPI(e)` para aceptar parámetro `callback`:
```javascript
// after computing `result` object
var callback = e.parameter.callback;
var output = JSON.stringify(result);
if (callback) {
  return ContentService.createTextOutput(callback + '(' + output + ')').setMimeType(ContentService.MimeType.JAVASCRIPT);
} else {
  return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON);
}
```

== DEPLOY RÁPIDO (Netlify) ==
1. Edita index.html y reemplaza SCRIPT_URL.
2. Comprime el contenido (si no lo hiciste): inventario_miraflores_pwa.zip
3. Drag & drop en Netlify Drop -> listo.

== PROBAR OFFLINE ==
1. Abre la URL pública en Chrome (desktop o Android). Espera a que el Service Worker registre.
2. Cierra la pestaña, desconéctate de internet, vuelve a abrir la URL → verás la versión cacheada.

---
Generado automáticamente. Reemplaza el SCRIPT_URL en index.html antes de publicar.

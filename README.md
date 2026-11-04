# Cerrajería Tucumán — Sitio web de urgencias 24 hs

Landing de cerrajería de urgencia para la provincia de Tucumán, hecha con **Astro** y **Tailwind CSS v4**.
Usa **SEO programático local**: a partir de una lista de zonas y barrios se genera una página por cada uno
(`/cerrajero-zona-yerba-buena/`, `/cerrajero-zona-barrio-norte/`, …). El objetivo es que el visitante
contacte por **WhatsApp** lo más rápido posible.

🌐 Producción: <https://cerrajeroentucuman.com>

## Stack

| Pieza | Uso |
| :--- | :--- |
| [Astro](https://astro.build) | Sitio 100 % estático (`astro build` → `dist/`) |
| Tailwind CSS v4 (`@tailwindcss/vite`) | Estilos; tokens de color en `src/layouts/Layout.astro` (`@theme`) |
| `@astrojs/sitemap` | Genera `sitemap-index.xml` con todas las zonas |
| `astro:assets` | Imágenes WebP responsivas (`srcset`/`sizes`) |
| Apache + Cloudflare | Hosting; reglas en `public/.htaccess` |
| GA4 + Google Ads (gtag.js) | Medición con Consent Mode v2 y banner de cookies |

## Estructura

```text
public/
├── .htaccess              # HTTPS, barra final, www → raíz, 404, caché
├── robots.txt
└── favicons, imagen OG, manifest
src/
├── data/zonas.ts          # Zonas y barrios + slugZona() → única fuente de rutas
├── utils/contacto.ts      # Teléfono y urlWhatsapp() (con encodeURIComponent)
├── layouts/Layout.astro   # <head>: SEO, canonical, Open Graph, JSON-LD, GA4
├── pages/
│   ├── index.astro                # Home
│   ├── [zona].astro               # Página por zona/barrio (getStaticPaths)
│   ├── zonas-de-cobertura.astro   # Directorio con enlaces a todas las zonas
│   ├── 404.astro                  # noindex
│   └── politica-*/terminos-*      # Legales
├── sections/              # Header, Hero, Servicios, Beneficios, Opiniones, Galería, FAQ, Footer
└── components/            # Botón flotante de WhatsApp, ícono, banner de cookies
```

## Puesta en marcha

Requiere **Node.js ≥ 22.12**.

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/
npm run preview   # sirve dist/ localmente
```

### Variables de entorno

Crear un archivo `.env` en la raíz (no se sube al repositorio):

```env
PUBLIC_TELEPHONE=+549381XXXXXXX            # Teléfono del negocio (tel: y WhatsApp)
PUBLIC_GA_ID=G-XXXXXXXXXX                  # Google Analytics 4 / Google tag
PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX         # Google Ads (conversiones)
PUBLIC_GOOGLE_SITE_VERIFICATION=xxxxxxxx   # Search Console
```

Si falta alguna de las variables de medición, el script correspondiente simplemente no se imprime.

## Cómo agregar una zona o barrio

1. Editar `src/data/zonas.ts` y sumar la zona (o el barrio dentro de una zona existente).
2. `npm run build`. Se generan automáticamente la página, su entrada en el sitemap y el enlace en
   `/zonas-de-cobertura/`.

El slug se arma con `slugZona()`: `"Tafí Viejo"` → `cerrajero-zona-tafi-viejo`.

## Convenciones de SEO y rendimiento

- **Barra final siempre.** `astro.config.mjs` tiene `trailingSlash: 'always'` y `build.format: 'directory'`.
  Todo `href` interno a una página **debe terminar en `/`** (`/zonas-de-cobertura/`, no `/zonas-de-cobertura`);
  si no, Apache responde con un 301 y se desperdicia crawl budget. Los archivos (`/favicon.ico`) van sin barra.
- **Canonical** dinámica desde `Astro.url.pathname` + `site`. Las páginas que no deben indexarse usan
  `<Layout noindex>`.
- **LCP:** la imagen del Hero lleva `loading="eager"`, `fetchpriority="high"` y un `srcset` de 7 anchos.
  El resto de las imágenes son lazy (comportamiento por defecto de `<Image />`). Los videos de la galería
  solo se cargan al hacer clic.
- **WhatsApp:** los mensajes se arman con `urlWhatsapp(mensaje)`, que aplica `encodeURIComponent`.
  Los botones usan `bg-wpp` (`#15803d`, contraste 5:1 con texto blanco). El verde original `#25d366`
  (`wpp-brillo`) queda solo para detalles decorativos sin texto.
- **Fuentes:** se usan fuentes del sistema; no hay Google Fonts que precargar.

## Despliegue

1. `npm run build`.
2. Subir el **contenido** de `dist/` (incluido `.htaccess`) al `public_html` del servidor Apache.
3. En Cloudflare, purgar la caché si se cambió contenido HTML.

El `.htaccess` detecta HTTPS también a través de las cabeceras de Cloudflare, así que funciona tanto con
SSL "Full" como "Flexible" sin bucles de redirección (se recomienda "Full (strict)").

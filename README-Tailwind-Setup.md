Setup Tailwind + PostCSS (local)

1. Instala dependencias:

   npm install

2. Compila el CSS:

   npm run build:css

   - Esto generará `dist/styles.css`.
   - Durante desarrollo puedes ejecutar `npm run watch:css`.

3. En `index.html` ya añadimos un enlace a `dist/styles.css` (primario). Cuando construyas, el CSS compilado reemplazará y optimizará los estilos.

Notas:
- Si quieres que me encargue de la refactorización del `hero` para usar utilidades de Tailwind (Grid, columnas, responsive), dime y lo hago en la estructura HTML/CSS.
- Para desplegar en Cloudflare Pages: sube el repo, configura el comando de build si usas un builder (puede ser `npm run build:css`), y establece la carpeta publicada (si solo está CSS/HTML, puedes servir `index.html`).

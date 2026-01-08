# Guía de Implementación - Menú de Restaurante

## 📋 Pasos para subir a un servidor web

### 1. Preparación de Archivos

Asegúrate de tener estos 3 archivos listos:
- `menu-restaurante.html`
- `menu-restaurante.css`
- `menu-restaurante.js`

### 2. Configuración Previa

**IMPORTANTE:** Antes de subir, configura tu número de WhatsApp:

1. Abre `menu-restaurante.js`
2. Busca la línea: `const WHATSAPP_NUMBER = '1234567890';`
3. Reemplaza con tu número real (formato: código país + número sin espacios)
   - Ejemplo México: `521234567890`
   - Ejemplo España: `34612345678`
   - Ejemplo Argentina: `5491123456789`

### 3. Opciones de Hosting

#### Opción A: Hosting Gratuito (Recomendado para empezar)

**GitHub Pages:**
1. Crea cuenta en [GitHub.com](https://github.com)
2. Crea un nuevo repositorio
3. Sube los 3 archivos
4. Ve a Settings > Pages
5. Selecciona la rama `main` y carpeta `/root`
6. Tu sitio estará en: `https://tuusuario.github.io/nombre-repositorio`

**Netlify:**
1. Crea cuenta en [Netlify.com](https://netlify.com)
2. Arrastra la carpeta con los archivos
3. Tu sitio estará listo en segundos

**Vercel:**
1. Crea cuenta en [Vercel.com](https://vercel.com)
2. Conecta tu repositorio de GitHub o sube archivos
3. Deploy automático

#### Opción B: Hosting de Pago (Más profesional)

**Servicios populares:**
- **cPanel Hosting** (Hostinger, Bluehost, etc.)
- **AWS S3 + CloudFront**
- **Google Cloud Storage**
- **Azure Static Web Apps**

### 4. Subir Archivos vía FTP (cPanel/FileZilla)

1. **Obtén credenciales FTP:**
   - Host: `ftp.tudominio.com` o IP del servidor
   - Usuario: Tu usuario FTP
   - Contraseña: Tu contraseña FTP
   - Puerto: 21 (o el que te indique tu hosting)

2. **Usa FileZilla (gratis):**
   - Descarga: [filezilla-project.org](https://filezilla-project.org)
   - Conecta con tus credenciales
   - Navega a la carpeta `public_html` o `www`
   - Arrastra los 3 archivos

3. **Estructura de carpetas:**
   ```
   public_html/
   ├── menu-restaurante.html
   ├── menu-restaurante.css
   └── menu-restaurante.js
   ```

### 5. Subir Archivos vía cPanel

1. Inicia sesión en cPanel
2. Busca "Administrador de Archivos"
3. Entra a `public_html`
4. Haz clic en "Subir"
5. Selecciona los 3 archivos
6. Espera a que termine la carga

### 6. Configuración del Dominio

**Si tienes dominio propio:**
- El archivo HTML debe estar en la raíz del dominio
- Accede: `https://tudominio.com/menu-restaurante.html`

**Para que sea la página principal:**
- Renombra `menu-restaurante.html` a `index.html`
- Accede: `https://tudominio.com`

### 7. Verificación Post-Implementación

✅ **Checklist:**

- [ ] Archivos subidos correctamente
- [ ] Número de WhatsApp configurado
- [ ] Sitio accesible desde navegador
- [ ] Imágenes cargan correctamente
- [ ] Botones de WhatsApp funcionan
- [ ] Carrito de compras funciona
- [ ] Diseño responsive en móvil
- [ ] HTTPS activado (importante para WhatsApp)

### 8. Optimizaciones Recomendadas

**Para mejor rendimiento:**

1. **Comprimir imágenes:**
   - Usa herramientas como TinyPNG
   - Optimiza antes de subir

2. **CDN para imágenes:**
   - Considera usar servicios como Cloudinary
   - O almacena imágenes en carpeta `images/`

3. **HTTPS obligatorio:**
   - WhatsApp requiere conexión segura
   - La mayoría de hostings lo incluyen gratis

### 9. Solución de Problemas Comunes

**Problema: Botones de WhatsApp no funcionan**
- ✅ Verifica que el número esté correcto
- ✅ Asegúrate de tener HTTPS activado
- ✅ Revisa la consola del navegador (F12)

**Problema: Estilos no se cargan**
- ✅ Verifica rutas de archivos CSS
- ✅ Asegúrate de que estén en la misma carpeta
- ✅ Revisa permisos de archivos (644)

**Problema: JavaScript no funciona**
- ✅ Verifica que el archivo JS esté cargado
- ✅ Revisa la consola del navegador
- ✅ Verifica que Font Awesome esté cargando

### 10. Actualización de Contenido

**Para cambiar platos/precios:**
1. Edita `menu-restaurante.html`
2. Busca la sección del plato
3. Modifica nombre, descripción y precio
4. Sube el archivo actualizado

**Para agregar más platos:**
- Copia un bloque `<div class="menu-item">` completo
- Modifica los datos
- Agrega dentro de la sección correspondiente

### 11. Seguridad

- ✅ Mantén backups de tus archivos
- ✅ No expongas información sensible en el código
- ✅ Usa HTTPS siempre
- ✅ Actualiza regularmente

### 12. Analytics (Opcional)

**Para rastrear visitas:**
- Google Analytics
- Facebook Pixel
- Hotjar

Agrega el código antes de `</head>` en el HTML.

---

## 📞 Soporte

Si tienes problemas:
1. Revisa la consola del navegador (F12)
2. Verifica que todos los archivos estén subidos
3. Comprueba permisos de archivos
4. Contacta a tu proveedor de hosting

---

## 🚀 URLs de Ejemplo

Una vez implementado, tu menú estará disponible en:
- `https://tudominio.com/menu-restaurante.html`
- O `https://tudominio.com` (si renombraste a index.html)

¡Listo para recibir pedidos! 🎉

# Furpal — Site Inmobiliario

Sitio web profesional para **Furpal Assessoria Imobiliária Internacional**, desarrollado con vanilla JavaScript, PHP y CSS. Incluye panel de administración completo, dos modos de almacenamiento (frontend y BD), búsqueda con filtros, galería de imágenes, integración con WhatsApp, mapa interactivo y más.

## Características

- Panel admin con CRUD para todas las secciones (propiedades, lanzamientos, blog, FAQ, depoimentos, parceiros, equipo, regiones, configuración)
- Dos modos de almacenamiento:
  - **Frontend:** datos en `data.js` (archivo estático generado por `save.php`)
  - **BD:** datos en `bd_data.json` vía `api.php`
- Sitio público con navegación SPA (single-page application)
- Filtros de propiedades por tipo, categoría, ubicación y precio
- Galería de imágenes con modal
- Mapa interactivo con Google Maps
- Integración con WhatsApp (mensaje personalizado por propiedad)
- Blog con artículos
- SEO básico (meta tags, Open Graph, sitemap)
 Diseño responsive adaptable a móviles
- Service worker (autodestruible para evitar caché conflictivo)

## Tecnologías

| Capa        | Tecnología                     |
|-------------|--------------------------------|
| Frontend    | HTML, CSS, JavaScript (vanilla)|
| Backend     | PHP 7.4+                        |
| Admin       | JavaScript (admin.js)          |
| API         | api.php (REST-like)            |
| Almacenamiento | data.js / bd_data.json + save.php |
| Mapas       | Google Maps JavaScript API     |
| Íconos      | Emoji / Unicode                |

## Estructura del proyecto

```
├── index.php                    # Entry point (SPA shell)
├── index.html                   # Fallback estático
├── .htaccess                    # Reglas del servidor Apache
├── api.php                      # API REST para modo BD
├── save.php                     # Guarda data.js desde el admin
├── upload.php                   # Subida de imágenes
├── api-config.php               # Configuración (password BD)
├── api-config.example.php       # Ejemplo de configuración
├── robots.txt                   # Reglas para crawlers
├── sitemap.xml                  # Sitemap SEO
├── sitemap.html                 # Sitemap visual
├── manifest.json                # PWA manifest
├── sw.js                        # Service worker (autodestruible)
├── 404.html                     # Página 404
├── schema.sql                   # Esquema BD (legado MySQL)
│
├── css/
│   └── style.css                # Estilos del sitio
│
├── js/
│   ├── data.js                  # Datos estáticos (generado)
│   ├── data-provider.js         # Abstracción de datos (frontend/BD)
│   ├── admin.js                 # Panel de administración
│   ├── admin.min.js             # Admin minificado
│   ├── app.js                   # Lógica del sitio público
│   └── app.min.js               # App minificado
│
├── partials/
│   ├── scripts.php              # Scripts, BD sync, constantes
│   ├── header.php               # Encabezado y navegación
│   └── ... (otros partials HTML)
│
├── images/                      # Imágenes del sitio
├── video/                       # Videos del sitio
├── docs/                        # Documentación adicional
└── bd_data.json                 # Datos en modo BD (generado)
```

## Instalación

### Requisitos

- PHP 7.4 o superior
- Apache con mod_rewrite (o compatible con .htaccess)
- Opcional: Node.js (para minificar JS)

### Pasos

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/JUANJ0V/site.git
   cd site
   ```

2. Subir todos los archivos a la raíz del hosting.

3. Configurar la contraseña del panel:
   ```bash
   cp api-config.example.php api-config.php
   ```
   Editar `api-config.php` y cambiar `API_PASSWORD` por una contraseña segura.

4. **(Opcional)** Activar modo BD:
   - Abrir el sitio con `?edit=1` al final de la URL
   - Ir a Config > Modo Banco de Datos
   - Marcar "Ativar modo BD" e ingresar la URL base de la API (ej: `/api.php`)
   - Informar la contraseña configurada en `api-config.php`
   - Guardar

5. **(Opcional)** Minificar JS:
   ```bash
   npm install uglify-js
   npx uglifyjs js/app.js -o js/app.min.js -c -m
   npx uglifyjs js/admin.js -o js/admin.min.js -c -m
   npx uglifyjs js/data-provider.js -o js/data-provider.min.js -c -m
   ```

## Uso

### Panel de Administración

Acceder al sitio con `?edit=1` al final de la URL:
```
https://tusitio.com/?edit=1
```

Secciones del panel:
| Sección       | Descripción                                  |
|---------------|----------------------------------------------|
| Geral         | Configuración general del sitio              |
| Financiamento | Textos y valores del simulador               |
| Imóveis       | CRUD de propiedades (venta y alquiler)       |
| Lançamentos   | CRUD de emprendimientos/lanzamientos         |
| Blog          | CRUD de artículos del blog                   |
| FAQ           | CRUD de preguntas frecuentes                 |
| Depoimentos   | CRUD de testimonios de clientes              |
| Parceiros     | CRUD de instituciones parceiras              |
| Equipe        | CRUD del equipo                              |
| Região        | CRUD de regiones/ciudades                    |
| Usuários      | Gestión de usuarios (próximamente)           |
| Config        | Modo BD, contraseña, cambiar data.js         |

### Modos de almacenamiento

**Frontend (modo por defecto):**
- Los datos se guardan directamente en `data.js` vía `save.php`
- No requiere BD
- Los cambios se ven inmediatamente al recargar

**BD:**
- Los datos se guardan en `bd_data.json` vía `api.php`
- También se actualiza `data.js` como respaldo
- Recomendado para entornos con múltiples administradores
- La API requiere contraseña (configurada en `api-config.php`)

## API (modo BD)

`api.php` expone los siguientes endpoints:

| Método | Acción              | Endpoint                    |
|--------|---------------------|-----------------------------|
| GET    | Obtener todos       | `/api.php?action=all`       |
| GET    | Obtener colección   | `/api.php?action=properties`|
| GET    | Ping                | `/api.php?action=ping`      |
| POST   | Guardar todas       | `/api.php` (body: JSON)     |

### Ejemplo POST

```json
{
  "password": "tu_contraseña",
  "properties": [...],
  "empreendimentos": [...],
  "constants": {...}
}
```

## Mantenimiento

### Actualizar data.js manualmente

Si el modo BD está activo y necesitas regenerar `data.js`:
1. Abrir el admin (`?edit=1`)
2. Ir a Config
3. Hacer clic en "Actualizar data.js"

### Cambiar contraseña

Editar `api-config.php` y cambiar el valor de `API_PASSWORD`.

## Licencia

Todos los derechos reservados — Furpal Assessoria Imobiliária Internacional.

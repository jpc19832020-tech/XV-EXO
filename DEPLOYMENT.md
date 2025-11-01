# 🚀 Despliegue en GitHub Pages

Este proyecto está configurado para desplegarse automáticamente en GitHub Pages usando GitHub Actions.

## 📋 Configuración Requerida

### 1. Configurar GitHub Pages en tu repositorio:

1. Ve a la configuración de tu repositorio en GitHub
2. Navega a **Settings > Pages**
3. En **Source**, selecciona **GitHub Actions**
4. Guarda los cambios

### 2. Ajustar basePath (recomendado):

Para configurar automáticamente el basePath para tu repositorio:

```bash
node setup-github-pages.js nombre-de-tu-repositorio
```

O manualmente, si tu repositorio no está en la raíz de tu cuenta (ej: `username/nombre-del-repositorio`), necesitas:

1. Editar [`next.config.ts`](next.config.ts:1)
2. Descomentar y modificar la línea `basePath`:
   ```typescript
   basePath: '/nombre-del-repositorio', // Reemplaza con el nombre de tu repositorio
   ```

### 3. Activar GitHub Actions:

Asegúrate de que GitHub Actions esté habilitado en tu repositorio:
1. Ve a **Settings > Actions > General**
2. En **Actions permissions**, selecciona **Read and write permissions**
3. Permite **Allow GitHub Actions to create and approve pull requests**

## 🔄 Flujo de Despliegue Automático

El workflow se activará automáticamente cuando:
- Hagas push a la rama `main`
- Crees un pull request hacia `main`

El proceso:
1. Instala dependencias
2. Construye la versión estática
3. Despliega a GitHub Pages

## 📁 Estructura de Archivos Generados

El despliegue estático genera:
- `out/index.html` - Página principal
- `out/_next/` - Assets de Next.js
- `out/gallery/` - Imágenes de la galería
- `out/*.jpg`, `out/*.png` - Imágenes estáticas

## 🎨 Características Mantenidas

✅ **Funcionalidades estáticas:**
- Animaciones con Framer Motion
- Galería de imágenes interactiva
- Cuenta regresiva
- Formulario de RSVP (simulado)
- Diseño responsivo
- Efectos visuales y transiciones

❌ **Funcionalidades eliminadas (requieren servidor):**
- Socket.IO (comunicación en tiempo real)
- Base de datos Prisma/SQLite
- API routes del servidor

## 🛠️ Desarrollo Local

Para desarrollar localmente:

```bash
npm install
npm run dev
```

Para construir la versión estática:

```bash
npm run build
```

Los archivos estáticos se generarán en la carpeta `out/`.

## 🌐 Acceso al Sitio

Una vez desplegado, tu sitio estará disponible en:
```
https://[tu-username].github.io/[nombre-del-repositorio]/
```

## 🔧 Solución de Problemas

### Si las imágenes no cargan:
Verifica que el `basePath` esté configurado correctamente en [`next.config.ts`](next.config.ts:1).

### Si las rutas no funcionan:
Asegúrate de que `trailingSlash: true` esté configurado en [`next.config.ts`](next.config.ts:1).

### Si el despliegue falla:
Revisa la pestaña **Actions** en tu repositorio para ver los logs del workflow.

## 📝 Notas

- El sitio funciona completamente como contenido estático
- No requiere servidor ni base de datos
- Todas las animaciones y efectos visuales se mantienen
- El RSVP muestra una confirmación visual (no guarda datos)
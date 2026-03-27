# Portafolio Personal - Iván Sevilla Gómez

Un portfolio personal moderno y responsivo construido con **Astro 6**, **React 19** y **Framer Motion**, presentando un diseño atractivo con animaciones fluidas.

![Astro](https://img.shields.io/badge/Astro-6.0.8-FF5D01?logo=astro)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.34.3-0055FF?logo=framer)

## 🎯 Características

- ✨ **Animaciones fluidas** con Framer Motion
- 🎨 **Diseño moderno** con esquema de colores coherente
- 📱 **Responsivo** en todos los dispositivos
- ⚡ **Generación estática** de sitios (SSG) con Astro
- 🔧 **Componentes híbridos** (Astro + React)
- 🌐 **TypeScript strict** para seguridad de tipos
- 🚀 **Rendimiento optimizado** con carga rápida

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **Astro** | 6.0.8 | Framework principal (SSG) |
| **React** | 19.2.4 | Componentes interactivos |
| **TypeScript** | Strict | Tipado estático |
| **Framer Motion** | 12.34.3 | Animaciones |
| **Google Fonts** | Archivo | Tipografía |

## 📋 Requisitos Previos

- **Node.js**: v18.0 o superior
- **npm**: v9.0 o superior (o yarn/pnpm)

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/ivan321pum/portafolio-personal.git
cd portafolio-personal
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar servidor de desarrollo

```bash
npm run dev
# o
npm start
```

El servidor estará disponible en `http://localhost:3000`

## 📦 Comandos Disponibles

```bash
# Desarrollo con hot reload
npm run dev
npm start

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 📁 Estructura del Proyecto

```
portafolio-personal/
├── src/
│   ├── pages/
│   │   └── index.astro              # Página principal
│   ├── layouts/
│   │   └── BaseLayout.astro         # Layout base con header y estilos globales
│   ├── components/
│   │   ├── Hero.astro               # Sección hero
│   │   ├── AnimatedHero.jsx         # Animación del hero (React)
│   │   ├── Header.astro             # Encabezado
│   │   ├── Navigation.astro         # Navegación
│   │   ├── AboutMe.astro            # Sección sobre mí
│   │   └── InfoCard.jsx      # Animaciones (React)
│   └── assets/                       # Recursos estáticos
├── public/
│   └── assets/
│       └── images/                   # Imágenes (avatar, etc.)
├── astro.config.mjs                 # Configuración de Astro
├── tsconfig.json                    # Configuración de TypeScript
├── package.json                     # Dependencias del proyecto
└── AGENTS.md                        # Guía para agentes de IA

```

## 🎨 Sistema de Colores

El proyecto utiliza un esquema de colores coherente mediante variables CSS globales:

```css
--color-primario: #D72638        /* Rojo brillante */
--color-secundario: #104547      /* Verde azulado oscuro */
--color-fondo-secundario: #FF9F1C /* Naranja (encabezado) */
--color-fondo: #f4f4f4           /* Gris claro */
--color-texto: #333333           /* Texto oscuro */
```

Todas estas variables están definidas en `src/layouts/BaseLayout.astro` y son accesibles en todo el proyecto.

## 🏗️ Arquitectura

### Patrón Híbrido Astro + React

- **Componentes Astro** (`.astro`): Contenido estático, renderizado en servidor
- **Componentes React** (`.jsx`): Interactividad y animaciones, renderizados en cliente
- **Hidratación selectiva**: Solo los componentes que lo necesitan se hidratan en el cliente

### Flujo de Datos

```
pages/index.astro
    ↓
imports BaseLayout.astro
    ↓
Renders Header + injects content via <slot/>
    ↓
Hero.astro imports AnimatedHero.jsx (client:load)
    ↓
Framer Motion animations
```

## 💡 Cómo Trabajar en el Proyecto

### Agregar una Nueva Sección

1. **Crear componente React con animaciones** (si necesita interactividad):
   ```bash
   src/components/AnimatedNewSection.jsx
   ```
   
2. **Crear componente Astro wrapper**:
   ```bash
   src/components/NewSection.astro
   ```
   
3. **Importar en la página principal** o crear nueva página

### Modificar Encabezado/Navegación

- Editar `src/components/Header.astro` o `Navigation.astro`
- El header usa flexbox con imagen de perfil (80px circular)
- Aplicar `:global()` en estilos si afectan componentes React

### Actualizar Colores

- Modificar variables CSS en `src/layouts/BaseLayout.astro` (selector `:root`)
- Los cambios se propagarán automáticamente a todo el proyecto

## 📝 Convenciones de Código

- **Componentes Astro**: PascalCase (ej: `Hero.astro`)
- **Componentes React animados**: Prefijo "Animated" (ej: `AnimatedHero.jsx`)
- **Clases CSS**: lowercase con guiones (ej: `hero-title`, `profile-frame`)
- **Estilos en Astro**: Usar `:global()` para aplicar estilos a componentes React

## 🔗 Integración de Componentes

Patrón estándar para integrar componentes React animados:

```astro
---
import AnimatedComponent from "../components/AnimatedComponent.jsx"
---

<section>
    <AnimatedComponent client:load></AnimatedComponent>
</section>

<style>
    :global(.animated-class) {
        /* Estilos del componente */
    }
</style>
```

## 📚 Recursos Útiles

- [Documentación de Astro](https://docs.astro.build)
- [Documentación de React](https://react.dev)
- [Documentación de Framer Motion](https://www.framer.com/motion/)
- [Google Fonts - Archivo](https://fonts.google.com/specimen/Archivo)

## 🤖 Para Agentes de IA

Si eres un agente de IA (Copilot, Cursor, Claude, etc.) trabajando en este proyecto, consulta `AGENTS.md` para obtener instrucciones detalladas sobre arquitectura, convenciones y patrones específicos del proyecto.

## ⚠️ Notas Importantes

- React solo se renderiza en el cliente (mediante `client:load`)
- TypeScript está en modo strict
- Este es un sitio estático; para backend considera agregar un servicio separado
- El contenedor principal tiene max-width de 1100px con padding de 2rem

## 📄 Licencia

ISC - Ver `package.json` para más detalles

## 👨‍💻 Autor

**Iván Sevilla Gómez**  
Estudiante de Ingeniería en Telecomunicaciones en la UPV

---

¿Preguntas o sugerencias? Abre un issue en el [repositorio de GitHub](https://github.com/ivan321pum/portafolio-personal)


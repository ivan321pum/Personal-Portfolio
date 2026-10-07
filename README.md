# Portfolio personal

Portfolio personal de Iván Sevilla Gómez, publicado como sitio estático en
[ivan321pum.github.io](https://ivan321pum.github.io).

La web está construida con Astro y combina componentes Astro para el contenido
principal con componentes React hidratados únicamente cuando necesitan
interactividad o animaciones. La interfaz incluye varias rutas de idioma,
temas inspirados en álbumes de Queen, animaciones al hacer scroll y un cursor
visual con una sombra elástica para dispositivos de escritorio.

## Índice

- [Estado actual](#estado-actual)
- [Tecnologías](#tecnologías)
- [Requisitos](#requisitos)
- [Desarrollo local](#desarrollo-local)
- [Comandos](#comandos)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Cómo se renderiza la página](#cómo-se-renderiza-la-página)
- [El cursor con sombra](#el-cursor-con-sombra)
- [Idiomas y rutas](#idiomas-y-rutas)
- [Temas y colores](#temas-y-colores)
- [Animaciones y componentes React](#animaciones-y-componentes-react)
- [Cómo añadir o modificar contenido](#cómo-añadir-o-modificar-contenido)
- [Assets e imágenes](#assets-e-imágenes)
- [Despliegue](#despliegue)
- [Rendimiento y accesibilidad](#rendimiento-y-accesibilidad)
- [Comprobaciones antes de publicar](#comprobaciones-antes-de-publicar)
- [Detalles pendientes conocidos](#detalles-pendientes-conocidos)
- [Licencia y autor](#licencia-y-autor)

## Estado actual

- Generación estática (SSG): Astro genera HTML durante el build.
- Idiomas disponibles en las páginas: español, inglés, catalán y neerlandés.
- Idioma por defecto: español.
- URL pública: `https://ivan321pum.github.io`.
- El cursor personalizado solo se activa en pantallas de al menos `768px`
  con un dispositivo que indique `pointer: fine` y `hover: hover`.
- Los vídeos de la sección «Sobre mí» se reproducen en bucle, sin sonido y
  inline.
- La sección de contacto está disponible en las cuatro rutas de idioma y
  envía los formularios mediante Web3Forms.
- La sección de proyectos muestra tarjetas centradas, con contenido traducido
  por idioma y un enlace individual a GitHub.

## Tecnologías

| Tecnología | Uso |
| --- | --- |
| [Astro](https://astro.build/) | Framework principal, rutas y generación estática |
| [React](https://react.dev/) | Componentes interactivos y animaciones |
| [Motion](https://motion.dev/) | Cursor y animaciones basadas en valores reactivos |
| [Framer Motion](https://www.framer.com/motion/) | Hero, tarjetas y animaciones de scroll existentes |
| [Tailwind CSS](https://tailwindcss.com/) | Clases utilitarias y tokens de color |
| [astro-icon](https://github.com/natemoo-re/astro-icon) | Iconos Material Design |
| TypeScript | Tipado de los componentes `.ts` y `.tsx` |
| GitHub Actions + GitHub Pages | Build y publicación automática |

Las versiones instaladas se definen en `package.json` y `package-lock.json`.
No conviene copiar las versiones antiguas de documentación externa: antes de
actualizar dependencias, comprueba siempre esos dos archivos.

## Requisitos

- Node.js 22 o una versión compatible con la versión actual de Astro.
- npm.
- Git.

El workflow de GitHub Pages utiliza Node.js 22, por lo que es la referencia
recomendada para desarrollo local.

## Desarrollo local

```bash
git clone https://github.com/ivan321pum/ivan321pum.github.io.git
cd ivan321pum.github.io
npm install
npm run dev
```

El servidor de desarrollo muestra la URL en la terminal, normalmente
`http://localhost:4321`.

Para probar la versión que se va a publicar:

```bash
npm run build
npm run preview
```

`npm run build` crea la salida estática en `dist/`. Tanto `dist/` como `.astro/`
están ignorados por Git y se pueden regenerar.

## Comandos

```bash
# Servidor de desarrollo con recarga automática
npm run dev

# Alias del comando de desarrollo
npm start

# Generar el sitio estático de producción
npm run build

# Servir localmente el build de producción
npm run preview
```

No hay actualmente scripts separados de lint, test o type-check en
`package.json`. El build de Astro sí valida la compilación y genera los tipos
de Astro.

## Estructura del proyecto

```text
.
├── public/
│   └── assets/
│       ├── images/                 # Imágenes servidas como archivos públicos
│       └── videos/                 # Vídeos usados por las tarjetas de Sobre mí
├── src/
│   ├── components/
│   │   ├── react/
│   │   │   ├── AnimatedHero.jsx    # Entrada animada del hero
│   │   │   ├── BlueprintCard.tsx   # Tarjeta decorativa de proyectos
│   │   │   ├── InfoCard.jsx        # Tarjeta con vídeo y animación de scroll
│   │   │   └── MouseShadow.tsx     # Cursor personalizado
│   │   ├── AboutMe.astro            # Tres tarjetas de presentación
│   │   ├── Contact.astro             # Formulario de contacto con Web3Forms
│   │   ├── DockLayout.astro         # Botones flotantes inferiores
│   │   ├── Header.astro             # Avatar, nombre y navegación
│   │   ├── Hero.astro               # Hero y texto de bienvenida
│   │   ├── LanguagePicker.astro     # Selector de idioma
│   │   ├── MouseShadow.astro        # Wrapper Astro del cursor
│   │   ├── Navigation.astro         # Enlaces internos y redes sociales
│   │   ├── Projects.astro           # Grid de proyectos
│   │   └── ThemePicker.astro        # Selector de tema
│   ├── data/
│   │   ├── projects.json            # Contenido de las tarjetas de proyectos
│   │   └── themes.ts                # Catálogo de temas
│   ├── i18n/
│   │   └── ui.js                   # Traducciones y helper useTranslations
│   ├── layouts/
│   │   └── BaseLayout.astro        # HTML base y montaje global
│   ├── pages/
│   │   ├── index.astro              # Redirección a /es/
│   │   ├── es/index.astro           # Página en español
│   │   ├── en/index.astro           # Página en inglés
│   │   ├── cat/index.astro          # Página en catalán
│   │   └── nl/index.astro           # Página en neerlandés
│   └── styles/
│       └── global.css               # Tailwind, tokens y animación global
├── .github/workflows/deploy.yml     # Publicación en GitHub Pages
├── astro.config.mjs                 # Astro, React, iconos, i18n y Vite
├── package.json                     # Scripts y dependencias directas
├── package-lock.json                # Versiones bloqueadas de npm
└── tsconfig.json                    # Configuración strict de TypeScript
```

## Cómo se renderiza la página

La cadena principal es:

```text
src/pages/es/index.astro
        ↓
BaseLayout.astro
        ↓
Header + selectores + slot de la página
        ↓
Hero + AboutMe + Projects
        ↓
Componentes React hidratados según su necesidad
```

### Astro frente a React

- Usa `.astro` para estructura, contenido estático, enlaces, traducciones y
  composición de la página.
- Usa `.jsx` o `.tsx` cuando hace falta estado, efectos, listeners del DOM o
  animación interactiva.
- `client:load` hidrata el componente inmediatamente al cargar la página.
- `client:visible` espera a que el componente entre en el viewport. Se usa en
  `InfoCard` para no cargar las tres animaciones de vídeo antes de tiempo.
- El HTML y los textos siguen siendo accesibles aunque la animación de React
  todavía no haya empezado.

`BaseLayout.astro` monta `MouseShadow` con `client:load`, porque el cursor
necesita escuchar eventos del puntero desde el principio. El contenido de la
página entra en el layout mediante `<slot />`.

## El cursor con sombra

El cursor vive principalmente en
`src/components/react/MouseShadow.tsx`. El archivo
`src/components/MouseShadow.astro` es solo un wrapper alternativo que permite
usarlo desde Astro.

### Flujo general

1. El componente crea varios valores reactivos:
   - `dotX` y `dotY`: posición del punto pequeño.
   - `trailX` y `trailY`: posición de la sombra grande, suavizada con
     `useSpring`.
   - `trailScale`: escala de la sombra cuando se pasa por un elemento
     interactivo.
2. En `useEffect` comprueba:
   ```text
   (min-width: 768px) and (pointer: fine) and (hover: hover)
   ```
   Si no se cumple, no registra listeners ni monta las capas visuales.
3. `pointermove` actualiza el punto y la sombra usando las coordenadas
   `clientX` y `clientY`.
4. Si el puntero está sobre un enlace, botón, input, select, textarea,
   `summary`, un elemento con `role="button"` o `[data-cursor-pool]`, la sombra
   se desplaza al centro de ese elemento y aumenta su escala.
5. `pointerenter` hace visible el cursor y `pointerleave` lo oculta.
6. Las dos capas visuales se crean con `createPortal` directamente bajo
   `document.body`. Así no quedan recortadas por contenedores con `overflow`.
7. Las capas tienen `pointer-events-none`, por lo que nunca bloquean clics.
8. El wrapper aplica `cursor-none` únicamente cuando el cursor personalizado
   está habilitado. En móvil deja `cursor-auto`.

### Por qué hay dos capas

- La capa pequeña representa la posición exacta del puntero.
- La capa grande representa la sombra/trail y tiene movimiento elástico.
- Las dos usan `mixBlendMode`, por defecto `difference`, para que se vean
  sobre fondos de distintos colores.

### Parámetros configurables

`ShadowCursor` acepta estas props:

| Prop | Valor por defecto | Función |
| --- | ---: | --- |
| `dotSize` | `8` | Diámetro del punto |
| `trailSize` | `36` | Diámetro de la sombra |
| `stiffness` | `150` | Rigidez del muelle de posición |
| `damping` | `15` | Amortiguación del muelle |
| `cursorColor` | `"white"` | Color de ambas capas |
| `blendMode` | `"difference"` | Modo de mezcla CSS |
| `poolScale` | `2` | Escala sobre elementos interactivos |
| `reducedMotion` | `false` | Hace que la sombra siga al punto sin transición |

### Qué tener en cuenta al modificarlo

- No accedas a `window`, `document` o `matchMedia` durante el renderizado:
  Astro puede renderizar en un entorno sin DOM. Hazlo dentro de `useEffect`.
- Mantén el filtro de escritorio. Un cursor visual no debe ser la única forma
  de comunicar una acción y no tiene sentido en una pantalla táctil.
- No quites `pointer-events-none` de las capas.
- Si añades nuevos elementos que deban atraer la sombra, usa
  `data-cursor-pool` en vez de duplicar lógica.
- Si cambias el breakpoint, actualiza también la documentación y prueba tanto
  un móvil como una ventana de escritorio redimensionada.
- El listener de media query permite activar o desactivar el cursor si la
  ventana cambia de tamaño. Cualquier nuevo listener debe limpiarse en el
  retorno del `useEffect`.
- Comprueba `prefers-reduced-motion` si en el futuro se quiere mejorar la
  accesibilidad. La prop `reducedMotion` existe, pero actualmente no se
  conecta automáticamente con la preferencia del sistema.

## Idiomas y rutas

Las rutas están configuradas en `astro.config.mjs`:

```js
i18n: {
  defaultLocale: "es",
  locales: ["es", "en", "cat", "nl"],
  routing: {
    prefixDefaultLocale: true,
    redirectToDefaultLocale: false
  }
}
```

La raíz `/` redirige manualmente a `/es/` desde
`src/pages/index.astro`. Cada página de idioma reutiliza los mismos
componentes y cambia el idioma mediante `Astro.currentLocale`.

Para añadir o modificar textos:

1. Edita `src/i18n/ui.js`.
2. Añade la misma clave a todos los idiomas.
3. Usa `useTranslations(lang)` en el componente Astro.
4. Comprueba directamente `/es/`, `/en/`, `/cat/` y `/nl/`.

El helper `t(key)` intenta devolver el texto del idioma actual y, si falta,
usa el español como fallback:

```js
const lang = Astro.currentLocale || "es";
const t = useTranslations(lang);
const title = t("projects.title");
```

Cuando se añada un idioma nuevo, hay que actualizar tanto `ui` y
`languages` en `src/i18n/ui.js` como `locales` en `astro.config.mjs` y crear
su página en `src/pages/<idioma>/index.astro`.

## Temas y colores

Los temas se declaran en dos lugares que deben mantenerse sincronizados:

1. `src/data/themes.ts`: catálogo que consume el selector.
2. `src/styles/global.css`: variables CSS de cada clase de tema.

Cada tema aplica una clase al elemento `<html>`, por ejemplo
`news-of-the-world`. Las variables internas son:

```css
--tema-primario
--tema-secundario
--tema-fondo
--tema-texto
--tema-fondo-secundario
```

Después, Tailwind expone esas variables como:

```text
text-primario
text-secundario
bg-fondo
bg-fondo-secundario
text-texto
```

Para crear un tema:

1. Añade un objeto a `THEMES` en `src/data/themes.ts`.
2. Añade una clase con el mismo nombre a `src/styles/global.css`.
3. Define las cinco variables `--tema-*`.
4. Prueba texto, botones, tarjetas, header y cursor en ese tema.
5. Comprueba que el valor guardado en `localStorage` sigue siendo válido.

`ThemePicker.astro` guarda la selección en `localStorage` usando la clave
`selected-theme`. Al cargar, reemplaza las clases del elemento `<html>` por el
tema guardado.

## Animaciones y componentes React

### Hero

`Hero.astro` obtiene los textos traducidos y carga `AnimatedHero.jsx` con
`client:load`. El componente anima el título y subtítulo con Framer Motion.

### Tarjetas de «Sobre mí»

`AboutMe.astro` instancia tres `InfoCard` con `client:visible`. Cada tarjeta:

- ocupa una sección alta para convertir el scroll en progreso de animación;
- fija una escena con `position: sticky`;
- escala y mueve el vídeo;
- revela el texto con opacidad y desplazamiento;
- cambia sus medidas y posiciones para pantallas menores de `1024px`.

Si se añade una cuarta tarjeta, hay que proporcionar un vídeo existente,
textos para todos los idiomas y colores legibles para todos los temas.

### Proyectos

`Projects.astro` importa `src/data/projects.json` y crea una
`BlueprintCard` por proyecto. Para añadir un proyecto normalmente basta con
añadir un objeto con esta forma:

```json
{
  "id": "mi-proyecto",
  "accent": "primario",
  "github": "https://github.com/ivan321pum/mi-proyecto",
  "tags": ["Astro", "React"],
  "translations": {
    "es": {
      "title": "Nombre del proyecto",
      "description": "Descripción breve."
    },
    "en": {
      "title": "Project name",
      "description": "Short description."
    },
    "cat": {
      "title": "Nom del projecte",
      "description": "Descripció breu."
    },
    "nl": {
      "title": "Projectnaam",
      "description": "Korte beschrijving."
    }
  }
}
```

`accent` debe corresponder a un token de color disponible, como `primario`,
`secundario` o `fondo-secundario`. `github` se abre en una pestaña nueva.
El grid usa `mx-auto`, `justify-items-center` y un ancho máximo por tarjeta
para mantenerlas centradas y equilibradas en escritorio, tablet y móvil.

`lang` se obtiene de `Astro.currentLocale` y se tipa como una clave de
`translations`, por lo que el acceso correcto es:

```astro
{project.translations[lang].title}
{project.translations[lang].description}
```

Si se añade un idioma nuevo, hay que incluirlo en cada proyecto.

### Formulario de contacto

`Contact.astro` es un formulario HTML estático que utiliza
[Web3Forms](https://web3forms.com/) como servicio externo. GitHub Pages no
ejecuta backend propio, por lo que el formulario envía directamente a:

```text
https://api.web3forms.com/submit
```

El componente incluye:

- nombre;
- correo electrónico;
- mensaje;
- asunto del correo;
- estilos responsive compatibles con los temas;
- traducciones de títulos, labels, placeholders y botón.

Las claves están en `src/i18n/ui.js` bajo el prefijo `contact.*`. Si se cambia
un texto, hay que actualizarlo en `es`, `en`, `cat` y `nl`. Si se modifica la
cuenta de Web3Forms, hay que sustituir el valor de `access_key` en
`Contact.astro` y probar un envío real antes de publicar.

Las páginas localizadas deben importar el componente y colocarlo con un
anchor estable:

```astro
import Contact from "../../components/Contact.astro";

<section id="contact">
  <Contact />
</section>
```

La navegación todavía debe apuntar explícitamente a `#contact` para que el
enlace «Contacto» lleve directamente a esta nueva sección.

## Cómo añadir o modificar contenido

### Cambiar el texto personal

Edita las claves `hero.*` y `about.*` de `src/i18n/ui.js`. No pongas texto
traducible directamente en un componente si debe aparecer en más de un idioma.

### Cambiar navegación

Edita `src/components/Navigation.astro`. Los enlaces internos se construyen
con el idioma actual y anchors como `#header`, `#about_me` y `#projects`.
Cuando se cree una sección nueva:

1. Añade un `id` estable en la página.
2. Añade su URL en `Navigation.astro`.
3. Traduce su etiqueta en `ui.js`.
4. Comprueba los enlaces desde una ruta que no sea la raíz.

### Crear una sección nueva

1. Crea un componente `.astro` en `src/components/`.
2. Importa y coloca el componente en la página de cada idioma, o centraliza
   la composición si todas las rutas comparten la misma estructura.
3. Usa `useTranslations` para los textos.
4. Usa React solo si la sección necesita estado, listeners o animación.
5. Mantén el responsive en las clases Tailwind y prueba una pantalla táctil.

### Crear un componente React

Usa `.tsx` si el componente tiene tipos o `.jsx` para una pieza sencilla.
Desde Astro se hidrata explícitamente:

```astro
---
import InteractiveSection from "./react/InteractiveSection";
---

<InteractiveSection client:visible />
```

Elige la directiva según el coste y la necesidad:

- `client:load`: necesario desde el primer instante.
- `client:visible`: se puede esperar a que entre en pantalla.
- Sin directiva: Astro lo renderiza como HTML sin JavaScript de cliente.

## Assets e imágenes

- Los archivos de `public/` se sirven con una URL pública estable, sin
  necesidad de importarlos desde JavaScript.
- Las imágenes que pasan por `astro:assets` se pueden importar desde
  `public/assets/images` y optimizar con el componente `Image`, como hace
  `Header.astro`.
- Los vídeos grandes tienen un impacto importante en el peso inicial y en el
  consumo móvil. Mantén `muted` y `playsInline` para fondos de vídeo y evita
  cargar más vídeos de los necesarios.
- Usa nombres claros y formatos comprimidos. Elimina assets que ya no estén
  referenciados.

## Despliegue

El workflow `.github/workflows/deploy.yml` se ejecuta cuando hay un push a
`main` o manualmente desde GitHub Actions:

1. Hace checkout del repositorio.
2. Usa `withastro/action@v2` con Node 22.
3. Genera y sube los artefactos estáticos.
4. Publica con `actions/deploy-pages@v4`.

Para publicar:

```bash
git add .
git commit -m "Describe el cambio"
git push origin main
```

Antes del push, ejecuta `npm run build`. Después, revisa el workflow en la
pestaña **Actions** y la web pública.

La configuración de `astro.config.mjs` contiene `site` y `base`. Si el
proyecto se mueve a otro dominio o a un repositorio publicado bajo una
subruta, revisa esos valores y todos los enlaces absolutos.

## Rendimiento y accesibilidad

- No dependas del cursor para indicar que algo es interactivo.
- Conserva el cursor nativo en móvil y dispositivos sin hover.
- Usa `alt` descriptivo en imágenes y `aria-label` en iconos sin texto.
- No reproduzcas audio automáticamente.
- Respeta `prefers-reduced-motion` al añadir nuevas animaciones. La
  configuración actual admite `reducedMotion` en algunos componentes, pero
  no es todavía una política global.
- Evita hidratar componentes Astro que no lo necesiten.
- Prueba el rendimiento con los vídeos desactivados y en una conexión móvil.
- Comprueba contraste en cada tema, especialmente cuando uses
  `mix-blend-mode: difference`.

## Comprobaciones antes de publicar

Como mínimo:

```bash
npm run build
```

Después, en `npm run preview`, revisa:

- `/`, `/es/`, `/en/`, `/cat/` y `/nl/`;
- navegación por anchors;
- selector de idioma;
- selector de tema y persistencia tras recargar;
- cursor en escritorio;
- ausencia del cursor personalizado en móvil;
- scroll de las tarjetas con vídeo;
- grid de proyectos en móvil, tablet y escritorio;
- enlaces externos de GitHub y LinkedIn;
- consola del navegador y errores de carga de assets.

## Detalles pendientes conocidos

Estos puntos describen el estado actual para que no se confundan con
decisiones intencionadas al continuar el desarrollo:

- `src/i18n/ui.js` contiene cuatro idiomas, aunque el objeto `languages` solo
  declara español e inglés. El selector de idioma obtiene sus opciones de
  `Object.keys(ui)`, así que actualmente muestra los cuatro; si se reutiliza
  `languages` en el futuro, habrá que sincronizarlo.
- `ThemePicker.astro` tiene un `DEFAULT_THEME` local distinto del
  `DEFAULT_THEME` exportado desde `src/data/themes.ts`. Conviene dejar una
  única fuente de verdad antes de ampliar el sistema de temas.
- Los tags de los proyectos todavía son comunes a todos los idiomas; solo el
  título y la descripción se traducen dentro de `projects.json`.
- Las tres URLs actuales de GitHub son placeholders y deben sustituirse por
  los repositorios reales antes del lanzamiento.
- La etiqueta de navegación `nav.contact` todavía apunta al anchor de inicio;
  debe cambiarse a `/${lang}/#contact` cuando se quiera activar el acceso
  directo desde el menú.
- El formulario depende de Web3Forms y de su `access_key`; hay que comprobar
  que el dominio publicado está autorizado y que los mensajes llegan al
  correo configurado.
- La prop `reducedMotion` existe en varios componentes, pero no se deriva
  todavía automáticamente de `window.matchMedia("(prefers-reduced-motion)")`.
- No hay tests automatizados ni lint configurado. El build es la comprobación
  obligatoria actual.

## Licencia y autor

El proyecto declara licencia ISC en `package.json`.

**Iván Sevilla Gómez**

- GitHub: [ivan321pum](https://github.com/ivan321pum)
- LinkedIn: [Iván Sevilla Gómez](https://www.linkedin.com/in/ivan-sevilla-gomez/)

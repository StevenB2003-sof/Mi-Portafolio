# Portafolio — Tu Nombre

Portafolio profesional de una sola página, construido con HTML5 semántico, CSS propio
(basado en variables/custom properties) y JavaScript sin frameworks ni librerías.

**Sitio publicado:** https://tu-usuario.github.io/tu-repositorio/
**Repositorio:** https://github.com/tu-usuario/tu-repositorio

## Concepto de diseño

El sitio se presenta como si cada sección fuera un archivo abierto en un editor de código
(pestañas tipo `inicio.html`, `skills.json`, `theme.config`), reforzando la identidad de
un portafolio de desarrollo. La sección **Design System** no es una imagen estática de la
paleta: es un panel funcional que modifica en tiempo real las mismas CSS Custom Properties
que usa el resto del sitio (color primario, color secundario, radio de bordes y densidad
de espaciado), con persistencia en `localStorage`.

## Tecnologías utilizadas

- HTML5 semántico (`header`, `nav`, `main`, `section`, `article`, `aside`, `figure`, `footer`)
- CSS3: Custom Properties, Flexbox, Grid, Media Queries, `clamp()`
- JavaScript (Vanilla): DOM, eventos, `localStorage`, Clipboard API
- Google Fonts (JetBrains Mono, Inter)

## Funcionalidades interactivas

1. **Menú responsive** con botón de hamburguesa para pantallas pequeñas.
2. **Editor de tema en vivo** (colores, radio de bordes, espaciado y modo claro/oscuro),
   persistido en `localStorage`.
3. **Filtro de proyectos por tecnología** en la sección de Proyectos.
4. **Validación de formulario** de contacto con mensajes de error accesibles (`role="alert"`).
5. **Botón "volver al inicio"** que aparece al hacer scroll.
6. Texto animado tipo "máquina de escribir" en el hero (respeta `prefers-reduced-motion`).
7. Botón para copiar el correo electrónico al portapapeles.

## Estructura del proyecto

```
mi portafolio/
├── css/
│   ├── variables.css   (Custom Properties — debe cargarse primero)
│   └── style.css       (resto de los estilos, consume las variables)
├── index.html
├── main.js
└── Readme.MD
```

## Cómo verlo localmente

No requiere instalación ni dependencias. Basta con abrir `index.html` en un navegador,
o servirlo con cualquier servidor estático, por ejemplo:

```bash
npx serve .
```

## Cómo personalizarlo

1. Reemplaza los textos marcados como `Tu Nombre`, `tu.correo@ejemplo.com`,
   `tu-usuario`/`tu-repo` en `index.html` por tu información real.
2. Sustituye las imágenes de `https://via.placeholder.com/...` por tu foto y capturas
   reales de tus proyectos (colócalas, por ejemplo, en una carpeta `assets/img/`).
3. Ajusta las secciones de Habilidades y Proyectos con tu propia información,
   manteniendo los atributos `data-tech` en las tarjetas de proyecto para que el
   filtro siga funcionando.
4. Conecta el formulario de contacto a un servicio real (Formspree, EmailJS, o un
   backend propio) si deseas que envíe correos de verdad.

## Publicación en GitHub Pages

1. Sube el proyecto a un repositorio público en GitHub, con varios commits que
   reflejen el progreso (evita un único commit final).
2. En **Settings → Pages**, selecciona la rama `main` y la carpeta `/root`.
3. Verifica en una ventana de incógnito que el sitio, los estilos, el JavaScript
   y las imágenes carguen correctamente, que la navegación funcione, que las
   funcionalidades interactivas respondan y que no haya errores en la consola.
4. Comprueba también la versión móvil (menú de hamburguesa y ausencia de
   desbordamientos horizontales).

## Capturas

_Agrega aquí 2–3 capturas de pantalla del resultado final (escritorio y móvil)._
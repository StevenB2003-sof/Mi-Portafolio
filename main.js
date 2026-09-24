// =========================================================
// UTILIDADES
// =========================================================
const root = document.documentElement;
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// =========================================================
// 1. AÑO DINÁMICO EN EL FOOTER
// =========================================================
$('#year').textContent = new Date().getFullYear();

// =========================================================
// 2. MENÚ RESPONSIVE (hamburguesa)
// =========================================================
const menuToggle = $('#menuToggle');
const primaryNav = $('#primaryNav');

menuToggle.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

// Cierra el menú al elegir una pestaña (en móvil) y marca la pestaña activa
const tabLinks = $$('.tabs__item');
tabLinks.forEach(link => {
  link.addEventListener('click', () => {
    primaryNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const sections = $$('main section[id]');
const setActiveTab = () => {
  let currentId = sections[0]?.id;
  const scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    if (section.offsetTop <= scrollPos) currentId = section.id;
  });
  tabLinks.forEach(link => {
    link.classList.toggle('is-active', link.dataset.tab === currentId);
  });
};
window.addEventListener('scroll', setActiveTab, { passive: true });
setActiveTab();

// =========================================================
// 3. TEXTO "TYPED" DEL ROL EN EL HERO
// =========================================================
const roles = ['Desarrollador Full-Stack', 'Estudiante de Software', 'Backend Enthusiast', 'Resuelve-problemas'];
const typedEl = $('#typedRole');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (typedEl && !prefersReducedMotion) {
  let roleIndex = 0, charIndex = 0, deleting = false;

  const tick = () => {
    const current = roles[roleIndex];
    charIndex += deleting ? -1 : 1;
    typedEl.textContent = current.slice(0, charIndex);

    let delay = deleting ? 40 : 80;

    if (!deleting && charIndex === current.length) { delay = 1400; deleting = true; }
    else if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 300; }

    setTimeout(tick, delay);
  };
  tick();
}

// =========================================================
// 4. DESIGN SYSTEM: EDITOR DE TEMA EN VIVO + PERSISTENCIA
// =========================================================
const THEME_KEY = 'portfolio-theme-tokens';

const defaults = {
  mode: 'dark',
  primary: '#89b4fa',
  secondary: '#cba6f7',
  radius: '1',
  space: '1'
};

function applyTokens(tokens) {
  root.setAttribute('data-theme', tokens.mode);
  root.style.setProperty('--color-primary', tokens.primary);
  root.style.setProperty('--color-secondary', tokens.secondary);
  root.style.setProperty('--radius-md', `${tokens.radius}rem`);
  root.style.setProperty('--space-scale', tokens.space);
}

function loadTokens() {
  try {
    const saved = JSON.parse(localStorage.getItem(THEME_KEY));
    return saved ? { ...defaults, ...saved } : { ...defaults };
  } catch {
    return { ...defaults };
  }
}

function saveTokens(tokens) {
  try { localStorage.setItem(THEME_KEY, JSON.stringify(tokens)); }
  catch { /* localStorage no disponible: se ignora silenciosamente */ }
}

let tokens = loadTokens();
applyTokens(tokens);

const ctrlPrimary = $('#ctrlPrimary');
const ctrlSecondary = $('#ctrlSecondary');
const ctrlRadius = $('#ctrlRadius');
const ctrlSpace = $('#ctrlSpace');
const ctrlRadiusValue = $('#ctrlRadiusValue');
const ctrlSpaceValue = $('#ctrlSpaceValue');
const themeToggle = $('#themeToggle');           // botón dentro de la sección Design System
const themeToggleHeader = $('#themeToggleHeader'); // botón siempre visible en la cabecera
const themeToggleHeaderIcon = $('#themeToggleHeaderIcon');
const resetTheme = $('#resetTheme');

function syncControls() {
  ctrlPrimary.value = tokens.primary;
  ctrlSecondary.value = tokens.secondary;
  ctrlRadius.value = tokens.radius;
  ctrlSpace.value = tokens.space;
  ctrlRadiusValue.textContent = tokens.radius;
  ctrlSpaceValue.textContent = tokens.space;

  const isLight = tokens.mode === 'light';

  // Botón de la sección Design System
  themeToggle.textContent = isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro';
  themeToggle.setAttribute('aria-pressed', String(isLight));

  // Botón siempre visible en la cabecera
  themeToggleHeaderIcon.textContent = isLight ? '☀️' : '🌙';
  themeToggleHeader.setAttribute('aria-pressed', String(isLight));
  themeToggleHeader.setAttribute('aria-label', isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');
}
syncControls();

ctrlPrimary.addEventListener('input', e => { tokens.primary = e.target.value; applyTokens(tokens); saveTokens(tokens); });
ctrlSecondary.addEventListener('input', e => { tokens.secondary = e.target.value; applyTokens(tokens); saveTokens(tokens); });
ctrlRadius.addEventListener('input', e => {
  tokens.radius = e.target.value; ctrlRadiusValue.textContent = tokens.radius;
  applyTokens(tokens); saveTokens(tokens);
});
ctrlSpace.addEventListener('input', e => {
  tokens.space = e.target.value; ctrlSpaceValue.textContent = tokens.space;
  applyTokens(tokens); saveTokens(tokens);
});

function toggleMode() {
  tokens.mode = tokens.mode === 'dark' ? 'light' : 'dark';
  applyTokens(tokens); saveTokens(tokens); syncControls();
}

themeToggle.addEventListener('click', toggleMode);
themeToggleHeader.addEventListener('click', toggleMode);

resetTheme.addEventListener('click', () => {
  tokens = { ...defaults };
  applyTokens(tokens); saveTokens(tokens); syncControls();
});

// =========================================================
// 5. FILTRO DE PROYECTOS POR TECNOLOGÍA
// =========================================================
const filterChips = $$('.filter-chip');
const projectCards = $$('.project-card');
const emptyMessage = $('#projectGridEmpty');

filterChips.forEach(chip => {
  chip.addEventListener('click', () => {
    filterChips.forEach(c => c.classList.remove('is-active'));
    chip.classList.add('is-active');

    const filter = chip.dataset.filter;
    let visibleCount = 0;

    projectCards.forEach(card => {
      const techs = card.dataset.tech.split(' ');
      const matches = filter === 'todos' || techs.includes(filter);
      card.hidden = !matches;
      if (matches) visibleCount++;
    });

    emptyMessage.hidden = visibleCount !== 0;
  });
});

// =========================================================
// 6. VALIDACIÓN DEL FORMULARIO DE CONTACTO
// =========================================================
const contactForm = $('#contactForm');
const formSuccess = $('#formSuccess');

const fieldConfigs = [
  { input: $('#name'), error: $('#nameError'), message: 'Escribe tu nombre (mínimo 2 caracteres).' },
  { input: $('#email'), error: $('#emailError'), message: 'Ingresa un correo electrónico válido.' },
  { input: $('#message'), error: $('#messageError'), message: 'Cuéntame un poco más (mínimo 10 caracteres).' }
];

function validateField({ input, error, message }) {
  input.dataset.touched = 'true';
  const valid = input.checkValidity();
  error.textContent = valid ? '' : message;
  return valid;
}

fieldConfigs.forEach(config => {
  config.input.addEventListener('blur', () => validateField(config));
  config.input.addEventListener('input', () => {
    if (config.input.dataset.touched === 'true') validateField(config);
  });
});

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const results = fieldConfigs.map(validateField);
  const allValid = results.every(Boolean);

  formSuccess.hidden = !allValid;
  if (allValid) {
    contactForm.reset();
    fieldConfigs.forEach(c => { c.input.dataset.touched = 'false'; c.error.textContent = ''; });
  }
});

// =========================================================
// 7. COPIAR CORREO AL PORTAPAPELES
// =========================================================
const copyEmailBtn = $('#copyEmailBtn');
const emailText = $('#emailText');

copyEmailBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(emailText.textContent.trim());
    const original = copyEmailBtn.textContent;
    copyEmailBtn.textContent = '¡Copiado!';
    setTimeout(() => { copyEmailBtn.textContent = original; }, 1800);
  } catch {
    copyEmailBtn.textContent = 'No se pudo copiar';
  }
});

// =========================================================
// 8. BOTÓN "VOLVER AL INICIO"
// =========================================================
const backToTop = $('#backToTop');

window.addEventListener('scroll', () => {
  backToTop.hidden = window.scrollY < 500;
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
});
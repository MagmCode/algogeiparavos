// --- CONFIGURACIÓN ---
// Pon aquí la fecha en que se conocieron (Año, Mes (0-11), Día)
// Ejemplo: 14 de Febrero de 2018 sería (2018, 1, 14)
const startDate = new Date(2015, 10, 17);

// --- LÓGICA DEL CONTADOR (ahora incluye semanas) ---
function updateCounter() {
  const now = new Date();
  const diff = now - startDate;

  const msYear = 1000 * 60 * 60 * 24 * 365.25;
  const msMonth = 1000 * 60 * 60 * 24 * 30.44;
  const msWeek = 1000 * 60 * 60 * 24 * 7;
  const msDay = 1000 * 60 * 60 * 24;
  const msHour = 1000 * 60 * 60;
  const msMinute = 1000 * 60;

  // Totales (desde el inicio hasta ahora)
    const totalYears = Math.floor(diff / msYear);
    const totalMonths = Math.floor(diff / msMonth);
    const totalWeeks = Math.floor(diff / msWeek);
    const totalDays = Math.floor(diff / msDay);
    const totalHours = Math.floor(diff / msHour);
    const totalMinutes = Math.floor(diff / msMinute);
    const totalSeconds = Math.floor(diff / 1000);

  // Desglose por años/meses/... para el footer (composición legible)
  let remainder = diff;
  const compYears = Math.floor(remainder / msYear);
  remainder = remainder % msYear;

  const compMonths = Math.floor(remainder / msMonth);
  remainder = remainder % msMonth;

  const compWeeks = Math.floor(remainder / msWeek);
  remainder = remainder % msWeek;

  const compDays = Math.floor(remainder / msDay);
  remainder = remainder % msDay;

  const compHours = Math.floor(remainder / msHour);
  remainder = remainder % msHour;

  const compMinutes = Math.floor(remainder / msMinute);
  const compSeconds = Math.floor((remainder % msMinute) / 1000);

  // Actualizar front numbers: mostrar totales equivalentes por unidad (si el elemento existe)
  const setIf = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.innerText = value;
  };

  setIf("years", totalYears);
  setIf("months", totalMonths);
  setIf("weeks", totalWeeks);
  setIf("days", totalDays);
  setIf("hours", totalHours);
  setIf("minutes", totalMinutes);
  setIf("seconds", totalSeconds);

  // Actualizar el pie de página con la composición legible (años, meses, semanas, ...)
  const eq = document.getElementById("equivalence");
  if (eq) {
    eq.innerText = `...lo que equivale a ${compYears} años ${compMonths} meses, ${compWeeks} semanas, ${compDays} días, ${compHours} horas, ${compMinutes} minutos y ${compSeconds} segundos, en los que la vida a tu lado se ha sentido onírica.`;
  }
}

setInterval(updateCounter, 1000);
updateCounter(); // Llamada inicial

// --- LÓGICA DEL REPRODUCTOR ---
const vinyl = document.getElementById("vinylRecord");
const audio = document.getElementById("bgMusic");
const arm = document.getElementById("toneArm");
let isPlaying = false;

function toggleMusic() {
  if (isPlaying) {
    audio.pause();
    vinyl.classList.remove("spinning");
    arm.classList.remove("playing-arm");
  } else {
    audio.play();
    vinyl.classList.add("spinning");
    arm.classList.add("playing-arm");
  }
  isPlaying = !isPlaying;
}

// --- SKY: generar soles y lunas animadas ---
function createSky(count = 12) {
  const existing = document.getElementById('sky');
  let sky = existing;
  if (!sky) {
    sky = document.createElement('div');
    sky.id = 'sky';
    document.body.insertBefore(sky, document.querySelector('.container'));
  }

  for (let i = 0; i < count; i++) {
    // create a heart element (SVG) colored either blue or yellow
    const el = document.createElement('div');
    const isBlue = Math.random() > 0.5;
    el.className = 'celestial heart';
    const size = Math.floor(Math.random() * 48) + 28; // 28-76px
    const left = Math.floor(Math.random() * 100);
    const delay = (Math.random() * 6).toFixed(2) + 's';
    const duration = (8 + Math.random() * 12).toFixed(2) + 's';

    // heart SVG path, fill chosen based on isBlue
    const fill = isBlue ? '#1c42aa' : '#ffd54a';
    const svg = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="${fill}" d="M12 21s-8-5.333-8-10A5 5 0 0 1 12 6a5 5 0 0 1 8 5c0 4.667-8 10-8 10z"/></svg>`;

    el.innerHTML = svg;
    el.style.left = left + '%';
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.animationDelay = delay + ', ' + (Math.random() * 2).toFixed(2) + 's';
    el.style.animationDuration = duration + ', ' + (2 + Math.random() * 3).toFixed(2) + 's';
    el.style.opacity = 0.95;

    sky.appendChild(el);
  }
}

// Crear corazones estáticos (sin animación) distribuidos aleatoriamente
function createHeartsStatic(count = 30) {
  const existing = document.getElementById('sky');
  let sky = existing;
  if (!sky) {
    sky = document.createElement('div');
    sky.id = 'sky';
    // ensure hearts don't block UI
    sky.style.pointerEvents = 'none';
    document.body.appendChild(sky);
  }

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'heart falling';
    const isBlue = Math.random() > 0.5;
    const size = Math.floor(Math.random() * 48) + 24; // 24-72px
    const left = Math.floor(Math.random() * 95);
    const top = -10; // start off-screen above
    const fill = isBlue ? '#0074e8' : '#ffd54a';
    el.innerHTML = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="${fill}" d="M12 21s-8-5.333-8-10A5 5 0 0 1 12 6a5 5 0 0 1 8 5c0 4.667-8 10-8 10z"/></svg>`;
    el.style.position = 'absolute';
    el.style.left = left + '%';
    el.style.top = top + 'vh';
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.opacity = 0.98;

    // randomize animation timing so hearts fall at different speeds
    const duration = (6 + Math.random() * 8).toFixed(2); // 6-14s
    const delay = (Math.random() * 6).toFixed(2); // staggered 0-6s
    el.style.animationDuration = `${duration}s`;
    el.style.animationDelay = `${delay}s`;

    sky.appendChild(el);
  }
}

// Crear al cargar
// Toggle sky on heart-box click
const heartBox = document.querySelector('.heart-box');
if (heartBox) {
  heartBox.style.cursor = 'pointer';
  heartBox.addEventListener('click', () => {
    const sky = document.getElementById('sky');
    if (sky) {
      sky.remove();
    } else {
      // create static hearts across the screen (falling, staggered)
      createHeartsStatic(36);
    }
  });
}

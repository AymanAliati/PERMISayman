const STORAGE = {
  examDate: "permis.examDate",
  tasks: "permis.programTasks",
  series: "permis.series",
  videos: "permis.videos",
  errors: "permis.errors"
};

const DB_NAME = "permisayman-images";
const DB_VERSION = 1;
const IMAGE_STORE = "images";

const themes = [
  "التشوير الطرقي",
  "حق الاسبقية",
  "التجاوز و التقابل",
  "الوقوف و التوقف",
  "الأضواء و العربة",
  "السلامة الطرقية",
  "المخالفات والغرامات",
  "مفاهيم تطبيقية",
  "دروس نظرية",
  "آخر"
];

const program = [
  {
    day: 1,
    title: "Bases - signalisation",
    theme: "التشوير الطرقي",
    tasks: [
      "Lire la leçon « وظائف التمييز والتقييم » (perception et temps de réaction)",
      "Lire la leçon « أهمية اليقظة واتخاذ الموقف الملائم » (vigilance)",
      "Étudier « علامات التنبيه » (panneaux de danger)",
      "Étudier « علامات المنع » (panneaux d'interdiction)",
      "سلسلة 1 — التشوير الطرقي (40 questions, objectif ≥34/40)"
    ]
  },
  {
    day: 2,
    title: "Signalisation, suite",
    theme: "التشوير الطرقي",
    tasks: [
      "Lire « السياقة تحت تأثير » (conduite sous influence)",
      "Étudier « علامات الإرشاد », « علامات الإجبار », « علامات ملتقى الطرق »",
      "سلسلة 2 — التشوير الطرقي (objectif ≥34/40)"
    ]
  },
  {
    day: 3,
    title: "Dépassement & croisement",
    theme: "التجاوز",
    tasks: [
      "سلسلة 3 — التجاوز + التشوير الطرقي",
      "سلسلة 4 — التجاوز و التقابل",
      "Capturer chaque erreur pour la section \"Mes erreurs\""
    ]
  },
  {
    day: 4,
    title: "Stationnement & priorité",
    theme: "حق الاسبقية",
    tasks: [
      "سلسلة 5 — الوقوف و التوقف",
      "سلسلة 6 — حق الاسبقية"
    ]
  },
  {
    day: 5,
    title: "Priorité, éclairage, notions",
    theme: "الأضواء و العربة",
    tasks: [
      "سلسلة 7 — حق الاسبقية",
      "سلسلة 8 — الأضواء و العربة",
      "سلسلة 9 — مفاهيم تطبيقية"
    ]
  },
  {
    day: 6,
    title: "Sécurité & amendes",
    theme: "المخالفات والعقوبات",
    tasks: [
      "Lire/mémoriser la section amendes (voir Cours > Infractions)",
      "سلسلة 10 et 11 — السلامة الطرقية",
      "سلسلة 12 et 13 — المخالفات والغرامات"
    ]
  },
  {
    day: 7,
    title: "Marathon tests blancs",
    theme: "الإختبار",
    tasks: [
      "سلسلة 14 à 22 — الإختبار رقم 1 à 9 (9 tests chronométrés)"
    ]
  },
  {
    day: 8,
    title: "Niveau avancé  1→9",
    theme: "سلسلة جديدة",
    tasks: [
      "سلسلة جديدة 1 à 9 (= séries n°23 à 31 dans l'appli)"
    ]
  },
  {
    day: 9,
    title: "Niveau avancé  10→18 + examens blancs",
    theme: "الامتحان التجريبي",
    tasks: [
      "سلسلة جديدة 10 à 18 (= séries n°32 à 40)",
      "الامتحان التجريبي #1 et #2 (conditions réelles, chronométré)"
    ]
  },
  {
    day: 10,
    title: "Jour J - repos actif",
    theme: "",
    tasks: [
      "Relire UNIQUEMENT la section \"Mes erreurs\", aucune série neuve",
      "Repasser vite les montants d'amendes"
    ]
  }
];

const courses = [
  {
    title: "التشوير الطرقي",
    subtitle: "Signalisation (5 catégories)",
    items: [
      "علامات التنبيه : triangle, bord rouge → signale un danger à venir",
      "علامات المنع : cercle, bord rouge → interdiction",
      "علامات الإجبار : cercle, fond bleu → obligation",
      "علامات الإرشاد : rectangle/carré bleu ou vert → information/direction",
      "علامات ملتقى الطرق : panneaux liés aux intersections et à la priorité"
    ]
  },
  {
    title: "حق الاسبقية",
    subtitle: "Priorité",
    items: [
      "priorité à droite par défaut aux intersections sans panneau",
      "règles aux ronds-points",
      "priorité piétons aux passages protégés",
      "priorité véhicules prioritaires (ambulance, pompiers, police en intervention)"
    ]
  },
  {
    title: "التجاوز و التقابل",
    subtitle: "Dépassement et croisement",
    items: [
      "conditions de visibilité",
      "distance de sécurité avant de doubler",
      "interdictions (ligne continue, sommet de côte, virage, passage piéton, intersection)"
    ]
  },
  {
    title: "الوقوف و التوقف",
    subtitle: "Arrêt et stationnement",
    items: [
      "Différence entre \"arrêt\" (toupef, momentané, conducteur reste à proximité) et \"stationnement\" (wouqouf, prolongé)",
      "zones interdites : passages piétons, intersections, ponts, lignes jaunes"
    ]
  },
  {
    title: "الأضواء و العربة",
    subtitle: "Éclairage et équipement obligatoire du véhicule",
    items: [
      "feux de croisement/route",
      "clignotants",
      "triangle de signalisation",
      "gilet",
      "ceinture",
      "pneus"
    ]
  },
  {
    title: "السلامة الطرقية / وظائف التمييز والتقييم",
    subtitle: "Sécurité routière",
    items: [
      "perception du danger",
      "distance et temps de réaction",
      "distance de freinage"
    ]
  },
  {
    title: "السياقة تحت تأثير",
    subtitle: "Conduite sous l'effet de l'alcool, médicaments, drogues",
    items: [
      "impact sur le temps de réaction et le jugement"
    ]
  },
  {
    title: "المخالفات والعقوبات",
    subtitle: "Infractions et sanctions (montants OFFICIELS vérifiés, loi n°52-05)",
    items: [
      "Contravention 1ère classe : 700 DH (réduit à 400 DH si payé sous 24h, 500 DH si payé sous 15 jours)",
      "Contravention 2ème classe : 500 DH (réduit à 300 DH / 350 DH)",
      "Contravention 3ème classe : 300 DH (réduit à 150 DH / 200 DH)",
      "Contravention article 187 (mineure) : 25 DH",
      "جنحة (délit) : catégorie plus grave qu'une contravention (une dizaine de cas prévus par la loi), jugée par un tribunal, peut entraîner des poursuites pénales en plus de l'amende."
    ]
  },
  {
    title: "الصفيحة",
    subtitle: "Plaque d'immatriculation marocaine",
    items: [
      "Format standard : numéro séquentiel (1 à 99999) + lettre arabe au milieu (indique la série) + code régional (1 à 2 chiffres, de 1 pour Rabat à 89 pour Lagouira)",
      "Fond blanc, caractères noirs réfléchissants, carte du Maroc à gauche",
      "Dimensions standard : 520 x 110 mm pour les voitures",
      "Plaques spéciales à connaître : CD = corps diplomatique (fond bleu), WW = véhicule neuf en sortie de concession (temporaire), véhicules de l'État = fond noir, caractères blancs, avec \"M\" ou \"المغرب\""
    ]
  }
];

const videoGroups = [
  ["Signalisation", "التشوير الطرقي", ["شرح جميع العلامات الطرقية بالتفصيل", "محور التشوير الطرقي"]],
  ["Dépassement/croisement", "التجاوز و التقابل", ["محور التجاوز والتقابل"]],
  ["Priorité", "حق الاسبقية", ["محور الأسبقية في الملتقيات الطرق", "قواعد الأسبقية في المدارات"]],
  ["Stationnement", "الوقوف و التوقف", ["محور الوقوف والتوقف"]],
  ["Éclairage/mécanique/systèmes", "الأضواء و العربة", ["محور الأضواء المركبة", "محور الميكانيك المركبة", "شرح أنظمة السيارة"]],
  ["Sécurité/amendes", "المخالفات والغرامات", ["مخالفات السرعة 2026", "شرح جميع الجنح", "الحوادث و اسعافات", "محور خاص بالسائق"]],
  ["Entraînement intensif", "أسئلة جديدة ومهمة", ["أسئلة جديدة ومهمة (61 vidéos — jours 7 à 9)"]],
  ["Examens blancs filmés", "الامتحان التجريبي", ["إمتحان تجريبي في رخصة السياقة (14 vidéos — jour 9)"]]
];

let selectedPhoto = null;
let dbPromise = null;

document.addEventListener("DOMContentLoaded", init);

function init() {
  setupTabs();
  fillThemeSelects();
  renderProgram();
  renderCourses();
  renderVideos();
  renderSeries();
  setupDashboard();
  setupErrors();
  updateDashboard();
}

function setupTabs() {
  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => showTab(button.dataset.tab));
  });
}

function showTab(tabId) {
  document.querySelectorAll(".tab").forEach((button) => button.classList.toggle("active", button.dataset.tab === tabId));
  document.querySelectorAll(".page").forEach((page) => page.classList.toggle("active", page.id === tabId));
}

function storageGet(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function storageSet(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function renderProgram() {
  const checked = storageGet(STORAGE.tasks, {});
  const timeline = document.getElementById("programTimeline");
  timeline.innerHTML = "";
  program.forEach((day) => {
    const card = document.createElement("article");
    card.className = "day-card";
    card.id = `jour-${day.day}`;
    card.dataset.day = day.day;
    card.innerHTML = `
      <h3>Jour ${day.day} (${day.title})</h3>
      ${day.theme ? `<span class="theme-pill arabic" dir="rtl">${day.theme}</span>` : ""}
    `;
    day.tasks.forEach((task, index) => {
      const id = `d${day.day}-t${index}`;
      const label = document.createElement("label");
      label.className = "check-item";
      label.innerHTML = `
        <input type="checkbox" ${checked[id] ? "checked" : ""} data-task="${id}">
        <span>${markArabic(task)}</span>
      `;
      card.appendChild(label);
    });
    timeline.appendChild(card);
  });
  timeline.addEventListener("change", (event) => {
    if (!event.target.matches("[data-task]")) return;
    const current = storageGet(STORAGE.tasks, {});
    current[event.target.dataset.task] = event.target.checked;
    storageSet(STORAGE.tasks, current);
    updateDashboard();
  });
}

function renderCourses() {
  const grid = document.getElementById("courseGrid");
  grid.innerHTML = courses.map((course) => `
    <article class="course-card">
      <h3 class="arabic" dir="rtl">${course.title}</h3>
      <p>${course.subtitle}</p>
      <ul>${course.items.map((item) => `<li>${markArabic(item)}</li>`).join("")}</ul>
    </article>
  `).join("");
}

function renderVideos() {
  const saved = storageGet(STORAGE.videos, {});
  const grid = document.getElementById("videoGrid");
  grid.innerHTML = "";
  videoGroups.forEach(([title, theme, playlists]) => {
    const card = document.createElement("article");
    card.className = "video-card";
    card.innerHTML = `<h3>${title}</h3><span class="theme-pill arabic" dir="rtl">${theme}</span>`;
    playlists.forEach((playlist) => {
      const key = slug(`${title}-${playlist}`);
      const row = document.createElement("label");
      row.className = "playlist-row";
      row.innerHTML = `
        <span class="arabic" dir="rtl">${playlist}</span>
        <input type="text" placeholder="Coller le lien ou l'ID YouTube" value="${escapeAttr(saved[key] || "")}" data-video="${key}">
      `;
      card.appendChild(row);
    });
    grid.appendChild(card);
  });
  grid.addEventListener("input", (event) => {
    if (!event.target.matches("[data-video]")) return;
    const current = storageGet(STORAGE.videos, {});
    current[event.target.dataset.video] = event.target.value;
    storageSet(STORAGE.videos, current);
  });
}

function renderSeries() {
  const saved = storageGet(STORAGE.series, {});
  const grid = document.getElementById("seriesGrid");
  grid.innerHTML = "";
  buildSeries().forEach((serie) => {
    const state = saved[serie.number] || {};
    const card = document.createElement("article");
    card.className = `series-card ${state.done ? "done" : ""}`;
    card.innerHTML = `
      <div class="series-top">
        <div>
          <h3>${serie.name}</h3>
          <span class="theme-pill arabic" dir="rtl">${serie.theme}</span>
        </div>
        ${serie.advanced ? `<span class="badge">avancée</span>` : ""}
      </div>
      <label class="check-item">
        <input type="checkbox" ${state.done ? "checked" : ""} data-serie-done="${serie.number}">
        <span>fait</span>
      </label>
      <label class="score-row">
        <span>Score sur 40</span>
        <input type="number" min="0" max="40" inputmode="numeric" value="${state.score ?? ""}" data-serie-score="${serie.number}">
      </label>
    `;
    grid.appendChild(card);
  });
  grid.addEventListener("change", saveSeriesEvent);
  grid.addEventListener("input", saveSeriesEvent);
}

function saveSeriesEvent(event) {
  const doneId = event.target.dataset.serieDone;
  const scoreId = event.target.dataset.serieScore;
  if (!doneId && !scoreId) return;
  const key = doneId || scoreId;
  const current = storageGet(STORAGE.series, {});
  current[key] = current[key] || {};
  if (doneId) current[key].done = event.target.checked;
  if (scoreId) current[key].score = event.target.value;
  storageSet(STORAGE.series, current);
  const card = event.target.closest(".series-card");
  if (card && doneId) card.classList.toggle("done", event.target.checked);
}

function setupDashboard() {
  const examInput = document.getElementById("examDate");
  examInput.value = localStorage.getItem(STORAGE.examDate) || "2026-06-30";
  examInput.addEventListener("change", () => {
    localStorage.setItem(STORAGE.examDate, examInput.value);
    updateDashboard();
  });
  document.getElementById("goToday").addEventListener("click", () => {
    showTab("program");
    const day = getCurrentProgramDay();
    document.querySelectorAll(".day-card").forEach((card) => card.classList.toggle("today", card.dataset.day === String(day)));
    document.getElementById(`jour-${day}`).scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

function updateDashboard() {
  const examDate = document.getElementById("examDate").value;
  const target = new Date(`${examDate}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.ceil((target - today) / 86400000);
  document.getElementById("daysLeft").textContent = Number.isFinite(days) ? Math.max(0, days) : "0";

  const totalTasks = program.reduce((sum, day) => sum + day.tasks.length, 0);
  const checked = Object.values(storageGet(STORAGE.tasks, {})).filter(Boolean).length;
  const percent = totalTasks ? Math.round((checked / totalTasks) * 100) : 0;
  document.getElementById("globalProgress").textContent = `${percent}%`;
  document.getElementById("progressRing").style.background = `conic-gradient(var(--green) ${percent * 3.6}deg, #2b3945 0deg)`;

  const errors = storageGet(STORAGE.errors, []);
  document.getElementById("pendingErrors").textContent = errors.filter((error) => !error.reviewed).length;
}

function setupErrors() {
  document.getElementById("photoInput").addEventListener("change", (event) => setSelectedPhoto(event.target.files[0]));
  document.addEventListener("paste", handlePaste);
  document.getElementById("errorForm").addEventListener("submit", addError);
  document.getElementById("filterTheme").addEventListener("change", renderErrors);
  document.getElementById("filterSeries").addEventListener("input", renderErrors);
  document.getElementById("filterStatus").addEventListener("change", renderErrors);
  document.getElementById("exportBackup").addEventListener("click", exportBackup);
  document.getElementById("importBackup").addEventListener("change", importBackup);
  document.getElementById("closeLightbox").addEventListener("click", () => document.getElementById("lightbox").close());
  renderErrors();
}

function fillThemeSelects() {
  const options = themes.map((theme) => `<option value="${theme}" dir="rtl">${theme}</option>`).join("");
  document.getElementById("errorTheme").innerHTML = options;
  document.getElementById("filterTheme").innerHTML = `<option value="all">Tous les thèmes</option>${options}`;
}

async function setSelectedPhoto(file) {
  if (!file || !file.type.startsWith("image/")) return;
  selectedPhoto = file;
  const preview = document.getElementById("photoPreview");
  preview.src = URL.createObjectURL(file);
  preview.style.display = "block";
}

function handlePaste(event) {
  const file = [...event.clipboardData.items]
    .find((item) => item.type.startsWith("image/"))
    ?.getAsFile();
  if (file) setSelectedPhoto(file);
}

async function addError(event) {
  event.preventDefault();
  if (!selectedPhoto) {
    alert("La photo est obligatoire.");
    return;
  }
  const id = crypto.randomUUID();
  const thumb = await createThumbnail(selectedPhoto);
  await putImage(id, selectedPhoto);
  await putImage(`${id}-thumb`, thumb);
  const errors = storageGet(STORAGE.errors, []);
  errors.unshift({
    id,
    series: document.getElementById("errorSeries").value,
    theme: document.getElementById("errorTheme").value,
    question: document.getElementById("errorQuestion").value.trim(),
    note: document.getElementById("errorNote").value.trim(),
    date: new Date().toISOString(),
    reviewed: false
  });
  storageSet(STORAGE.errors, errors);
  event.target.reset();
  selectedPhoto = null;
  document.getElementById("photoPreview").style.display = "none";
  renderErrors();
  updateDashboard();
}

async function renderErrors() {
  const gallery = document.getElementById("errorGallery");
  const theme = document.getElementById("filterTheme").value;
  const series = document.getElementById("filterSeries").value;
  const status = document.getElementById("filterStatus").value;
  const errors = storageGet(STORAGE.errors, []).filter((error) => {
    if (theme !== "all" && error.theme !== theme) return false;
    if (series && String(error.series) !== String(series)) return false;
    if (status === "pending" && error.reviewed) return false;
    if (status === "reviewed" && !error.reviewed) return false;
    return true;
  });
  gallery.innerHTML = "";
  if (!errors.length) {
    gallery.innerHTML = `<p class="muted">Aucune erreur pour ces filtres.</p>`;
    return;
  }
  for (const error of errors) {
    const thumb = await getImage(`${error.id}-thumb`);
    const url = thumb ? URL.createObjectURL(thumb) : "";
    const card = document.createElement("article");
    card.className = "error-card";
    card.innerHTML = `
      <button class="thumb-button" data-open-image="${error.id}" aria-label="Ouvrir la photo">
        ${url ? `<img src="${url}" alt="Miniature de l'erreur">` : "Photo indisponible"}
      </button>
      <div>
        <strong class="arabic" dir="rtl">${error.theme}</strong>
        <p>Série ${escapeHtml(error.series || "-")} ${error.question ? `- Question ${escapeHtml(error.question)}` : ""}</p>
        <p>${escapeHtml(error.note || "")}</p>
        <small>${new Date(error.date).toLocaleDateString("fr-FR")} · <span class="${error.reviewed ? "reviewed" : "pending"}">${error.reviewed ? "revu" : "à revoir"}</span></small>
      </div>
      <div class="card-actions">
        <button data-review-error="${error.id}">${error.reviewed ? "À revoir" : "Marquer comme revu"}</button>
        <button class="delete-button" data-delete-error="${error.id}">Supprimer</button>
      </div>
    `;
    gallery.appendChild(card);
  }
  gallery.querySelectorAll("[data-open-image]").forEach((button) => button.addEventListener("click", openImage));
  gallery.querySelectorAll("[data-review-error]").forEach((button) => button.addEventListener("click", toggleReview));
  gallery.querySelectorAll("[data-delete-error]").forEach((button) => button.addEventListener("click", deleteError));
}

async function openImage(event) {
  const id = event.currentTarget.dataset.openImage;
  const blob = await getImage(id);
  if (!blob) return;
  const lightbox = document.getElementById("lightbox");
  document.getElementById("lightboxImage").src = URL.createObjectURL(blob);
  lightbox.showModal();
}

function toggleReview(event) {
  const id = event.currentTarget.dataset.reviewError;
  const errors = storageGet(STORAGE.errors, []).map((error) => error.id === id ? { ...error, reviewed: !error.reviewed } : error);
  storageSet(STORAGE.errors, errors);
  renderErrors();
  updateDashboard();
}

async function deleteError(event) {
  const id = event.currentTarget.dataset.deleteError;
  if (!confirm("Supprimer cette erreur ?")) return;
  const errors = storageGet(STORAGE.errors, []).filter((error) => error.id !== id);
  storageSet(STORAGE.errors, errors);
  await deleteImage(id);
  await deleteImage(`${id}-thumb`);
  renderErrors();
  updateDashboard();
}

async function exportBackup() {
  const errors = storageGet(STORAGE.errors, []);
  const images = {};
  for (const error of errors) {
    const full = await getImage(error.id);
    const thumb = await getImage(`${error.id}-thumb`);
    images[error.id] = full ? await blobToDataUrl(full) : null;
    images[`${error.id}-thumb`] = thumb ? await blobToDataUrl(thumb) : null;
  }
  const backup = {
    version: 1,
    exportedAt: new Date().toISOString(),
    localStorage: {
      examDate: localStorage.getItem(STORAGE.examDate),
      tasks: storageGet(STORAGE.tasks, {}),
      series: storageGet(STORAGE.series, {}),
      videos: storageGet(STORAGE.videos, {}),
      errors
    },
    images
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `permisayman-sauvegarde-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
}

async function importBackup(event) {
  const file = event.target.files[0];
  if (!file) return;
  const backup = JSON.parse(await file.text());
  if (!backup.localStorage || !backup.images) {
    alert("Fichier de sauvegarde invalide.");
    return;
  }
  localStorage.setItem(STORAGE.examDate, backup.localStorage.examDate || "2026-06-30");
  storageSet(STORAGE.tasks, backup.localStorage.tasks || {});
  storageSet(STORAGE.series, backup.localStorage.series || {});
  storageSet(STORAGE.videos, backup.localStorage.videos || {});
  storageSet(STORAGE.errors, backup.localStorage.errors || []);
  for (const [id, dataUrl] of Object.entries(backup.images)) {
    if (dataUrl) await putImage(id, dataUrlToBlob(dataUrl));
  }
  document.getElementById("examDate").value = localStorage.getItem(STORAGE.examDate);
  renderProgram();
  renderVideos();
  renderSeries();
  renderErrors();
  updateDashboard();
  event.target.value = "";
}

function buildSeries() {
  const result = [];
  for (let number = 1; number <= 40; number++) {
    let theme;
    let name = `سلسلة ${number}`;
    let advanced = false;
    if (number <= 2) theme = "التشوير الطرقي";
    else if (number <= 4) theme = "التجاوز";
    else if (number === 5) theme = "الوقوف و التوقف";
    else if (number <= 7) theme = "حق الاسبقية";
    else if (number === 8) theme = "الأضواء و العربة";
    else if (number === 9) theme = "مفاهيم تطبيقية";
    else if (number <= 11) theme = "السلامة الطرقية";
    else if (number <= 13) theme = "المخالفات والغرامات";
    else if (number <= 22) {
      theme = `الإختبار رقم ${number - 13}`;
      name = `سلسلة ${number}`;
    } else {
      theme = `سلسلة جديدة ${number - 22}`;
      name = `سلسلة ${number}`;
      advanced = true;
    }
    result.push({ number, name, theme, advanced });
  }
  return result;
}

function getCurrentProgramDay() {
  const examDate = localStorage.getItem(STORAGE.examDate) || "2026-06-30";
  const target = new Date(`${examDate}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysUntil = Math.ceil((target - today) / 86400000);
  return Math.min(10, Math.max(1, 10 - daysUntil + 1));
}

function openDb() {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => request.result.createObjectStore(IMAGE_STORE);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  return dbPromise;
}

async function putImage(id, blob) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IMAGE_STORE, "readwrite");
    tx.objectStore(IMAGE_STORE).put(blob, id);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

async function getImage(id) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const request = db.transaction(IMAGE_STORE).objectStore(IMAGE_STORE).get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function deleteImage(id) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IMAGE_STORE, "readwrite");
    tx.objectStore(IMAGE_STORE).delete(id);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

function createThumbnail(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const max = 640;
      const scale = Math.min(1, max / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Thumbnail impossible")), "image/jpeg", .88);
    };
    image.onerror = reject;
    image.src = URL.createObjectURL(file);
  });
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function dataUrlToBlob(dataUrl) {
  const [meta, data] = dataUrl.split(",");
  const mime = meta.match(/data:(.*);base64/)?.[1] || "application/octet-stream";
  const bytes = atob(data);
  const buffer = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) buffer[i] = bytes.charCodeAt(i);
  return new Blob([buffer], { type: mime });
}

function markArabic(text) {
  return escapeHtml(text).replace(/[\u0600-\u06ff][\u0600-\u06ff\s\d#،()°-]*/g, (match) => `<span class="arabic" dir="rtl">${match}</span>`);
}

function slug(value) {
  return value.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\u0600-\u06ff-]/g, "");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

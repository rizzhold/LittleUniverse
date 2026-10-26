import { site } from "./data/site.js";
import { initSnake } from "./games/snake.js";
import { initTicTacToe } from "./games/tic-tac-toe.js";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const AVATAR_FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#1b2350"/><text x="50" y="62" font-family="monospace" font-size="38" fill="#a9bdff" text-anchor="middle">✳</text></svg>`
  );

function setText(selector, value) {
  const el = $(selector);
  if (el) el.textContent = value ?? "";
}

function setHTML(selector, value) {
  const el = $(selector);
  if (el) el.innerHTML = value ?? "";
}

function setAvatar(url) {
  const img = $("#avatar");
  if (!img) return;
  img.onerror = () => {
    img.onerror = null;
    img.src = AVATAR_FALLBACK;
  };
  if (url) img.src = url;
}

function applyAlbumArt(url) {
  const art = $("#album-art");
  if (!art || !url) return;
  const probe = new Image();
  probe.onload = () => {
    art.style.background = `center / cover no-repeat url("${url}")`;
    const sun = $(".album-sun");
    const caption = $(".album-caption");
    if (sun) sun.hidden = true;
    if (caption) caption.hidden = true;
  };
  probe.onerror = () => console.warn(`[music] cover not found: ${url}`);
  probe.src = url;
}

function setupAnalytics() {
  const analytics = site.analytics;
  if (!analytics || analytics.provider !== "umami") return;

  // Analytics baru aktif setelah Website ID diisi. Tidak ada request tracking
  // yang dikirim selama konfigurasi masih kosong.
  if (analytics.websiteId && analytics.scriptUrl) {
    const script = document.createElement("script");
    script.defer = true;
    script.src = safeURL(analytics.scriptUrl);
    script.dataset.websiteId = analytics.websiteId.trim();
    script.setAttribute("data-auto-track", "true");
    script.onerror = () => console.warn("[analytics] Umami script could not be loaded.");
    document.head.appendChild(script);
  }

  // Tautan ini opsional untuk Little Universe. URL yang sama juga bisa
  // dipasang secara manual di website rizzhold.md yang terpisah.
  const publicLink = $("#public-stats-link");
  const publicUrl = safeURL(analytics.publicDashboardUrl || "");
  if (publicLink && publicUrl !== "#") {
    publicLink.href = publicUrl;
    publicLink.hidden = false;
  }
}

function renderSite() {
  document.title = `${site.name} — Personal Playground`;
  setHTML("#hero-title", `${escapeHTML(site.name)}<br><span class="gradient-text">little universe.</span>`);
  setText("#status-text", site.status);
  setText("#hero-description", site.description);
  setText("#hero-note", site.note);
  setAvatar(site.avatar);
  setText("#about-title", site.aboutTitle);
  setText("#about-copy", site.about);
  setText("#quote-text", site.quote);
  setText("#quote-credit", site.quoteCredit);

  const aboutTags = $("#about-tags");
  if (aboutTags) {
    aboutTags.innerHTML = site.tags
      .map(tag => `<span class="tag">${escapeHTML(tag)}</span>`)
      .join("");
  }

  const tickerTrack = $("#ticker-track");
  if (tickerTrack) {
    const items = [...site.ticker, ...site.ticker];
    tickerTrack.innerHTML = items
      .map(item => `<span class="ticker-item">${escapeHTML(item)} <b>✳</b></span>`)
      .join("");
  }

  const passionGrid = $("#passion-grid");
  if (passionGrid) {
    passionGrid.innerHTML = site.passions
      .map((passion, i) => `
        <article class="passion-card">
          <div>
            <img class="passion-icon" src="${safeURL(passion.icon)}" alt="" loading="lazy" decoding="async">
            <h3>${escapeHTML(passion.title)}</h3>
            <p>${escapeHTML(passion.description)}</p>
          </div>
          <span class="passion-number">PASSION / ${String(i + 1).padStart(2, "0")}</span>
        </article>`)
      .join("");
  }

  const socialLinks = $("#social-links");
  if (socialLinks) {
    socialLinks.innerHTML = site.socials
      .map(social => `
        <a class="social-link" href="${safeURL(social.url)}" target="_blank" rel="noopener noreferrer">
          <img class="social-icon" src="assets/${social.label === "GitHub" ? "github.svg" : social.label === "Telegram" ? "telegram.svg" : "connect.svg"}" alt="" loading="lazy" decoding="async">${escapeHTML(social.label)}
        </a>`)
      .join("");
  }

  setText("#track-title", site.music.title);
  setText("#track-artist", site.music.artist);
  applyAlbumArt(site.music.artwork);

  const musicUrl = safeURL(site.music.url || "");
  const wrap = $("#youtube-wrap");
  if (wrap && musicUrl !== "#") {
    wrap.href = musicUrl;
    wrap.setAttribute("aria-label", `Open ${site.music.title} in YouTube Music`);
    const label = wrap.querySelector("p");
    if (label) label.textContent = site.music.title;
    const small = wrap.querySelector("small");
    if (small) small.textContent = "Open directly in YouTube Music";
  }

  const musicBtn = $("#music-play");
  if (musicBtn) {
    musicBtn.addEventListener("click", () => {
      const url = safeURL(site.music.url || "");
      if (url !== "#") {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        showToast("Add a music link in js/data/site.js first.");
      }
    });
  }
}

function setupTheme() {
  const button = $("#theme-toggle");
  if (!button) return;
  const saved = localStorage.getItem("little-universe-theme");
  if (saved === "light") document.body.classList.add("light");
  button.addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem(
      "little-universe-theme",
      document.body.classList.contains("light") ? "light" : "dark"
    );
  });
}

function setupGameTabs() {
  $$("[data-game-tab]").forEach(button =>
    button.addEventListener("click", () => {
      const selected = button.dataset.gameTab;
      $$("[data-game-tab]").forEach(tab => {
        const active = tab === button;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", String(active));
      });
      $$("[data-game-panel]").forEach(panel => {
        const active = panel.dataset.gamePanel === selected;
        panel.hidden = !active;
        panel.classList.toggle("is-active", active);
      });
    })
  );
}

let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3000);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char])
  );
}

function safeURL(value) {
  try {
    const url = new URL(value, location.href);
    return ["https:", "http:"].includes(url.protocol) ? url.href : "#";
  } catch {
    return "#";
  }
}

renderSite();
setupAnalytics();
setupTheme();
setupGameTabs();
initSnake({ $, showToast });
initTicTacToe({ $, showToast });

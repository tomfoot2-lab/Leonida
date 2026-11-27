// Leonida — carte FR : fonctionnement hors ligne.
// Coquille et données : réseau d'abord (pour recevoir les mises à jour), cache en secours.
// Morceaux de carte et polices : cache d'abord. La synchro GitHub n'est jamais mise en cache.
const VERSION = 'v1';
const SHELL = 'leonida-shell-' + VERSION;
const DATA = 'leonida-data';
const TILES = 'leonida-tiles';
const FONTS = 'leonida-fonts';
const SHELL_FILES = ['./', './index.html', './manifest.webmanifest', './vendor/leaflet.js', './vendor/leaflet.css',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/favicon.png', './data.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(SHELL_FILES)));
});

self.addEventListener('message', e => { if (e.data === 'skip') self.skipWaiting(); });

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('leonida-shell-') && k !== SHELL).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const u = new URL(req.url);
  if (u.hostname === 'api.github.com' || u.hostname.endsWith('githubusercontent.com')) return;
  if (u.hostname === 'fonts.googleapis.com' || u.hostname === 'fonts.gstatic.com') { e.respondWith(cacheFirst(FONTS, req)); return; }
  if (u.origin !== self.location.origin) return;
  if (u.pathname.includes('/t/')) { e.respondWith(cacheFirst(TILES, req)); return; }
  e.respondWith(networkFirst(u.pathname.endsWith('/data.json') ? DATA : SHELL, req));
});

async function cacheFirst(name, req) {
  const c = await caches.open(name);
  const hit = await c.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok || res.type === 'opaque') c.put(req, res.clone());
  return res;
}

async function networkFirst(name, req) {
  const c = await caches.open(name);
  try {
    const res = await Promise.race([
      fetch(req),
      new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 5000)),
    ]);
    if (res.ok) c.put(req, res.clone());
    return res;
  } catch (err) {
    const hit = (await c.match(req, { ignoreSearch: true })) || (await caches.match(req, { ignoreSearch: true }))
      || (req.mode === 'navigate' ? (await caches.match('./index.html')) || (await caches.match('./')) : null);
    if (hit) return hit;
    throw err;
  }
}
